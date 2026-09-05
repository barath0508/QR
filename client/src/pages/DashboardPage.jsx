import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  BarChart3, 
  Search, 
  Filter, 
  Download, 
  Copy, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  CopyCheck, 
  Plus, 
  Zap, 
  Eye, 
  Layers, 
  LayoutGrid, 
  List, 
  Clock, 
  TrendingUp,
  Check,
  X,
  Palette,
  Maximize2,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { downloadCanvasAsPNG, downloadSVG, downloadPrintPDF, copyCanvasToClipboard } from '../utils/qrExporter';
import { drawStyledQRCode } from '../utils/qrRenderer';
import EditQRModal from '../components/EditQRModal';
import AdBanner from '../components/AdBanner';

/**
 * Derives the exact text/URL to encode into the QR code based on dynamic/static mode
 */
export function getEncodedTextForQR(qr) {
  if (!qr) return 'https://qrloop.io';
  if (qr.is_dynamic === false) {
    return qr.raw_data || qr.destination_url || 'https://qrloop.io';
  }
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return qr.short_code ? `${origin}/r/${qr.short_code}` : (qr.redirect_url || qr.short_url || qr.destination_url);
}

/**
 * Thumbnail rendering canvas that faithfully matches the user's custom design
 */
function QRCardThumbnail({ qr, onEnlarge, size = 'default' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !qr) return;
    const textToEncode = getEncodedTextForQR(qr);
    const canvasDim = size === 'small' ? 160 : 320;
    drawStyledQRCode(canvasRef.current, textToEncode, qr.style_config, canvasDim);
  }, [qr, size]);

  if (size === 'small') {
    return (
      <div 
        onClick={onEnlarge}
        className="relative p-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 cursor-pointer group/thumb hover:border-brand-500/40 transition-all"
        title="Click to preview"
      >
        <canvas ref={canvasRef} className="w-10 h-10 rounded shadow-xs" />
      </div>
    );
  }

  return (
    <div 
      onClick={onEnlarge}
      className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 cursor-pointer group/thumb hover:border-brand-500/50 hover:shadow-md transition-all"
      title="Click to preview full size & download"
    >
      <canvas ref={canvasRef} className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg shadow-sm group-hover/thumb:scale-[1.02] transition-transform" />
      <div className="absolute inset-0 rounded-xl bg-dark-950/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-semibold gap-1 backdrop-blur-[1px]">
        <Maximize2 className="w-3.5 h-3.5 text-white" />
        <span>View</span>
      </div>
    </div>
  );
}

/**
 * Full-size interactive QR Preview & Export Modal
 */
