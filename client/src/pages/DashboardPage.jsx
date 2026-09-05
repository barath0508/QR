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
  Check
} from 'lucide-react';
import { api } from '../services/api';
import { downloadCanvasAsPNG, downloadSVG, downloadPrintPDF, copyCanvasToClipboard } from '../utils/qrExporter';
import EditQRModal from '../components/EditQRModal';
import AdBanner from '../components/AdBanner';

function QRCardThumbnail({ qr }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !qr) return;
    const redirectUrl = qr.redirect_url || qr.short_url || `${window.location.origin}/r/${qr.short_code}`;
    QRCode.toCanvas(canvasRef.current, redirectUrl, {
      width: 140,
      margin: 1,
      color: {
        dark: qr.style_config?.fgColor || '#0F172A',
        light: qr.style_config?.bgColor || '#FFFFFF',
      },
    }).catch(console.error);
  }, [qr]);

  return (
    <div className="relative p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg shadow-sm" />
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
    const fullUrl = qr.redirect_url || qr.short_url || `${window.location.origin}/r/${qr.short_code}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(qr.id);
    setTimeout(() => setCopiedId(null), 2000);
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
          <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight">
            Dynamic QR Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your dynamic redirect endpoints, monitor scan frequency, and update destinations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToStudio}
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 backdrop-blur-md shadow-xs dark:shadow-none">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total QR Codes</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-display font-bold text-slate-900 dark:text-white">{qrs.length}</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">100% active</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 backdrop-blur-md shadow-xs dark:shadow-none">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Scans Recorded</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-display font-bold text-emerald-600 dark:text-emerald-400">{totalScans}</span>
            <span className="text-xs text-slate-400">lifetime</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 backdrop-blur-md shadow-xs dark:shadow-none">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Links</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-display font-bold text-cyan-600 dark:text-cyan-400">{activeCount}</span>
            <span className="text-xs text-slate-400">routes online</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 backdrop-blur-md shadow-xs dark:shadow-none">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Top Performing</span>
          <div className="truncate mt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white block truncate">
              {topQR ? topQR.title : 'None yet'}
            </span>
            <span className="text-xs text-brand-600 dark:text-brand-400 font-mono">
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
            onClick={onNavigateToStudio}
            className="px-4 py-2 rounded-xl bg-brand-500 text-dark-950 font-bold text-xs hover:brightness-110 shadow-glow-emerald"
          >
            Open Generator Studio
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQrs.map((qr) => (
            <div
              key={qr.id}
              className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/80 p-5 backdrop-blur-md flex flex-col justify-between hover:border-brand-500/40 transition-all shadow-sm dark:shadow-lg group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20 inline-block mb-1">
                      {qr.qr_type}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate" title={qr.title}>
                      {qr.title || 'Untitled QR'}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-white/5 text-xs font-mono">
                    <Eye className="w-3 h-3 text-brand-500" />
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{qr.total_scans || 0}</span>
                  </div>
                </div>

                {/* QR Preview & Destination Details */}
                <div className="flex items-center gap-4 my-3">
                  <QRCardThumbnail qr={qr} />

                  <div className="flex-1 min-w-0 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Redirect Target:</span>
                      <a
                        href={qr.destination_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-300 truncate block font-mono text-[11px]"
                        title={qr.destination_url}
                      >
                        {qr.destination_url}
                      </a>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Short Link:</span>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                        <span className="truncate">/r/{qr.short_code}</span>
                        <button
                          onClick={() => handleCopyLink(qr)}
                          title="Copy Link"
                          className="p-1 hover:text-slate-900 dark:hover:text-white"
                        >
                          {copiedId === qr.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingQR(qr)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-dark-950 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-300 border border-slate-200 dark:border-white/5 text-xs flex items-center gap-1.5 transition-colors"
                    title="Change destination URL"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium hidden sm:inline">Edit URL</span>
                  </button>

                  <button
                    onClick={() => onNavigateToAnalytics(qr.id)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-dark-950 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 border border-slate-200 dark:border-white/5 text-xs flex items-center gap-1.5 transition-colors"
                    title="View Scan Analytics"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium hidden sm:inline">Stats</span>
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDuplicate(qr.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                    title="Duplicate QR"
                  >
                    <CopyCheck className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(qr.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                    title="Delete QR"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/80 overflow-hidden shadow-sm dark:shadow-none">
          <div className="divide-y divide-slate-200 dark:divide-white/5">
            {filteredQrs.map((qr) => (
              <div key={qr.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500 flex-shrink-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{qr.title || 'Untitled QR'}</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                        {qr.qr_type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate max-w-md">{qr.destination_url}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono block">{qr.total_scans || 0} scans</span>
                    <span className="text-[10px] text-slate-400 font-mono">/r/{qr.short_code}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditingQR(qr)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-dark-950 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-medium"
                    >
                      Edit URL
                    </button>
                    <button
                      onClick={() => onNavigateToAnalytics(qr.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-brand-500/15 text-brand-700 dark:text-brand-300 text-xs font-semibold"
                    >
                      Analytics
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

      <AdBanner type="in-feed" />

    </div>
  );
}
