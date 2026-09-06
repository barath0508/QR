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
  const [currentTab, setCurrentTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (['dynamic-qr', 'static-qr', 'dashboard', 'analytics', 'blog', 'compare'].includes(path)) {
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

  // Page SEO configuration for dynamic title & meta updates
  const pageSEO = {
    'home': {
      title: 'Free Dynamic QR Code Generator with Analytics | QRLoop',
      desc: 'Create free dynamic QR codes with editable URLs, custom branding, high-resolution PNG, SVG and PDF downloads, and QR scan analytics. No expiration or watermark.',
      indexable: true,
    },
    'dynamic-qr': {
      title: 'Dynamic QR Code Generator: Edit URLs After Printing | QRLoop',
      desc: 'Create a trackable dynamic QR code, change its destination URL anytime, and monitor scans by device and location. Free QR code generator with no expiration.',
      indexable: true,
    },
    'static-qr': {
      title: 'Free Static QR Code Generator for URLs, Wi-Fi & vCards | QRLoop',
      desc: 'Generate a permanent static QR code for a website, Wi-Fi network, contact card, text, email or phone number. Download PNG, SVG or PDF without an account.',
      indexable: true,
    },
    'dashboard': {
      title: 'My Dynamic QR Codes - Real-Time Management Dashboard | QRLoop',
      desc: 'Manage your active dynamic QR codes, update destination URLs on the fly, export print standees, and inspect live scan telemetry.',
      indexable: false,
    },
    'analytics': {
      title: 'QR Code Scan Analytics & Real-Time Telemetry | QRLoop',
      desc: 'Track QR code performance with real-time scan volume, device breakdown, operating systems, browsers, and top geographic locations.',
      indexable: false,
    },
    'blog': {
      title: 'QR Code Guides: Printing, Analytics & Dynamic QR Tips | QRLoop',
      desc: 'Learn how dynamic and static QR codes work, how to print scannable codes, and how to measure QR scans for marketing campaigns.',
      indexable: true,
    },
    'compare': {
      title: 'QR Code Generator Comparison: Free Dynamic QR Alternatives | QRLoop',
      desc: 'Compare QRLoop with paid QR code platforms for editable links, scan analytics, QR customization, exports, pricing and expiration policies.',
      indexable: true,
    },
  };

  useEffect(() => {
    const seo = pageSEO[currentTab] || pageSEO['home'];
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', seo.desc);
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute(
        'content',
        seo.indexable ? 'index, follow, max-snippet:-1, max-image-preview:large' : 'noindex, nofollow'
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute(
        'href',
        `https://qrloop4.vercel.app${currentTab === 'home' ? '/' : `/${currentTab}`}`
      );
    }
  }, [currentTab]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (['dynamic-qr', 'static-qr', 'dashboard', 'analytics', 'blog', 'compare'].includes(path)) {
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
