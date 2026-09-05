import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ComparePage from './pages/ComparePage';
import { api, authStorage } from './services/api';

export default function App() {
  const [currentTab, setCurrentTab] = useState('studio'); // 'studio' | 'dashboard' | 'analytics' | 'compare'
  const [selectedQrId, setSelectedQrId] = useState(null);
  const [user, setUser] = useState(authStorage.getUser());
  const [systemStatus, setSystemStatus] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  // Theme state ('dark' | 'light')
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('qrloop_theme');
    if (saved) return saved;
    return 'dark'; // default to dark
  });

  // Apply theme to document element
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

  // Verify auth session and system status on mount
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

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (authedUser) => {
    setUser(authedUser);
  };

  const handleLogout = () => {
    api.logout();
    setUser(null);
  };

  const handleNavigateToAnalytics = (qrId) => {
    setSelectedQrId(qrId);
    setCurrentTab('analytics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToDashboard = () => {
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToStudio = () => {
    setCurrentTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCompare = () => {
    setCurrentTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 flex flex-col bg-grid-pattern relative transition-colors duration-200">
      {/* Ambient background lighting effects */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-1/3 right-1/4 w-[500px] h-[500px] bg-cyanGlow-500/5 dark:bg-cyanGlow-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Header Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        systemStatus={systemStatus}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main View Area */}
      <main className="flex-1 z-10">
        {currentTab === 'studio' && (
          <LandingPage
            user={user}
            onSavedQR={() => {}}
            onNavigateToDashboard={handleNavigateToDashboard}
            onNavigateToAnalytics={handleNavigateToAnalytics}
            onNavigateToCompare={handleNavigateToCompare}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            user={user}
            onNavigateToStudio={handleNavigateToStudio}
            onNavigateToAnalytics={handleNavigateToAnalytics}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentTab === 'analytics' && (
          <AnalyticsPage
            selectedQrId={selectedQrId}
            onBack={handleNavigateToDashboard}
            onNavigateToStudio={handleNavigateToStudio}
          />
        )}

        {currentTab === 'compare' && (
          <ComparePage
            onNavigateToStudio={handleNavigateToStudio}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={(tab) => {
        setCurrentTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Auth Modal (Sign In / Register) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
