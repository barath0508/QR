import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import LandingPage from './pages/LandingPage';
import { api, authStorage } from './services/api';
import { trackEvent } from './utils/analytics';
import { applyPageSEO } from './utils/seo';

// Lazy-load sub-routes and modals to optimize initial mobile bundle size
const DynamicQRPage = lazy(() => import('./pages/DynamicQRPage'));
const StaticQRPage = lazy(() => import('./pages/StaticQRPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const UseCasePage = lazy(() => import('./pages/UseCasePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const AuthModal = lazy(() => import('./components/AuthModal'));

export default function App() {
  const useCaseRoutes = [
    'qr-code-for-restaurants', 
    'qr-code-for-events', 
    'qr-code-for-wifi', 
    'qr-code-for-business-cards'
  ];

  const contentRoutes = [
    'dynamic-qr', 
    'static-qr', 
    'dashboard', 
    'analytics', 
    'blog', 
    'compare',
    'community',
    'about',
    'contact',
    'privacy',
    'terms',
    'cookies',
    ...useCaseRoutes
  ];

  const [currentTab, setCurrentTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (contentRoutes.includes(path)) {
        return path;
      }
    }
    return 'home';
  });

  const [selectedQrId, setSelectedQrId] = useState(null);
  const [editingQRForStudio, setEditingQRForStudio] = useState(null);
  const [user, setUser] = useState(authStorage.getUser());
  const [systemStatus, setSystemStatus] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [authCustomPrompt, setAuthCustomPrompt] = useState('');

  // Comprehensive SEO update on route change
  useEffect(() => {
    applyPageSEO(currentTab);
    trackEvent('page_view', { page_path: `/${currentTab === 'home' ? '' : currentTab}` });
  }, [currentTab]);

  // Handle Browser Back / Forward History
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (contentRoutes.includes(path)) {
        setCurrentTab(path);
      } else {
        setCurrentTab('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Theme state ('dark' | 'light')
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('qrloop_theme');
    if (saved) return saved;
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('qrloop_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    async function init() {
      try {
        const status = await api.getStatus();
        setSystemStatus(status);
      } catch (err) {
        console.warn('Backend status check warning:', err);
      }

      if (authStorage.getToken()) {
        try {
          const profile = await api.getMe();
          setUser(profile);
        } catch (err) {
          console.warn('Token expired or invalid, reverting to guest mode');
          authStorage.clearToken();
          setUser(null);
        }
      }
    }
    init();
  }, []);

  const handleOpenAuth = (mode = 'login', promptMessage = '') => {
    setAuthModalMode(mode);
    setAuthCustomPrompt(promptMessage);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (authedUser) => {
    setUser(authedUser);
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
  };

  const handleNavigate = (tab, param = null) => {
    if (param) setSelectedQrId(param);
    setCurrentTab(tab);
    if (typeof window !== 'undefined') {
      const newPath = tab === 'home' ? '/' : `/${tab}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({ tab, param }, '', newPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 flex flex-col relative transition-colors duration-200">
      {/* Background grid pattern & ambient glow */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0" />
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-1/3 right-1/4 w-[500px] h-[500px] bg-cyanGlow-500/5 dark:bg-cyanGlow-500/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Header Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleNavigate}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        systemStatus={systemStatus}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main View Router with Suspense for code splitting */}
      <main className="flex-1 z-10">
        <Suspense fallback={
          <div className="min-h-[50vh] flex items-center justify-center" aria-label="Loading page content">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          </div>
        }>
          {currentTab === 'home' && (
            <LandingPage
              onNavigateToDynamic={() => handleNavigate('dynamic-qr')}
              onNavigateToStatic={() => handleNavigate('static-qr')}
              onNavigateToBlog={() => handleNavigate('blog')}
              onNavigateToCompare={() => handleNavigate('compare')}
              onNavigateToDashboard={() => handleNavigate('dashboard')}
            />
          )}

          {currentTab === 'dynamic-qr' && (
            <DynamicQRPage
              user={user}
              initialQR={editingQRForStudio}
              onOpenAuth={handleOpenAuth}
              onNavigateToDashboard={() => handleNavigate('dashboard')}
              onNavigateToAnalytics={(qrId) => handleNavigate('analytics', qrId)}
              onBackToHome={() => handleNavigate('home')}
            />
          )}

          {currentTab === 'static-qr' && (
            <StaticQRPage
              onBackToHome={() => handleNavigate('home')}
              onNavigateToDynamic={() => {
                setEditingQRForStudio(null);
                handleNavigate('dynamic-qr');
              }}
            />
          )}

          {currentTab === 'dashboard' && (
            <DashboardPage
              user={user}
              onNavigateToStudio={(qr) => {
                setEditingQRForStudio(qr || null);
                handleNavigate('dynamic-qr');
              }}
              onNavigateToAnalytics={(qrId) => handleNavigate('analytics', qrId)}
              onOpenAuth={handleOpenAuth}
              onBackToHome={() => handleNavigate('home')}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsPage
              selectedQrId={selectedQrId}
              onBack={() => handleNavigate('dashboard')}
              onNavigateToStudio={() => handleNavigate('dynamic-qr')}
              onBackToHome={() => handleNavigate('home')}
            />
          )}

          {currentTab === 'blog' && (
            <BlogPage
              onNavigateToDynamic={() => handleNavigate('dynamic-qr')}
              onNavigateToStatic={() => handleNavigate('static-qr')}
              onBackToHome={() => handleNavigate('home')}
            />
          )}

          {currentTab === 'compare' && (
            <ComparePage
              onNavigateToStudio={() => handleNavigate('dynamic-qr')}
              onBackToHome={() => handleNavigate('home')}
            />
          )}

          {currentTab === 'community' && (
            <CommunityPage
              onBackToHome={() => handleNavigate('home')}
              onNavigateToStudio={() => handleNavigate('dynamic-qr')}
              onNavigateToBlog={() => handleNavigate('blog')}
            />
          )}

          {currentTab === 'about' && (
            <AboutPage
              onBackToHome={() => handleNavigate('home')}
              onNavigateToDynamic={() => handleNavigate('dynamic-qr')}
              onNavigateToContact={() => handleNavigate('contact')}
              onNavigateToBlog={() => handleNavigate('blog')}
            />
          )}

          {currentTab === 'contact' && (
            <ContactPage
              onBackToHome={() => handleNavigate('home')}
              onNavigateToBlog={() => handleNavigate('blog')}
            />
          )}

          {currentTab === 'privacy' && (
            <PrivacyPage
              onBackToHome={() => handleNavigate('home')}
              onNavigateToCookies={() => handleNavigate('cookies')}
              onNavigateToContact={() => handleNavigate('contact')}
            />
          )}

          {currentTab === 'terms' && (
            <TermsPage
              onBackToHome={() => handleNavigate('home')}
              onNavigateToPrivacy={() => handleNavigate('privacy')}
              onNavigateToContact={() => handleNavigate('contact')}
            />
          )}

          {currentTab === 'cookies' && (
            <CookiePolicyPage
              onBackToHome={() => handleNavigate('home')}
              onNavigateToPrivacy={() => handleNavigate('privacy')}
              onNavigateToContact={() => handleNavigate('contact')}
            />
          )}

          {useCaseRoutes.includes(currentTab) && (
            <UseCasePage
              slug={currentTab}
              onNavigateToDynamic={() => handleNavigate('dynamic-qr')}
              onNavigateToStatic={() => handleNavigate('static-qr')}
              onBackToHome={() => handleNavigate('home')}
            />
          )}
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={(tab) => handleNavigate(tab)} />

      {/* Cookie Consent Banner */}
      <CookieConsent onNavigate={(tab) => handleNavigate(tab)} />

      {/* Auth Modal with Suspense */}
      <Suspense fallback={null}>
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authModalMode}
          customPrompt={authCustomPrompt}
          onAuthSuccess={handleAuthSuccess}
        />
      </Suspense>
    </div>
  );
}
