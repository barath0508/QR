import React, { useState } from 'react';
import { X, Globe, Save, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function EditQRModal({ qr, isOpen, onClose, onUpdated }) {
  const [title, setTitle] = useState(qr?.title || '');
  const [destinationUrl, setDestinationUrl] = useState(qr?.destination_url || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen || !qr) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!destinationUrl.trim()) throw new Error('Destination URL cannot be empty');

      const updated = await api.updateQR(qr.id, {
        title: title.trim(),
        destination_url: destinationUrl.trim(),
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        if (onUpdated) onUpdated(updated.qr);
        onClose();
      }, 900);
    } catch (err) {
      setError(err.message || 'Failed to update QR code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-dark-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900 p-6 sm:p-7 shadow-2xl transition-colors">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero Re-print Magic</span>
          </div>
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            Update Destination URL
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Update where this QR code points instantly. Anyone scanning this printed code will immediately be routed to the new link.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-300 text-xs">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Destination updated successfully! Live immediately.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">QR Title / Label</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">New Destination URL</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="url"
                required
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                placeholder="https://example.com/new-landing-page"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/5 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
              <span>Short Redirect Link:</span>
              <a
                href={`${typeof window !== 'undefined' ? window.location.origin : ''}/r/${qr.short_code}`}
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 font-mono"
              >
                <span>/r/{qr.short_code}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-emerald-600 hover:brightness-110 text-dark-950 font-bold text-xs flex items-center gap-2 shadow-glow-emerald disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save New Destination</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
