import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import LandingPage from './pages/LandingPage';
import DynamicQRPage from './pages/DynamicQRPage';
import StaticQRPage from './pages/StaticQRPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import BlogPage from './pages/BlogPage';
import ComparePage from './pages/ComparePage';
import { api, authStorage } from './services/api';

export default function App() {
  // Routes: 'home' | 'dynamic-qr' | 'static-qr' | 'dashboard' | 'analytics' | 'blog' | 'compare'
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedQrId, setSelectedQrId] = useState(null);
  const [user, setUser] = useState(authStorage.getUser());
  const [systemStatus, setSystemStatus] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [authCustomPrompt, setAuthCustomPrompt] = useState('');

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 flex flex-col bg-grid-pattern relative transition-colors duration-200">
      {/* Background ambient glow */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-[500px] h-[500px] bg-cyanGlow-500/5 dark:bg-cyanGlow-500/10 rounded-full blur-[140px] pointer-events-none" />

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

      {/* Main View Router */}
      <main className="flex-1 z-10">
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
            onOpenAuth={handleOpenAuth}
            onNavigateToDashboard={() => handleNavigate('dashboard')}
            onNavigateToAnalytics={(qrId) => handleNavigate('analytics', qrId)}
            onBackToHome={() => handleNavigate('home')}
          />
        )}

        {currentTab === 'static-qr' && (
          <StaticQRPage
            onBackToHome={() => handleNavigate('home')}
            onNavigateToDynamic={() => handleNavigate('dynamic-qr')}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            user={user}
            onNavigateToStudio={() => handleNavigate('dynamic-qr')}
            onNavigateToAnalytics={(qrId) => handleNavigate('analytics', qrId)}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentTab === 'analytics' && (
          <AnalyticsPage
            selectedQrId={selectedQrId}
            onBack={() => handleNavigate('dashboard')}
            onNavigateToStudio={() => handleNavigate('dynamic-qr')}
          />
        )}

        {currentTab === 'blog' && (
          <BlogPage
            onNavigateToDynamic={() => handleNavigate('dynamic-qr')}
            onNavigateToStatic={() => handleNavigate('static-qr')}
          />
        )}

        {currentTab === 'compare' && (
          <ComparePage
            onNavigateToStudio={() => handleNavigate('dynamic-qr')}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={(tab) => handleNavigate(tab)} />

      {/* Auth Modal with contextual prompt support */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        customPrompt={authCustomPrompt}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
