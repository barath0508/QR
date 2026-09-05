import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { 
  Link, 
  Wifi, 
  UserSquare2, 
  FileText, 
  Mail, 
  Phone, 
  Palette, 
  Shapes, 
  Image as ImageIcon, 
  Download, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  Zap, 
  Check, 
  RefreshCw, 
  Eye,
  CheckCircle2
} from 'lucide-react';
import { downloadCanvasAsPNG, downloadSVG, downloadPrintPDF, copyCanvasToClipboard } from '../utils/qrExporter';
import { drawStyledQRCode } from '../utils/qrRenderer';
import { api } from '../services/api';
import AdBanner from './AdBanner';

export default function QRStudio({ 
  user, 
  onSavedQR, 
  onNavigateToDashboard, 
  onNavigateToAnalytics,
  forcedDynamic,
  onRequireAuth,
  initialQR,
}) {
  // Active QR Content Type
  const [activeType, setActiveType] = useState('url'); // 'url' | 'wifi' | 'vcard' | 'text' | 'email' | 'phone'
  
  // Dynamic vs Static toggle
  const [isDynamic, setIsDynamic] = useState(forcedDynamic !== undefined ? forcedDynamic : true);
  const [customAlias, setCustomAlias] = useState('');
  const [qrTitle, setQrTitle] = useState('My Dynamic QR');

  // Payload states
  const [url, setUrl] = useState('https://example.com');
  const [wifiData, setWifiData] = useState({ ssid: 'Office-WiFi', password: '', security: 'WPA', hidden: false });
  const [vcardData, setVcardData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    phone: '+1 555 019 2834',
    email: 'alex@example.com',
    company: 'Tech Studio',
    title: 'Lead Designer',
    website: 'https://alexmorgan.dev',
    address: 'San Francisco, CA',
  });
  const [textData, setTextData] = useState('Hello from QRLoop Dynamic QR!');
  const [emailData, setEmailData] = useState({ to: 'hello@example.com', subject: 'Inquiry from QR Code', body: 'Hi there,' });
  const [phoneData, setPhoneData] = useState('+1 555 019 2834');

  // Design & Customization states
  const [fgColor, setFgColor] = useState('#0F172A');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [dotStyle, setDotStyle] = useState('rounded'); // 'square' | 'rounded' | 'dots' | 'smooth'
  const [eyeStyle, setEyeStyle] = useState('rounded'); // 'square' | 'rounded' | 'circle'
  const [eyeOuterColor, setEyeOuterColor] = useState('#0F172A');
  const [eyeInnerColor, setEyeInnerColor] = useState('#10B981');
  const [useSeparateEyeColors, setUseSeparateEyeColors] = useState(true);
  const [errorCorrection, setErrorCorrection] = useState('H'); // L, M, Q, H
  
  // Logo overlay states
  const [logoImage, setLogoImage] = useState(null);
  const [logoDataUrl, setLogoDataUrl] = useState(null);
  const [logoPreset, setLogoPreset] = useState(null); // 'globe' | 'wifi' | 'user' | 'sparkles'
  const [logoPadding, setLogoPadding] = useState(6);
  const [logoShape, setLogoShape] = useState('circle'); // 'circle' | 'square'

  // Canvas and generated info
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [downloadSize, setDownloadSize] = useState('1024');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccessQR, setSavedSuccessQR] = useState(null);
  const [saveError, setSaveError] = useState('');

  // Pre-populate if initialQR is provided for editing design
  useEffect(() => {
    if (!initialQR) return;
    if (initialQR.title) setQrTitle(initialQR.title);
    setIsDynamic(initialQR.is_dynamic !== false);
    if (initialQR.qr_type) setActiveType(initialQR.qr_type);
    if (initialQR.destination_url) setUrl(initialQR.destination_url);
    if (initialQR.style_config) {
      let cfg = initialQR.style_config;
      if (typeof cfg === 'string') {
        try { cfg = JSON.parse(cfg); } catch (e) { cfg = {}; }
      }
      if (cfg.fgColor) setFgColor(cfg.fgColor);
      if (cfg.bgColor) setBgColor(cfg.bgColor);
      if (cfg.dotStyle) setDotStyle(cfg.dotStyle);
      if (cfg.eyeStyle) setEyeStyle(cfg.eyeStyle);
      if (cfg.eyeOuterColor) setEyeOuterColor(cfg.eyeOuterColor);
      if (cfg.eyeInnerColor) setEyeInnerColor(cfg.eyeInnerColor);
      if (cfg.useSeparateEyeColors !== undefined) setUseSeparateEyeColors(cfg.useSeparateEyeColors);
      if (cfg.errorCorrection) setErrorCorrection(cfg.errorCorrection);
      if (cfg.logoPreset) setLogoPreset(cfg.logoPreset);
      if (cfg.logoShape) setLogoShape(cfg.logoShape);
      if (cfg.logoPadding !== undefined) setLogoPadding(cfg.logoPadding);
      if (cfg.logoDataUrl) {
        setLogoDataUrl(cfg.logoDataUrl);
        const img = new Image();
        img.onload = () => setLogoImage(img);
        img.src = cfg.logoDataUrl;
      }
    }
    setSavedSuccessQR(initialQR);
  }, [initialQR]);

  // Formatted QR Text calculation
  const getFormattedPayload = () => {
    switch (activeType) {
      case 'url':
        return url || 'https://qrloop.io';
      case 'wifi':
        return `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};H:${wifiData.hidden ? 'true' : 'false'};;`;
      case 'vcard':
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `N:${vcardData.lastName};${vcardData.firstName};;;`,
          `FN:${vcardData.firstName} ${vcardData.lastName}`.trim(),
          vcardData.company ? `ORG:${vcardData.company}` : '',
          vcardData.title ? `TITLE:${vcardData.title}` : '',
          vcardData.phone ? `TEL;TYPE=CELL:${vcardData.phone}` : '',
          vcardData.email ? `EMAIL:${vcardData.email}` : '',
          vcardData.website ? `URL:${vcardData.website}` : '',
          vcardData.address ? `ADR;TYPE=WORK:;;${vcardData.address};;;;` : '',
          'END:VCARD',
        ].filter(Boolean).join('\n');
      case 'text':
        return textData || 'Text QR';
      case 'email':
        return `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
      case 'phone':
        return `tel:${phoneData}`;
      default:
        return url || 'https://qrloop.io';
    }
  };

  const currentEncodedText = savedSuccessQR 
    ? (savedSuccessQR.redirect_url || savedSuccessQR.short_url || `${typeof window !== 'undefined' ? window.location.origin : ''}/r/${savedSuccessQR.short_code}`)
    : getFormattedPayload();

  const renderCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    await drawStyledQRCode(
      canvas,
      currentEncodedText,
      {
        fgColor,
        bgColor,
        dotStyle,
        eyeStyle,
        eyeOuterColor,
        eyeInnerColor,
        useSeparateEyeColors,
        errorCorrection,
        logoPreset,
        logoShape,
        logoPadding,
      },
      640,
      logoImage
    );
  };

  useEffect(() => {
    renderCanvas();
  }, [
    activeType,
    url,
    wifiData,
    vcardData,
    textData,
    emailData,
    phoneData,
    fgColor,
    bgColor,
    dotStyle,
    eyeStyle,
    eyeOuterColor,
    eyeInnerColor,
    useSeparateEyeColors,
    errorCorrection,
    logoImage,
    logoPreset,
    logoPadding,
    logoShape,
    savedSuccessQR,
  ]);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setLogoDataUrl(dataUrl);
      const img = new Image();
      img.onload = () => {
        setLogoImage(img);
        setLogoPreset(null);
        setErrorCorrection('H');
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = async () => {
    try {
      await copyCanvasToClipboard(canvasRef.current);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const handleSaveDynamicQR = async () => {
    // Prompt for login or registration if guest
    if (!user) {
      if (onRequireAuth) {
        onRequireAuth(isDynamic 
          ? 'Create a free account or sign in to activate dynamic redirect tracking and save this QR code.'
          : 'Create a free account or sign in to save this QR code to your dashboard.');
      } else {
        setSaveError('Please sign in or create a free account to save QR codes.');
      }
      return;
    }

    setIsSaving(true);
    setSaveError('');

    try {
      const styleConfigObj = {
        fgColor,
        bgColor,
        dotStyle,
        eyeStyle,
        eyeOuterColor,
        eyeInnerColor,
        useSeparateEyeColors,
        errorCorrection,
        logoPreset,
        logoShape,
        logoPadding,
        logoDataUrl: logoDataUrl || undefined,
      };

      let resultQR = null;
      if (initialQR && initialQR.id) {
        const updateRes = await api.updateQR(initialQR.id, {
          title: qrTitle || (isDynamic ? 'My Dynamic QR' : 'My Static QR'),
          destination_url: activeType === 'url' ? url : getFormattedPayload(),
          style_config: styleConfigObj,
        });
        resultQR = updateRes.qr;
      } else {
        const payload = {
          title: qrTitle || (isDynamic ? 'My Dynamic QR' : 'My Static QR'),
          qr_type: activeType,
          destination_url: activeType === 'url' ? url : getFormattedPayload(),
          custom_alias: customAlias.trim() || undefined,
          is_dynamic: isDynamic,
          style_config: styleConfigObj,
        };
        const createRes = await api.createQR(payload);
        resultQR = createRes.qr;
      }

      setSavedSuccessQR(resultQR);
      if (onSavedQR) onSavedQR(resultQR);

      // Also persist in local cache for immediate availability
      try {
        const existing = JSON.parse(localStorage.getItem('qrloop_guest_qrs') || '[]');
        const updated = [resultQR, ...existing.filter(q => q.id !== resultQR.id)].slice(0, 50);
        localStorage.setItem('qrloop_guest_qrs', JSON.stringify(updated));
      } catch (e) {}

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#06B6D4', '#6366F1', '#F59E0B'],
      });
    } catch (err) {
      setSaveError(err.message || 'Failed to save QR code.');
    } finally {
      setIsSaving(false);
    }
  };

  const autoSaveIfLoggedIn = () => {
    if (user && !savedSuccessQR && !isSaving) {
      handleSaveDynamicQR().catch(() => {});
    }
  };

  const colorPresets = [
    { name: 'Obsidian', fg: '#0F172A', bg: '#FFFFFF' },
    { name: 'Emerald', fg: '#059669', bg: '#F0FDF4' },
    { name: 'Cyber Cyan', fg: '#0891B2', bg: '#ECFEFF' },
    { name: 'Midnight Violet', fg: '#4F46E5', bg: '#EEF2FF' },
    { name: 'Dark Mode Glass', fg: '#34D399', bg: '#0B0F19' },
    { name: 'Crimson Rose', fg: '#E11D48', bg: '#FFF1F2' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Banner Notice */}
      <div className="mb-8 rounded-2xl border border-brand-500/20 bg-gradient-to-r from-brand-50 via-slate-100 to-cyan-50 dark:from-brand-950/40 dark:via-dark-900 dark:to-cyan-950/30 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm dark:shadow-xl transition-colors">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {isDynamic ? 'Dynamic Tracking Enabled' : 'Static Offline QR Mode'}
              </span>
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                isDynamic ? 'bg-brand-500/15 text-brand-700 dark:text-brand-300' : 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300'
              }`}>
                {isDynamic ? 'Live Redirects' : 'Direct Data (No Server)'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              {isDynamic 
                ? 'Change where this QR code points at any time — even after it is printed on flyers, stickers, or packaging.'
                : 'Data is encoded directly into the image. Works 100% offline forever without requiring an account.'}
            </p>
          </div>
        </div>

        {forcedDynamic === undefined && (
          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <button
              onClick={() => setIsDynamic(!isDynamic)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                isDynamic
                  ? 'bg-brand-500/15 text-brand-700 dark:text-brand-300 border-brand-500/30'
                  : 'bg-slate-200 dark:bg-dark-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-white/10'
              }`}
            >
              <span>{isDynamic ? 'Dynamic Mode: ON' : 'Static Mode (Uneditable)'}</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Data Type Selection & Customization Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Content Type Switcher Tabs */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/90 p-3 sm:p-4 backdrop-blur-xl shadow-sm dark:shadow-none transition-colors">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              1. Choose QR Content Type
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { id: 'url', label: 'Website URL', icon: Link },
                { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
                { id: 'vcard', label: 'vCard Contact', icon: UserSquare2 },
                { id: 'text', label: 'Plain Text', icon: FileText },
                { id: 'email', label: 'Email Prompt', icon: Mail },
                { id: 'phone', label: 'Phone Call', icon: Phone },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeType === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveType(item.id);
                      setSavedSuccessQR(null);
                    }}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                      active
                        ? 'bg-brand-500/15 border-brand-500/40 text-brand-700 dark:text-brand-300 font-bold shadow-sm'
                        : 'bg-slate-50 dark:bg-dark-950/60 border-slate-200/80 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1.5 ${active ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span className="text-[11px] font-medium leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Input Fields */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/5">
              {activeType === 'url' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Destination URL</label>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        setSavedSuccessQR(null);
                      }}
                      placeholder="https://yourwebsite.com/promotion"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  {isDynamic && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">QR Code Name</label>
                        <input
                          type="text"
                          value={qrTitle}
                          onChange={(e) => setQrTitle(e.target.value)}
                          placeholder="e.g. Summer Sale Banner"
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Custom Shortcode <span className="text-slate-400">(Optional)</span>
                        </label>
                        <div className="flex items-center">
                          <span className="px-2.5 py-2 bg-slate-200 dark:bg-dark-800 border border-r-0 border-slate-200 dark:border-white/10 rounded-l-xl text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                            /r/
                          </span>
                          <input
                            type="text"
                            value={customAlias}
                            onChange={(e) => setCustomAlias(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
                            placeholder="my-sale"
                            className="w-full px-2.5 py-2 rounded-r-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:border-brand-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeType === 'wifi' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Network SSID (Name)</label>
                      <input
                        type="text"
                        value={wifiData.ssid}
                        onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                        placeholder="Guest-WiFi"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Security Type</label>
                      <select
                        value={wifiData.security}
                        onChange={(e) => setWifiData({ ...wifiData, security: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                      >
                        <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">None (Open Network)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Wi-Fi Password</label>
                    <input
                      type="text"
                      value={wifiData.password}
                      onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                      placeholder="Password"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              )}

              {activeType === 'vcard' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">First Name</label>
                    <input
                      type="text"
                      value={vcardData.firstName}
                      onChange={(e) => setVcardData({ ...vcardData, firstName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={vcardData.lastName}
                      onChange={(e) => setVcardData({ ...vcardData, lastName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Mobile Phone</label>
                    <input
                      type="text"
                      value={vcardData.phone}
                      onChange={(e) => setVcardData({ ...vcardData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={vcardData.email}
                      onChange={(e) => setVcardData({ ...vcardData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company</label>
                    <input
                      type="text"
                      value={vcardData.company}
                      onChange={(e) => setVcardData({ ...vcardData, company: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Job Title</label>
                    <input
                      type="text"
                      value={vcardData.title}
                      onChange={(e) => setVcardData({ ...vcardData, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              )}

              {activeType === 'text' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Raw Text / Note</label>
                  <textarea
                    rows={3}
                    value={textData}
                    onChange={(e) => setTextData(e.target.value)}
                    placeholder="Enter any text or instructions..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500 resize-none"
                  />
                </div>
              )}

              {activeType === 'email' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Recipient Email</label>
                      <input
                        type="email"
                        value={emailData.to}
                        onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                      <input
                        type="text"
                        value={emailData.subject}
                        onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Body Template</label>
                    <textarea
                      rows={2}
                      value={emailData.body}
                      onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500 resize-none"
                    />
                  </div>
                </div>
              )}

              {activeType === 'phone' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number (With Country Code)</label>
                  <input
                    type="tel"
                    value={phoneData}
                    onChange={(e) => setPhoneData(e.target.value)}
                    placeholder="+1 555 123 4567"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 2. Style & Color Customization Panel */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/90 p-4 sm:p-5 backdrop-blur-xl space-y-5 shadow-sm dark:shadow-none transition-colors">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-brand-500" />
                <span>2. Colors & Module Shapes</span>
              </label>
              
              {/* Presets */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Presets:</span>
                <div className="flex items-center gap-1">
                  {colorPresets.map((p, idx) => (
                    <button
                      key={idx}
                      title={p.name}
                      onClick={() => {
                        setFgColor(p.fg);
                        setBgColor(p.bg);
                        setEyeOuterColor(p.fg);
                      }}
                      className="w-5 h-5 rounded-full border border-slate-300 dark:border-white/20 hover:scale-110 transition-transform flex items-center justify-center overflow-hidden shadow-xs"
                      style={{ background: `linear-gradient(135deg, ${p.fg} 50%, ${p.bg} 50%)` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Color Pickers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">QR Color</label>
                <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-slate-700 dark:text-slate-300 uppercase">{fgColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">Background</label>
                <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-slate-700 dark:text-slate-300 uppercase">{bgColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">Outer Eye</label>
                <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10">
                  <input
                    type="color"
                    value={eyeOuterColor}
                    onChange={(e) => setEyeOuterColor(e.target.value)}
                    className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-slate-700 dark:text-slate-300 uppercase">{eyeOuterColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">Inner Eye</label>
                <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10">
                  <input
                    type="color"
                    value={eyeInnerColor}
                    onChange={(e) => setEyeInnerColor(e.target.value)}
                    className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-slate-700 dark:text-slate-300 uppercase">{eyeInnerColor}</span>
                </div>
              </div>
            </div>

            {/* Shape Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Module Pattern</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'square', label: 'Classic' },
                    { id: 'rounded', label: 'Rounded' },
                    { id: 'dots', label: 'Dots' },
                    { id: 'smooth', label: 'Pill' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setDotStyle(s.id)}
                      className={`py-2 px-1 rounded-xl text-xs font-medium border transition-all ${
                        dotStyle === s.id
                          ? 'bg-brand-500/15 border-brand-500/40 text-brand-700 dark:text-brand-300 font-bold'
                          : 'bg-slate-50 dark:bg-dark-950 border-slate-200/80 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Corner Eyes</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'square', label: 'Square' },
                    { id: 'rounded', label: 'Rounded' },
                    { id: 'circle', label: 'Circle' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setEyeStyle(s.id)}
                      className={`py-2 px-1 rounded-xl text-xs font-medium border transition-all ${
                        eyeStyle === s.id
                          ? 'bg-brand-500/15 border-brand-500/40 text-brand-700 dark:text-brand-300 font-bold'
                          : 'bg-slate-50 dark:bg-dark-950 border-slate-200/80 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Logo & Brand Badges */}
            <div className="pt-3 border-t border-slate-200 dark:border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-cyanGlow-500" />
                  <span>Center Icon / Logo Badge</span>
                </label>
                {(logoImage || logoPreset) && (
                  <button
                    onClick={() => {
                      setLogoImage(null);
                      setLogoPreset(null);
                      setLogoDataUrl(null);
                    }}
                    className="text-[11px] text-red-500 hover:underline"
                  >
                    Remove Logo
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-950 hover:bg-slate-100 dark:hover:bg-dark-800 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2 transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>Upload Logo Image</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />

                <span className="text-xs text-slate-400">or presets:</span>

                {[
                  { id: 'globe', label: '🌐 Web' },
                  { id: 'wifi', label: '📶 Wi-Fi' },
                  { id: 'user', label: '👤 Contact' },
                  { id: 'sparkles', label: '✨ Star' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setLogoPreset(p.id);
                      setLogoImage(null);
                      setErrorCorrection('H');
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      logoPreset === p.id
                        ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-600 dark:text-cyan-300 font-bold'
                        : 'bg-slate-50 dark:bg-dark-950 border-slate-200/80 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Canvas Preview & Action Bar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/90 p-6 backdrop-blur-xl flex flex-col items-center shadow-lg dark:shadow-2xl transition-colors">
            
            {/* Header */}
            <div className="w-full flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {savedSuccessQR ? 'Active Dynamic QR' : 'Live Preview'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-dark-950 px-2 py-0.5 rounded border border-slate-200 dark:border-white/5">
                Error Corr: {errorCorrection}
              </span>
            </div>

            {/* The Live HTML5 Canvas */}
            <div className="relative p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-inner group flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-64 h-64 sm:w-72 sm:h-72 rounded-xl shadow-md transition-transform group-hover:scale-[1.01]"
              />
            </div>

            {/* Dynamic Status / Saved Details */}
            {savedSuccessQR ? (
              <div className="w-full mt-4 p-3.5 rounded-xl bg-brand-500/10 border border-brand-500/30 text-xs text-brand-700 dark:text-brand-300 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                    <span>{savedSuccessQR.is_dynamic ? 'Dynamic Link Live & Saved!' : 'QR Code Saved to Account!'}</span>
                  </span>
                  {savedSuccessQR.is_dynamic && (
                    <a
                      href={savedSuccessQR.redirect_url || savedSuccessQR.short_url || `${typeof window !== 'undefined' ? window.location.origin : ''}/r/${savedSuccessQR.short_code}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:underline text-[11px] text-brand-700 dark:text-brand-200"
                    >
                      <span>Test Redirect</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="font-mono text-[11px] break-all bg-white dark:bg-dark-950/80 p-2 rounded border border-brand-500/20 text-slate-800 dark:text-slate-200">
                  {savedSuccessQR.is_dynamic 
                    ? (savedSuccessQR.redirect_url || savedSuccessQR.short_url || `${typeof window !== 'undefined' ? window.location.origin : ''}/r/${savedSuccessQR.short_code}`)
                    : savedSuccessQR.destination_url}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1 text-[11px] gap-2">
                  <span className="text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                    Target: {savedSuccessQR.destination_url}
                  </span>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={() => onNavigateToDashboard && onNavigateToDashboard()}
                      className="font-bold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 underline"
                    >
                      View in Dashboard →
                    </button>
                    {savedSuccessQR.is_dynamic && (
                      <button
                        onClick={() => onNavigateToAnalytics && onNavigateToAnalytics(savedSuccessQR.id)}
                        className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
                      >
                        Analytics →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-3">
                Scannable by any camera app on iPhone & Android.
              </p>
            )}

            {/* Save Dynamic/Static QR Button */}
            {!savedSuccessQR && (
              <div className="w-full mt-4">
                {saveError && (
                  <div className="mb-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-300 text-xs">
                    {saveError}
                  </div>
                )}
                <button
                  onClick={handleSaveDynamicQR}
                  disabled={isSaving}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-emerald-600 hover:brightness-110 text-dark-950 font-bold text-xs flex items-center justify-center gap-2 shadow-glow-emerald transition-all disabled:opacity-50"
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : !user ? (
                    <>
                      <Zap className="w-4 h-4 fill-dark-950" />
                      <span>{isDynamic ? 'Sign In to Deploy Dynamic QR' : 'Sign In to Save QR'}</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-dark-950" />
                      <span>{isDynamic ? 'Create & Deploy Dynamic QR' : 'Save QR to My Account'}</span>
                    </>
                  )}
                </button>
                {!user && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2">
                    Free account required to save to your dashboard & track scans.
                  </p>
                )}
              </div>
            )}

            {/* Export & Download Options Toolbar */}
            <div className="w-full mt-5 pt-5 border-t border-slate-200 dark:border-white/5 space-y-3">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Download & Export Formats
              </label>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    autoSaveIfLoggedIn();
                    downloadCanvasAsPNG(canvasRef.current, `${qrTitle.replace(/\s+/g, '_')}_qr.png`, parseInt(downloadSize) / 512);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-950 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-brand-500" />
                  <span>PNG</span>
                </button>

                <button
                  onClick={() => {
                    autoSaveIfLoggedIn();
                    downloadSVG(currentEncodedText, {
                      fgColor,
                      bgColor,
                      dotStyle,
                      eyeStyle,
                      eyeOuterColor,
                      eyeInnerColor,
                      useSeparateEyeColors,
                      errorCorrection,
                      logoPreset,
                    }, `${qrTitle.replace(/\s+/g, '_')}_qr.svg`);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-950 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Vector SVG</span>
                </button>

                <button
                  onClick={() => {
                    autoSaveIfLoggedIn();
                    const shortUrl = savedSuccessQR 
                      ? (savedSuccessQR.redirect_url || savedSuccessQR.short_url || `${typeof window !== 'undefined' ? window.location.origin : ''}/r/${savedSuccessQR.short_code}`)
                      : undefined;
                    downloadPrintPDF(canvasRef.current, {
                      title: qrTitle,
                      shortUrl,
                      destinationUrl: url,
                    }, `${qrTitle.replace(/\s+/g, '_')}_standee.pdf`);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-dark-950 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-purple-500" />
                  <span>Print PDF</span>
                </button>
              </div>

              {/* Quick Copy to Clipboard */}
              <button
                onClick={handleCopy}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied Image to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy PNG to Clipboard (for Figma / Canva)</span>
                  </>
                )}
              </button>
            </div>

            {/* Sidebar Ad Placement */}
            <div className="w-full mt-6">
              <AdBanner type="sidebar" />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
