import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Smartphone, 
  Monitor, 
  Globe, 
  Calendar, 
  ArrowLeft, 
  Download, 
  Eye, 
  Clock, 
  ExternalLink,
  Shield,
  Layers,
  MapPin
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { api } from '../services/api';
import AdBanner from '../components/AdBanner';

export default function AnalyticsPage({ 
  selectedQrId, 
  onBack, 
  onNavigateToStudio 
}) {
  const [qrsList, setQrsList] = useState([]);
  const [currentId, setCurrentId] = useState(selectedQrId || null);
  const [period, setPeriod] = useState('all');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadList() {
      try {
        const res = await api.listUserQRs().catch(() => ({ qr_codes: [] }));
        const list = res.qr_codes || res.qrs || [];
        setQrsList(list);
        if (!currentId && list.length > 0) {
          setCurrentId(list[0].id);
        }
      } catch (err) {
        console.error('Failed to load QR list for analytics:', err);
      }
    }
    loadList();
  }, []);

  useEffect(() => {
    if (!currentId) {
      setLoading(false);
      return;
    }

    async function fetchAnalytics() {
      setLoading(true);
      setError('');
      try {
        const res = await api.getQRAnalytics(currentId, period);
        setAnalyticsData(res);
      } catch (err) {
        setError(err.message || 'Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, [currentId, period]);

  const handleExportCSV = () => {
    if (!analyticsData || !analyticsData.recent_scans || analyticsData.recent_scans.length === 0) return;

    const headers = ['Timestamp', 'Device', 'OS', 'Browser', 'Location', 'Masked IP'];
    const rows = analyticsData.recent_scans.map((s) => [
      s.scanned_at,
      s.device || 'Unknown',
      s.os || 'Unknown',
      s.browser || 'Unknown',
      `"${s.location || 'Unknown'}"`,
      s.ip_address || '',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `qr_scans_${currentId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const COLORS = ['#10B981', '#06B6D4', '#6366F1', '#F59E0B', '#EC4899', '#8B5CF6'];

  const timeSeries = analyticsData?.time_series || [];
  const devices = analyticsData?.devices || [];
  const osData = analyticsData?.os || [];
  const browsers = analyticsData?.browsers || [];
  const locations = analyticsData?.locations || [];
  const recentScans = analyticsData?.recent_scans || [];
  const qrInfo = analyticsData?.qr_code || {};

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <span>Scan Telemetry & Insights</span>
            {qrInfo.title && (
              <span className="text-sm font-normal px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20">
                {qrInfo.title}
              </span>
            )}
          </h1>
        </div>

        {/* QR Selector & Range Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {qrsList.length > 1 && (
            <select
              value={currentId || ''}
              onChange={(e) => setCurrentId(e.target.value)}
              className="px-3 py-2 rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500 shadow-xs"
            >
              {qrsList.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.title || 'Untitled'} ({q.short_code})
                </option>
              ))}
            </select>
          )}

          <div className="flex items-center bg-slate-100 dark:bg-dark-900 p-1 rounded-xl border border-slate-200 dark:border-white/10 text-xs">
            {['24h', '7d', '30d', 'all'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-lg uppercase font-bold transition-all ${
                  period === p
                    ? 'bg-white dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 shadow-xs border border-slate-200 dark:border-brand-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            disabled={recentScans.length === 0}
            className="px-3 py-2 rounded-xl bg-white dark:bg-dark-900 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-40 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-brand-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-slate-400">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs">Gathering real-time scan analytics...</p>
        </div>
      ) : error ? (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-300 text-xs">
          {error}
        </div>
      ) : !currentId ? (
        <div className="py-20 text-center rounded-3xl border border-dashed border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/40 p-8">
          <BarChart3 className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">No QR Code Selected</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
            Create a dynamic QR code in the Studio to start tracking scans in real time.
          </p>
          <button
            onClick={onNavigateToStudio}
            className="px-4 py-2 rounded-xl bg-brand-500 text-dark-950 font-bold text-xs shadow-glow-emerald"
          >
            Go to Generator Studio
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 backdrop-blur-md shadow-xs dark:shadow-none">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Scans</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-display font-black text-emerald-600 dark:text-emerald-400">
                  {analyticsData?.summary?.total_scans || 0}
                </span>
                <span className="text-xs text-slate-400">hits</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 backdrop-blur-md shadow-xs dark:shadow-none">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Top Device</span>
              <div className="flex items-center gap-2 mt-1">
                <Smartphone className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                  {devices[0]?.name || 'No data yet'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 backdrop-blur-md shadow-xs dark:shadow-none">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Leading Platform</span>
              <div className="flex items-center gap-2 mt-1">
                <Monitor className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  {osData[0]?.name || 'No data yet'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-dark-900/60 backdrop-blur-md shadow-xs dark:shadow-none">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Top Location</span>
              <div className="flex items-center gap-2 mt-1">
                <Globe className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {locations[0]?.name || 'Global / Unknown'}
                </span>
              </div>
            </div>
          </div>

          {/* Scans Over Time Trend Chart */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/80 backdrop-blur-xl shadow-md dark:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-500" />
                  <span>Scans Over Time</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Chronological scan volume trend across selected period</p>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full">
              {timeSeries.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-slate-400 dark:text-slate-500">
                  No scan events recorded yet for this time window.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeries}>
                    <defs>
                      <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      stroke="#94A3B8" 
                      fontSize={11} 
                      tickLine={false} 
                    />
                    <YAxis 
                      stroke="#94A3B8" 
                      fontSize={11} 
                      tickLine={false} 
                      allowDecimals={false} 
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '0.75rem',
                        fontSize: '12px',
                        color: '#F8FAFC',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="scans"
                      stroke="#10B981"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#scanGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Breakdown Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/80 backdrop-blur-xl flex flex-col justify-between shadow-xs dark:shadow-none">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Device Breakdown</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">Mobile vs Desktop scanners</p>
              </div>

              <div className="h-48 flex items-center justify-center">
                {devices.length === 0 ? (
                  <span className="text-xs text-slate-400 dark:text-slate-500">No device data</span>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={devices}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={4}
                      >
                        {devices.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.1)',
                          fontSize: '11px',
                          color: '#fff',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] text-slate-600 dark:text-slate-300">
                {devices.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="capitalize">{d.name}: {d.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/80 backdrop-blur-xl flex flex-col justify-between shadow-xs dark:shadow-none">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Operating Systems</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">iOS, Android, Windows, macOS</p>
              </div>

              <div className="h-48">
                {osData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400 dark:text-slate-500">No OS data</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={osData} layout="vertical" margin={{ left: 10, right: 10 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={10} width={60} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.1)',
                          fontSize: '11px',
                          color: '#fff',
                        }}
                      />
                      <Bar dataKey="count" fill="#06B6D4" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center pt-2">Distribution by platform</div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/80 backdrop-blur-xl flex flex-col justify-between shadow-xs dark:shadow-none">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">Top Locations</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">Countries and cities</p>
              </div>

              <div className="h-48 overflow-y-auto space-y-2 pr-1">
                {locations.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400 dark:text-slate-500">No location data</div>
                ) : (
                  locations.map((loc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/5 text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <MapPin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-200 truncate">{loc.name}</span>
                      </div>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold ml-2">{loc.count}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center pt-2">IP-geocoded scan origins</div>
            </div>

          </div>

          {/* Real-time Scan Feed Stream */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/80 backdrop-blur-xl shadow-md dark:shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-500" />
                  <span>Recent Scan Stream</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Live feed of incoming redirect triggers</p>
              </div>
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{recentScans.length} events logged</span>
            </div>

            {recentScans.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
                No recent scans logged yet. Test your QR code by opening its redirect link!
              </div>
            ) : (
              <div className="divide-y divide-slate-200 dark:divide-white/5 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 dark:text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200 dark:border-white/5">
                      <th className="pb-2">Timestamp</th>
                      <th className="pb-2">Device</th>
                      <th className="pb-2">OS</th>
                      <th className="pb-2">Browser</th>
                      <th className="pb-2">Location</th>
                      <th className="pb-2">Masked IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                    {recentScans.map((scan, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                        <td className="py-2.5 font-mono text-slate-500 dark:text-slate-400 text-[11px] whitespace-nowrap">
                          {scan.scanned_at}
                        </td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 capitalize text-[11px]">
                            {scan.device || 'mobile'}
                          </span>
                        </td>
                        <td className="py-2.5 text-slate-900 dark:text-slate-200 font-medium">
                          {scan.os || 'Unknown'}
                        </td>
                        <td className="py-2.5 text-slate-600 dark:text-slate-400 text-[11px]">
                          {scan.browser || 'Browser'}
                        </td>
                        <td className="py-2.5 text-slate-800 dark:text-slate-300">
                          {scan.location || 'United States'}
                        </td>
                        <td className="py-2.5 font-mono text-slate-400 dark:text-slate-500 text-[11px]">
                          {scan.ip_address || '127.0.0.1'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

      <AdBanner type="leaderboard" />

    </div>
  );
}
