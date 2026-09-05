import React, { useState } from 'react';
import { 
  QrCode, 
  BarChart3, 
  LayoutDashboard, 
  Sparkles, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Zap, 
  BookOpen, 
  CheckCircle2,
  Scale
} from 'lucide-react';

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

  const navItems = [
    { id: 'dynamic-qr', label: 'Dynamic QR', icon: Zap },
    { id: 'static-qr', label: 'Static QR', icon: QrCode },
    { id: 'dashboard', label: 'My Codes', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'blog', label: 'Guides', icon: BookOpen },
    { id: 'compare', label: 'Why Free', icon: Scale },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-white/5 bg-white/90 dark:bg-dark-950/90 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo -> Routes to Home */}
        <div 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-cyanGlow-500 shadow-glow-emerald transition-transform group-hover:scale-105">
            <QrCode className="w-5 h-5 text-dark-950 stroke-[2.4]" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-dark-950 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              QR<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-cyanGlow-500">Loop</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 font-mono">
              FREE
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-dark-900/70 p-1 rounded-xl border border-slate-200/80 dark:border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-white dark:bg-brand-500/20 text-brand-600 dark:text-brand-300 shadow-sm border border-slate-200/80 dark:border-brand-500/30 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/40 dark:hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-500' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: Theme Toggle, Health status, Auth */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            className="p-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-dark-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-800 transition-all shadow-xs"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <div 
                onClick={() => setCurrentTab('dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-dark-900 border border-slate-200 dark:border-white/10 hover:border-brand-500/40 cursor-pointer transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-600 dark:text-brand-300 text-xs font-bold">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">{user.name || 'User'}</p>
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Sign out"
                className="p-2 rounded-xl bg-slate-100/80 dark:bg-dark-900 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3.5 py-1.5 rounded-xl text-[13px] font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="px-4 py-1.5 rounded-xl text-[13px] font-semibold bg-emerald-500 hover:bg-emerald-400 text-dark-950 shadow-sm transition-all transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button and theme toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-white/5 bg-white dark:bg-dark-950 px-4 pt-3 pb-5 space-y-2 shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setCurrentTab(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-brand-500/15 text-brand-600 dark:text-brand-300 font-semibold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-500' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between px-2 py-1">
                <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">Signed in as {user.name}</span>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="text-xs text-red-500 hover:underline font-semibold"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { onOpenAuth('register'); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-dark-950 shadow-sm"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
