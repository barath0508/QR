import React, { useState } from 'react';
import { Sparkles, Zap, Shield, ArrowLeft, CheckCircle2, Lock, UserCheck } from 'lucide-react';
import QRStudio from '../components/QRStudio';
import AdBanner from '../components/AdBanner';

export default function DynamicQRPage({ 
  user, 
  onOpenAuth, 
  onNavigateToDashboard, 
  onNavigateToAnalytics,
  onBackToHome,
  initialQR,
}) {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Banner & Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/5">
          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
                Dynamic QR Code Studio
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-mono">
                Live Redirects
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Design a fully trackable dynamic QR code. Update the destination URL anytime without re-printing.
            </p>
          </div>

          {/* User state indicator */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs">
                <UserCheck className="w-4 h-4 text-emerald-500" />
                <span>Logged in as <strong>{user.name || user.email}</strong></span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Guest Mode</p>
                  <p className="text-[10px] text-slate-400">Login required to save & deploy</p>
                </div>
                <button
                  onClick={() => onOpenAuth('login', 'Sign in to save and deploy dynamic QR codes with live redirect tracking.')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white shadow-xs"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('register', 'Create a free account to save unlimited dynamic QR codes and track live scans.')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-400 text-dark-950 shadow-glow-emerald transition-all"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Studio with Auth Guard handler */}
      <QRStudio
        user={user}
        forcedDynamic={true}
        initialQR={initialQR}
        onRequireAuth={(promptMessage) => {
          onOpenAuth('register', promptMessage || 'Please sign in or create a free account to save your Dynamic QR code and track live scans.');
        }}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToAnalytics={onNavigateToAnalytics}
      />

      {/* Guide Note */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-brand-500 flex-shrink-0" />
            <p className="text-slate-600 dark:text-slate-400">
              Need a simple static code without redirect tracking? Use our instant{' '}
              <button
                onClick={() => onNavigateToDashboard('static-qr')}
                className="text-brand-600 dark:text-brand-400 font-semibold hover:underline"
              >
                Static QR Generator
              </button>{' '}
              (no account needed).
            </p>
          </div>
        </div>
      </div>

      <AdBanner type="leaderboard" />

    </div>
  );
}