function QRPreviewModal({ qr, isOpen, onClose, onEditDesign }) {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen || !qr || !canvasRef.current) return;
    const text = getEncodedTextForQR(qr);
    drawStyledQRCode(canvasRef.current, text, qr.style_config, 640);
  }, [isOpen, qr]);

  if (!isOpen || !qr) return null;

  const style = typeof qr.style_config === 'string' 
    ? (() => { try { return JSON.parse(qr.style_config); } catch (e) { return {}; } })() 
    : (qr.style_config || {});
  const text = getEncodedTextForQR(qr);

  const handleCopy = async () => {
    if (!canvasRef.current) return;
    try {
      await copyCanvasToClipboard(canvasRef.current);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-dark-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900 p-6 sm:p-7 shadow-2xl transition-colors">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-500/20">
            {qr.qr_type || 'url'}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
            {qr.is_dynamic ? 'Dynamic Link' : 'Static Offline'}
          </span>
        </div>

        <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white truncate" title={qr.title}>
          {qr.title || 'Untitled QR'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate mt-0.5">
          {qr.destination_url}
        </p>

        {/* Large Canvas Preview */}
        <div className="my-5 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-inner">
          <canvas ref={canvasRef} className="w-64 h-64 sm:w-72 sm:h-72 rounded-xl shadow-md" />
        </div>

        {/* Style Badges */}
        <div className="grid grid-cols-4 gap-2 text-center text-[11px] mb-5">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/5">
            <span className="block text-[10px] text-slate-400 uppercase">Dots</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">{style.dotStyle || 'rounded'}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/5">
            <span className="block text-[10px] text-slate-400 uppercase">Eyes</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">{style.eyeStyle || 'rounded'}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/5">
            <span className="block text-[10px] text-slate-400 uppercase">Color</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: style.fgColor || '#0F172A' }} />
              <span className="font-mono text-[10px]">{style.fgColor || '#0F172A'}</span>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/5">
            <span className="block text-[10px] text-slate-400 uppercase">Pupil</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: style.eyeInnerColor || style.fgColor || '#10B981' }} />
              <span className="font-mono text-[10px]">{style.eyeInnerColor || '#10B981'}</span>
            </div>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => downloadCanvasAsPNG(canvasRef.current, `${qr.title || 'qr'}.png`, 2)}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-950 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-brand-500" />
              <span>PNG</span>
            </button>
            <button
              onClick={() => downloadSVG(text, style, `${qr.title || 'qr'}.svg`)}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-950 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-500" />
              <span>Vector SVG</span>
            </button>
            <button
              onClick={() => downloadPrintPDF(canvasRef.current, {
                title: qr.title,
                shortUrl: text,
                destinationUrl: qr.destination_url,
              }, `${qr.title || 'qr'}_standee.pdf`)}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-950 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-purple-500" />
              <span>Print PDF</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-950 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy PNG'}</span>
            </button>

            {onEditDesign && (
              <button
                onClick={() => {
                  onClose();
                  onEditDesign(qr);
                }}
                className="py-2.5 px-4 rounded-xl bg-brand-500/15 hover:bg-brand-500/25 border border-brand-500/30 text-brand-700 dark:text-brand-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Customize in Studio</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function DashboardPage({ 
  user, 
  onNavigateToStudio, 
  onNavigateToAnalytics, 
  onOpenAuth 
}) {
  const [qrs, setQrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [editingQR, setEditingQR] = useState(null);
  const [previewingQR, setPreviewingQR] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [actionError, setActionError] = useState('');

  const fetchQRs = async () => {
    setLoading(true);
    try {
      if (user) {
        const res = await api.listUserQRs();
        const list = res.qr_codes || res.qrs || [];
        setQrs(list);
      } else {
        const overview = await api.getDashboardOverview().catch(() => ({ qr_codes: [] }));
        const list = overview.qr_codes || overview.qrs || [];
        if (list.length > 0) {
          setQrs(list);
        } else {
          // Fallback to local guest saved QRs
          try {
            const guestList = JSON.parse(localStorage.getItem('qrloop_guest_qrs') || '[]');
            setQrs(guestList);
          } catch (e) {
            setQrs([]);
          }
        }
      }
    } catch (err) {
      console.error('Failed to load QRs:', err);
      try {
        const guestList = JSON.parse(localStorage.getItem('qrloop_guest_qrs') || '[]');
        if (guestList.length > 0) setQrs(guestList);
      } catch (e) {}
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQRs();
  }, [user]);

  const handleCopyLink = (qr) => {
    const fullUrl = getEncodedTextForQR(qr);
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(qr.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadPNG = async (qr) => {
    const offscreenCanvas = document.createElement('canvas');
    const textToEncode = getEncodedTextForQR(qr);
    await drawStyledQRCode(offscreenCanvas, textToEncode, qr.style_config, 1024);
    downloadCanvasAsPNG(offscreenCanvas, `${(qr.title || 'qr').replace(/\s+/g, '_')}_qr.png`, 1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this QR code? Redirects will stop working immediately.')) return;
    try {
      await api.deleteQR(id);
      setQrs(qrs.filter((q) => q.id !== id));
    } catch (err) {
      setActionError('Failed to delete QR code: ' + err.message);
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const res = await api.duplicateQR(id);
      if (res.qr) {
        setQrs([res.qr, ...qrs]);
      }
    } catch (err) {
      setActionError('Failed to duplicate QR code.');
    }
  };

  const filteredQrs = qrs.filter((item) => {
    const matchesType = typeFilter === 'all' || item.qr_type === typeFilter;
    const matchesSearch = 
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destination_url?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.short_code?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalScans = qrs.reduce((acc, curr) => acc + (curr.total_scans || 0), 0);
  const activeCount = qrs.filter((q) => q.is_active !== false).length;
  const topQR = qrs.length > 0 ? [...qrs].sort((a, b) => (b.total_scans || 0) - (a.total_scans || 0))[0] : null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header & Overview */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            Dynamic QR Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 hidden sm:block">
            Manage your dynamic redirect endpoints, monitor scan frequency, and update destinations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateToStudio && onNavigateToStudio()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-emerald-600 hover:brightness-110 text-dark-950 font-bold text-xs flex items-center gap-2 shadow-glow-emerald transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New QR</span>
          </button>
        </div>
      </div>

      {/* Guest Notice */}
      {!user && (
        <div className="p-4 rounded-2xl border border-cyan-500/20 bg-cyan-50 dark:bg-cyan-950/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
            <p className="text-xs text-cyan-900 dark:text-cyan-200">
              You are currently browsing in <strong className="text-cyan-950 dark:text-white">Guest Mode</strong>. Create a free account to save unlimited QRs permanently across devices.
            </p>
          </div>
          <button
            onClick={() => onOpenAuth('register')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-dark-950 transition-colors whitespace-nowrap shadow-sm"
          >
            Sign Up Free
          </button>
        </div>
      )}

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 backdrop-blur-md shadow-xs dark:shadow-none">
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total QRs</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">{qrs.length}</span>
            <span className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-mono">active</span>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 backdrop-blur-md shadow-xs dark:shadow-none">
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Scans</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-display font-bold text-emerald-600 dark:text-emerald-400">{totalScans}</span>
            <span className="text-[10px] sm:text-xs text-slate-400">lifetime</span>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 backdrop-blur-md shadow-xs dark:shadow-none">
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Links</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xl sm:text-2xl font-display font-bold text-cyan-600 dark:text-cyan-400">{activeCount}</span>
            <span className="text-[10px] sm:text-xs text-slate-400">online</span>
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 backdrop-blur-md shadow-xs dark:shadow-none">
          <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Top QR</span>
          <div className="truncate mt-1">
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white block truncate">
              {topQR ? topQR.title : 'None yet'}
            </span>
            <span className="text-[10px] sm:text-xs text-brand-600 dark:text-brand-400 font-mono">
              {topQR ? `${topQR.total_scans || 0} scans` : 'Awaiting scans'}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 shadow-xs dark:shadow-none">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, destination, or shortcode..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Types</option>
            <option value="url">Website URL</option>
            <option value="wifi">Wi-Fi</option>
            <option value="vcard">vCard</option>
            <option value="text">Text</option>
            <option value="email">Email</option>
          </select>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-dark-950 p-1 rounded-xl border border-slate-200 dark:border-white/5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs ${viewMode === 'grid' ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs ${viewMode === 'list' ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {actionError && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-300 text-xs">
          {actionError}
        </div>
      )}

      {/* QR Cards Grid / List */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs">Loading your QR codes...</p>
        </div>
      ) : filteredQrs.length === 0 ? (
        <div className="py-16 px-4 rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-dark-900/30 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500 mb-3">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">No QR Codes Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4">
            {searchQuery
              ? 'No QR codes match your search query. Try clearing your search.'
              : 'You have not created any dynamic QR codes yet. Create your first code with instant redirect tracking.'}
          </p>
          <button
            onClick={() => onNavigateToStudio && onNavigateToStudio()}
            className="px-4 py-2 rounded-xl bg-brand-500 text-dark-950 font-bold text-xs hover:brightness-110 shadow-glow-emerald"
          >
            Open Generator Studio
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredQrs.map((qr) => (
            <div
              key={qr.id}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/80 p-4 sm:p-5 backdrop-blur-md flex flex-col justify-between hover:border-brand-500/40 transition-all shadow-sm dark:shadow-lg group"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20 inline-block mb-1">
                      {qr.qr_type}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate" title={qr.title}>
                      {qr.title || 'Untitled QR'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-white/5 flex-shrink-0">
                    <Eye className="w-3 h-3 text-brand-500" />
                    <span className="text-[11px] font-bold font-mono text-emerald-600 dark:text-emerald-400">{qr.total_scans || 0}</span>
                  </div>
                </div>

                {/* QR Preview & Destination Details */}
                <div className="flex items-start gap-3 my-3">
                  <QRCardThumbnail qr={qr} onEnlarge={() => setPreviewingQR(qr)} />

                  <div className="flex-1 min-w-0 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Target URL</span>
                      <a
                        href={qr.destination_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-700 dark:text-slate-300 hover:text-brand-500 truncate block font-mono text-[11px] mt-0.5 leading-tight"
                        title={qr.destination_url}
                      >
                        {qr.destination_url}
                      </a>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Short Link</span>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
                        <span className="truncate">/r/{qr.short_code}</span>
                        <button
                          onClick={() => handleCopyLink(qr)}
                          title="Copy link"
                          className="ml-auto p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 flex-shrink-0"
                        >
                          {copiedId === qr.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2 mt-2">
                {/* Row 1 – 5 Primary Action Tiles */}
                <div className="grid grid-cols-5 gap-1">
                  {[
                    { label: 'PNG', icon: Download, color: 'emerald', action: () => handleDownloadPNG(qr), title: 'Download PNG' },
                    { label: 'View', icon: Maximize2, color: 'cyan', action: () => setPreviewingQR(qr), title: 'Preview & Export' },
                    { label: 'Design', icon: Palette, color: 'purple', action: () => onNavigateToStudio && onNavigateToStudio(qr), title: 'Customize in Studio' },
                    { label: 'Edit', icon: Edit3, color: 'blue', action: () => setEditingQR(qr), title: 'Change destination URL' },
                    { label: 'Stats', icon: BarChart3, color: 'brand', action: () => onNavigateToAnalytics(qr.id), title: 'View Scan Analytics' },
                  ].map(({ label, icon: Icon, color, action, title }) => (
                    <button
                      key={label}
                      onClick={action}
                      title={title}
                      className={`flex flex-col items-center justify-center gap-0.5 py-2.5 rounded-xl border text-[10px] font-semibold leading-none transition-all
                        bg-slate-100 dark:bg-dark-950 border-slate-200 dark:border-white/5
                        text-slate-600 dark:text-slate-400
                        active:scale-95
                        hover:bg-${color}-50 dark:hover:bg-${color}-500/10 hover:border-${color}-400/40 hover:text-${color}-600 dark:hover:text-${color}-400`}
                    >
                      <Icon className="w-4 h-4 mb-0.5" />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Row 2 – Secondary Actions */}
                <div className="flex items-center justify-end gap-0.5 pt-1.5 border-t border-slate-100 dark:border-white/5">
                  <button
                    onClick={() => handleDuplicate(qr.id)}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 active:scale-95 transition-all"
                  >
                    <CopyCheck className="w-3.5 h-3.5" />
                    <span>Duplicate</span>
                  </button>
                  <button
                    onClick={() => handleDelete(qr.id)}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-[11px] font-medium text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 active:scale-95 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View — mobile-optimised */
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/80 overflow-hidden shadow-sm dark:shadow-none">
          <div className="divide-y divide-slate-200 dark:divide-white/5">
            {filteredQrs.map((qr) => (
              <div key={qr.id} className="p-3 sm:p-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                {/* Top row: thumb + info + scan badge */}
                <div className="flex items-center gap-3">
                  <QRCardThumbnail qr={qr} onEnlarge={() => setPreviewingQR(qr)} size="small" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[140px] sm:max-w-none">{qr.title || 'Untitled QR'}</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20 flex-shrink-0">
                        {qr.qr_type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate mt-0.5">{qr.destination_url}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">{qr.total_scans || 0} scans</span>
                      <span className="text-[10px] text-slate-400 font-mono truncate">/r/{qr.short_code}</span>
                      <button
                        onClick={() => handleCopyLink(qr)}
                        className="ml-auto p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 flex-shrink-0"
                        title="Copy link"
                      >
                        {copiedId === qr.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action buttons — horizontally scrollable on mobile */}
                <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
                  <button onClick={() => handleDownloadPNG(qr)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 dark:bg-dark-950 dark:hover:bg-emerald-500/10 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 text-[11px] font-medium whitespace-nowrap flex-shrink-0 active:scale-95 transition-all">
                    <Download className="w-3.5 h-3.5" /><span>PNG</span>
                  </button>
                  <button onClick={() => setPreviewingQR(qr)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-cyan-50 dark:bg-dark-950 dark:hover:bg-cyan-500/10 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-cyan-600 text-[11px] font-medium whitespace-nowrap flex-shrink-0 active:scale-95 transition-all">
                    <Maximize2 className="w-3.5 h-3.5" /><span>View</span>
                  </button>
                  <button onClick={() => onNavigateToStudio && onNavigateToStudio(qr)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-purple-50 dark:bg-dark-950 dark:hover:bg-purple-500/10 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-purple-600 text-[11px] font-medium whitespace-nowrap flex-shrink-0 active:scale-95 transition-all">
                    <Palette className="w-3.5 h-3.5" /><span>Design</span>
                  </button>
                  <button onClick={() => setEditingQR(qr)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 dark:bg-dark-950 dark:hover:bg-blue-500/10 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-blue-600 text-[11px] font-medium whitespace-nowrap flex-shrink-0 active:scale-95 transition-all">
                    <Edit3 className="w-3.5 h-3.5" /><span>Edit URL</span>
                  </button>
                  <button onClick={() => onNavigateToAnalytics(qr.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-brand-500/15 hover:bg-brand-500/25 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-[11px] font-semibold whitespace-nowrap flex-shrink-0 active:scale-95 transition-all">
                    <BarChart3 className="w-3.5 h-3.5" /><span>Stats</span>
                  </button>
                  <div className="ml-auto flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => handleDuplicate(qr.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 active:scale-95 transition-all" title="Duplicate">
                      <CopyCheck className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(qr.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 active:scale-95 transition-all" title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Destination Editor Modal */}
      {editingQR && (
        <EditQRModal
          qr={editingQR}
          isOpen={!!editingQR}
          onClose={() => setEditingQR(null)}
          onUpdated={(updated) => {
            setQrs(qrs.map((item) => (item.id === updated.id ? updated : item)));
          }}
        />
      )}

      {/* Full QR Design Preview & Export Modal */}
      {previewingQR && (
        <QRPreviewModal
          qr={previewingQR}
          isOpen={!!previewingQR}
          onClose={() => setPreviewingQR(null)}
          onEditDesign={(qr) => {
            setPreviewingQR(null);
            if (onNavigateToStudio) onNavigateToStudio(qr);
          }}
        />
      )}

      <AdBanner type="in-feed" />

    </div>
  );
}
