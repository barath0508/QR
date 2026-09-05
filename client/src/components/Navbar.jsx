import React, { useState } from 'react';
import { QrCode, BarChart3, LayoutDashboard, Sparkles, User, LogOut, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  user, 
  onOpenAuth, 
  onLogout,
  systemStatus,
  theme,
  toggleTheme
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-dark-950/80 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('studio')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyanGlow-500 shadow-glow-emerald transition-transform group-hover:scale-105">
            <QrCode className="w-5 h-5 text-dark-950 stroke-[2.5]" />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white dark:border-dark-950 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xl tracking-tight text-slate-900 dark:text-white">
                QR<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyanGlow-500">Loop</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                PRO FREE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Dynamic QR Studio & Live Analytics</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-dark-900/60 p-1 rounded-xl border border-slate-200 dark:border-white/5">
          <button
            onClick={() => setCurrentTab('studio')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'studio'
                ? 'bg-white dark:bg-brand-500/20 text-brand-600 dark:text-brand-300 shadow-sm border border-slate-200 dark:border-brand-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            Generator Studio
          </button>

          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'dashboard'
                ? 'bg-white dark:bg-brand-500/20 text-brand-600 dark:text-brand-300 shadow-sm border border-slate-200 dark:border-brand-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-cyanGlow-500" />
            My QR Codes
          </button>

          <button
            onClick={() => setCurrentTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'analytics'
                ? 'bg-white dark:bg-brand-500/20 text-brand-600 dark:text-brand-300 shadow-sm border border-slate-200 dark:border-brand-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-purple-500" />
            Scan Analytics
          </button>

          <button
            onClick={() => setCurrentTab('compare')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTab === 'compare'
                ? 'bg-white dark:bg-brand-500/20 text-brand-600 dark:text-brand-300 shadow-sm border border-slate-200 dark:border-brand-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/5'
            }`}
          >
            <span>Compare vs Paid</span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 font-mono">100% FREE</span>
          </button>
        </nav>

        {/* Right Section: Theme Toggle, System status pill & Auth */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-800 transition-all shadow-sm"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500 transition-transform -rotate-12 hover:rotate-0" />
            )}
          </button>

          {/* Health indicator */}
          <div className="flex items-center gap-2 text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>API Online</span>
            {systemStatus?.databaseMode && (
              <span className="text-[10px] text-slate-400 uppercase">({systemStatus.databaseMode})</span>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <div 
                onClick={() => setCurrentTab('dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/10 hover:border-brand-500/40 cursor-pointer transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-600 dark:text-brand-300 text-xs font-bold">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-tight">{user.name || 'User'}</p>
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Sign out"
                className="p-2 rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-brand-500 to-emerald-600 text-dark-950 font-bold hover:brightness-110 shadow-glow-emerald transition-all"
              >
                Create Account
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu and theme toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-white/5 bg-white dark:bg-dark-950 px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => { setCurrentTab('studio'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'studio' ? 'bg-brand-500/15 text-brand-600 dark:text-brand-300' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-brand-500" />
            Generator Studio
          </button>
          <button
            onClick={() => { setCurrentTab('dashboard'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'dashboard' ? 'bg-brand-500/15 text-brand-600 dark:text-brand-300' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-cyanGlow-500" />
            My QR Codes
          </button>
          <button
            onClick={() => { setCurrentTab('analytics'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'analytics' ? 'bg-brand-500/15 text-brand-600 dark:text-brand-300' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-purple-500" />
            Scan Analytics
          </button>
          <button
            onClick={() => { setCurrentTab('compare'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
              currentTab === 'compare' ? 'bg-brand-500/15 text-brand-600 dark:text-brand-300' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <span>Why QRLoop vs Paid</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-mono">100% FREE</span>
          </button>

          <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between px-2 py-1">
                <span className="text-xs text-slate-700 dark:text-slate-300">Signed in as {user.name}</span>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="text-xs text-red-500 hover:underline font-medium"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { onOpenAuth('register'); setMobileMenuOpen(false); }}
                  className="w-full py-2 rounded-lg text-xs font-bold bg-brand-500 text-dark-950"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
