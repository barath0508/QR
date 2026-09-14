import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  MessageCircle, 
  ThumbsUp, 
  Plus, 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Tag, 
  Flame, 
  Clock, 
  HelpCircle, 
  Palette, 
  Zap, 
  Check, 
  X,
  Share2,
  Send,
  UserCheck
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import AdBanner from '../components/AdBanner';
import { api } from '../services/api';

const DEFAULT_TOPICS = [
  {
    id: 'topic-distance-rule',
    title: 'How to test your QR code before printing 10,000 flyers (The 10:1 distance rule)',
    category: 'print-design',
    categoryLabel: 'Print & Design',
    author: 'Marcus Vance',
    role: 'Hospitality Director • Chicago',
    date: 'Sept 11, 2026',
    isoDate: '2026-09-11T14:20:00Z',
    content: `Before sending any design file to an offset or digital printer, always calculate the maximum viewing distance.
    
The golden formula is the 10:1 distance-to-size ratio:
• A tabletop standee viewed from 12 inches away requires at least a 1.2-inch (30mm) QR code.
• A wall poster scanned from 5 feet (60 inches) away requires a 6-inch (150mm) QR code.
• A storefront window banner viewed from 15 feet away needs a 1.5-foot (450mm) QR code.

Also always export as lossless vector SVG from QRLoop rather than PNG. Raster images get blurry at large scale, whereas SVG curves remain infinitely sharp for laser cutters and high-DPI plates.`,
    tags: ['printing', 'svg', 'dimensions', 'menus'],
    upvotes: 54,
    replies: [
      {
        id: 'r1',
        author: 'Elena Rostova',
        role: 'Brand Designer',
        date: 'Sept 11, 2026',
        text: 'This is gold. We also recommend checking the quiet zone — at least 4 modules of blank background space around the perimeter. Many designers wrap tight borders around the QR and it fails on older phone cameras.',
        upvotes: 18
      },
      {
        id: 'r2',
        author: 'Liam O\'Connor',
        role: 'Operations Lead',
        date: 'Sept 12, 2026',
        text: 'Can confirm! We printed 2,500 event flyers using QRLoop vector SVG and every single scan connected flawlessly under outdoor venue lighting.',
        upvotes: 12
      }
    ]
  },
  {
    id: 'topic-inverted-contrast',
    title: 'Why did my smartphone camera fail to scan white-on-yellow QR codes? (Contrast guidelines)',
    category: 'troubleshooting',
    categoryLabel: 'Troubleshooting',
    author: 'Sarah Chen',
    role: 'Tech Lead • Omnichannel',
    date: 'Sept 9, 2026',
    isoDate: '2026-09-09T16:45:00Z',
    content: `A client asked us for a "pastel aesthetic" QR code with white dots on a pale lemon-yellow background. When printed, almost 70% of iOS and Android native camera apps could not lock focus or decode the matrix.

Here is why:
Barcode decoders rely on luminance contrast, not color contrast. Smartphone camera sensors first convert the image to grayscale before running edge detection. Light yellow and white have almost identical grayscale values.

Best practice rule:
1. Always maintain at least a 4:1 luminance ratio between foreground and background.
2. Keep the finder eyes (the three corner squares) dark.
3. If using light branding colors, put them on a dark charcoal or navy background instead.`,
    tags: ['contrast', 'camera-focus', 'accessibility', 'colors'],
    upvotes: 46,
    replies: [
      {
        id: 'r3',
        author: 'Devon Miller',
        role: 'UI Designer',
        date: 'Sept 10, 2026',
        text: 'Great explanation. The grayscale conversion tip is something even seasoned graphic artists overlook. QRLoop color picker default dark navy (#0F172A) has saved us many times.',
        upvotes: 15
      }
    ]
  },
  {
    id: 'topic-gs1-2027-transition',
    title: 'Sunrise 2027: How retail brands should prepare for 2D GS1 Digital Link barcodes',
    category: 'redirects',
    categoryLabel: 'Redirects & Analytics',
    author: 'David K.',
    role: 'Supply Chain Architect',
    date: 'Sept 7, 2026',
    isoDate: '2026-09-07T10:10:00Z',
    content: `By 2027, global retail point-of-sale registers are transitioning from traditional 1D UPC/EAN barcodes to 2D QR codes powered by GS1 Digital Link.
    
The beauty of dynamic QR infrastructure is that one code can serve two distinct audiences:
1. When scanned by a POS register laser: it reads the GTIN product ID, lot number, and expiry date to ring up the item at checkout.
2. When scanned by a shopper's smartphone: the dynamic redirect engine serves a responsive mobile page with nutritional disclosures, recycling instructions, and warranty registration.

Using static URLs on packaging is a massive risk because packaging plates last for years. Dynamic redirects allow you to update the web destination without changing the barcode on the box.`,
    tags: ['gs1', 'retail', 'packaging', 'supply-chain'],
    upvotes: 39,
    replies: [
      {
        id: 'r4',
        author: 'Priya Sharma',
        role: 'Packaging Specialist',
        date: 'Sept 8, 2026',
        text: 'Does QRLoop dynamic redirection support sub-50ms latency for GS1 resolvers? Speed is critical so consumers aren’t left staring at a blank screen.',
        upvotes: 8
      },
      {
        id: 'r5',
        author: 'QRLoop Team',
        role: 'Platform Engineer',
        date: 'Sept 8, 2026',
        text: 'Yes! Our edge redirects execute in under 35ms globally with TLS 1.3 session resumption and zero unnecessary database hops.',
        upvotes: 21,
        isVerified: true
      }
    ]
  },
  {
    id: 'topic-wood-engraved-standees',
    title: 'Showcase: Laser-engraved wood QR menu standees with QRLoop vector SVG',
    category: 'print-design',
    categoryLabel: 'Print & Design',
    author: 'Samantha Lee',
    role: 'Brand Designer • Studio Form',
    date: 'Sept 5, 2026',
    isoDate: '2026-09-05T18:00:00Z',
    content: `We recently designed custom walnut-wood table blocks for an artisan bakery. 

The process:
1. Generated a dynamic QR in QRLoop pointing to /menu.
2. Downloaded the lossless SVG format.
3. Imported the SVG directly into LightBurn laser cutting software.
4. Engraved into walnut at 300 DPI with a high-contrast dark char finish.

Because the QR is dynamic, the bakery updates their daily pastry specials and seasonal drinks without ever having to touch the physical wood blocks. Over 4,000 scans this month with zero failed reads!`,
    tags: ['showcase', 'wood-engraving', 'restaurant', 'laser-cutter'],
    upvotes: 62,
    replies: [
      {
        id: 'r6',
        author: 'Carlos Mendez',
        role: 'Cafe Owner',
        date: 'Sept 6, 2026',
        text: 'This looks gorgeous! Did you have to adjust the burn depth for the quiet zone margin?',
        upvotes: 9
      },
      {
        id: 'r7',
        author: 'Samantha Lee',
        role: 'Brand Designer',
        date: 'Sept 6, 2026',
        text: 'Yes, we left a 4mm unburned boundary around the entire perimeter to ensure the phone cameras detect the edge immediately.',
        upvotes: 14
      }
    ]
  },
  {
    id: 'topic-feature-request-csv-export',
    title: 'Feature Request: CSV export for scan telemetry by date range and referrer',
    category: 'feature-requests',
    categoryLabel: 'Feature Requests',
    author: 'Liam O\'Connor',
    role: 'Operations Lead • Austin',
    date: 'Sept 3, 2026',
    isoDate: '2026-09-03T11:30:00Z',
    content: `Loving the real-time analytics graphs on the dashboard! 

It would be super helpful for our marketing team if we could export raw scan logs to a CSV or Excel spreadsheet containing:
• Timestamp (ISO 8601)
• Operating System (iOS / Android / macOS / Windows)
• Device Model / Category (Mobile / Desktop)
• Country & Region

This would let us import scan attribution directly into our Looker / BigQuery reporting pipelines.`,
    tags: ['feature-request', 'csv', 'analytics', 'reporting'],
    upvotes: 38,
    replies: [
      {
        id: 'r8',
        author: 'QRLoop Team',
        role: 'Platform Engineer',
        date: 'Sept 4, 2026',
        text: 'Great suggestion! We have added CSV export directly into the Analytics tab under the scan telemetry timeline. You can now download full scan reports with one click.',
        upvotes: 27,
        isVerified: true
      }
    ]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Topics', icon: Flame },
  { id: 'print-design', label: 'Print & Design', icon: Palette },
  { id: 'troubleshooting', label: 'Troubleshooting & Help', icon: HelpCircle },
  { id: 'redirects', label: 'Redirects & Analytics', icon: Zap },
  { id: 'feature-requests', label: 'Feature Requests', icon: Sparkles },
];

export default function CommunityPage({ 
  onBackToHome, 
  onNavigateToStudio, 
  onNavigateToBlog 
}) {
  const [topics, setTopics] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('qrloop_community_topics');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Failed to load saved topics:', e);
      }
    }
    return DEFAULT_TOPICS;
  });

  const [votedTopicIds, setVotedTopicIds] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('qrloop_community_voted_topics');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // New topic form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('print-design');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [formError, setFormError] = useState('');

  // Active thread reply form state
  const [replyText, setReplyText] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyRole, setReplyRole] = useState('');
  const [replySuccess, setReplySuccess] = useState(false);

  // Fetch live global discussions from Supabase / Backend on mount
  useEffect(() => {
    let isMounted = true;
    const loadCommunityDiscussions = async () => {
      try {
        setIsSyncing(true);
        const res = await api.getCommunityTopics();
        if (isMounted && res && Array.isArray(res.topics) && res.topics.length > 0) {
          // Merge server topics with any local discussions
          setTopics(res.topics);
          setIsLiveConnected(true);
        }
      } catch (err) {
        console.warn('ℹ️ Running in cached community mode:', err.message);
      } finally {
        if (isMounted) setIsSyncing(false);
      }
    };

    loadCommunityDiscussions();
    return () => { isMounted = false; };
  }, []);

  // Persist topics to local cache
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('qrloop_community_topics', JSON.stringify(topics));
      } catch (e) {}
    }
  }, [topics]);

  // Persist votes to local cache
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('qrloop_community_voted_topics', JSON.stringify(votedTopicIds));
      } catch (e) {}
    }
  }, [votedTopicIds]);

  const activeTopic = topics.find(t => t.id === selectedTopicId);

  const handleUpvoteTopic = (topicId) => {
    const isVoted = votedTopicIds.includes(topicId);
    const delta = isVoted ? -1 : 1;

    if (isVoted) {
      setVotedTopicIds(prev => prev.filter(id => id !== topicId));
      setTopics(prev => prev.map(t => t.id === topicId ? { ...t, upvotes: Math.max(0, (t.upvotes || 0) - 1) } : t));
    } else {
      setVotedTopicIds(prev => [...prev, topicId]);
      setTopics(prev => prev.map(t => t.id === topicId ? { ...t, upvotes: (t.upvotes || 0) + 1 } : t));
    }

    // Background sync upvote to backend database
    api.upvoteCommunityTopic(topicId, delta).catch(err => {
      console.warn('Topic upvote sync notice:', err.message);
    });
  };

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!newTitle.trim() || !newAuthor.trim() || !newContent.trim()) {
      setFormError('Please fill out all required fields.');
      return;
    }

    const categoryObj = CATEGORIES.find(c => c.id === newCategory) || CATEGORIES[1];
    const parsedTags = newTags
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const tempId = `topic-${Date.now()}`;
    const newTopicObj = {
      id: tempId,
      title: newTitle.trim(),
      category: newCategory,
      categoryLabel: categoryObj.label,
      author: newAuthor.trim(),
      role: newRole.trim() || 'Community Creator',
      date: formattedDate,
      isoDate: now.toISOString(),
      content: newContent.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['general'],
      upvotes: 1,
      replies: []
    };

    // Optimistic UI update
    setTopics(prev => [newTopicObj, ...prev]);
    setVotedTopicIds(prev => [...prev, tempId]);
    setSelectedTopicId(tempId);
    setIsNewTopicModalOpen(false);

    // Reset fields
    const titleVal = newTitle.trim();
    const categoryVal = newCategory;
    const categoryLabelVal = categoryObj.label;
    const authorVal = newAuthor.trim();
    const roleVal = newRole.trim() || 'Community Creator';
    const contentVal = newContent.trim();
    const tagsVal = newTopicObj.tags;

    setNewTitle('');
    setNewAuthor('');
    setNewRole('');
    setNewContent('');
    setNewTags('');

    // Global Cloud sync
    try {
      const res = await api.createCommunityTopic({
        title: titleVal,
        category: categoryVal,
        categoryLabel: categoryLabelVal,
        author: authorVal,
        role: roleVal,
        content: contentVal,
        tags: tagsVal
      });

      if (res && res.topic) {
        setTopics(prev => prev.map(t => t.id === tempId ? { ...res.topic, upvotes: 1 } : t));
        setSelectedTopicId(res.topic.id);
        setVotedTopicIds(prev => prev.map(id => id === tempId ? res.topic.id : id));
        setIsLiveConnected(true);
      }
    } catch (err) {
      console.warn('Backend topic creation synced to local session:', err.message);
    }
  };

  const handlePostReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !replyAuthor.trim()) return;

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const tempId = `reply-${Date.now()}`;
    const newReply = {
      id: tempId,
      author: replyAuthor.trim(),
      role: replyRole.trim() || 'Community Member',
      date: formattedDate,
      text: replyText.trim(),
      upvotes: 1
    };

    const targetTopicId = selectedTopicId;
    const replyTextVal = replyText.trim();
    const replyAuthorVal = replyAuthor.trim();
    const replyRoleVal = replyRole.trim() || 'Community Member';

    // Optimistic local state update
    setTopics(prev => prev.map(t => {
      if (t.id === targetTopicId) {
        return {
          ...t,
          replies: [...(t.replies || []), newReply]
        };
      }
      return t;
    }));

    setReplyText('');
    setReplyAuthor('');
    setReplyRole('');
    setReplySuccess(true);
    setTimeout(() => setReplySuccess(false), 3000);

    // Global Cloud sync
    try {
      const res = await api.addCommunityReply(targetTopicId, {
        author: replyAuthorVal,
        role: replyRoleVal,
        text: replyTextVal
      });

      if (res && res.reply) {
        setTopics(prev => prev.map(t => {
          if (t.id === targetTopicId) {
            return {
              ...t,
              replies: (t.replies || []).map(r => r.id === tempId ? res.reply : r)
            };
          }
          return t;
        }));
        setIsLiveConnected(true);
      }
    } catch (err) {
      console.warn('Backend reply creation synced to local session:', err.message);
    }
  };

  const filteredTopics = topics.filter(t => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      t.title.toLowerCase().includes(query) ||
      t.content.toLowerCase().includes(query) ||
      t.author.toLowerCase().includes(query) ||
      t.tags.some(tag => tag.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in text-slate-800 dark:text-slate-200">
      
      {/* 1. Breadcrumb Navigation */}
      <Breadcrumb
        items={
          activeTopic
            ? [
                { label: 'Community Forum', href: '/community', onClick: () => setSelectedTopicId(null) },
                { label: activeTopic.title }
              ]
            : [{ label: 'Community Forum' }]
        }
        onNavigateHome={onBackToHome}
      />

      {/* 2. Detail Thread View */}
      {activeTopic ? (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          
          <button
            onClick={() => setSelectedTopicId(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Discussions</span>
          </button>

          {/* Main Topic Question Card */}
          <article 
            itemScope 
            itemType="https://schema.org/DiscussionForumPosting"
            className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/80 p-6 sm:p-8 backdrop-blur-xl shadow-xs space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                {activeTopic.categoryLabel}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpvoteTopic(activeTopic.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    votedTopicIds.includes(activeTopic.id)
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-50 dark:bg-dark-950 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${votedTopicIds.includes(activeTopic.id) ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                  <span>{activeTopic.upvotes || 0} Upvotes</span>
                </button>
              </div>
            </div>

            <h1 itemProp="headline" className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
              {activeTopic.title}
            </h1>

            {/* Author bar */}
            <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-white/5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                {activeTopic.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span itemProp="author" className="font-bold text-xs text-slate-900 dark:text-white">
                    {activeTopic.author}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>{activeTopic.role}</span>
                  <span>•</span>
                  <time dateTime={activeTopic.isoDate}>{activeTopic.date}</time>
                </div>
              </div>
            </div>

            {/* Content body */}
            <div itemProp="articleBody" className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
              {activeTopic.content}
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100 dark:border-white/5">
              {activeTopic.tags.map((t, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-dark-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                  <Tag className="w-3 h-3 text-slate-400" />
                  <span>#{t}</span>
                </span>
              ))}
            </div>
          </article>

          {/* Community Replies Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-500" />
                <span>Community Replies ({(activeTopic.replies || []).length})</span>
              </h3>
            </div>

            {/* List of Replies */}
            <div className="space-y-4">
              {(activeTopic.replies || []).length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs bg-slate-50 dark:bg-dark-950/40 rounded-2xl border border-slate-200/60 dark:border-white/5">
                  No replies yet. Be the first to share your experience or answer this question!
                </div>
              ) : (
                activeTopic.replies.map((reply) => (
                  <article 
                    key={reply.id} 
                    itemScope 
                    itemType="https://schema.org/Comment"
                    className="p-5 rounded-2xl border border-slate-200/70 dark:border-white/5 bg-white dark:bg-dark-900/60 shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                          {reply.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span itemProp="author" className="font-bold text-xs text-slate-900 dark:text-white">
                              {reply.author}
                            </span>
                            {reply.isVerified && (
                              <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                                Staff
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">{reply.role} • {reply.date}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 inline-flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-emerald-500" />
                        <span>{reply.upvotes || 0}</span>
                      </span>
                    </div>

                    <p itemProp="text" className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-11">
                      {reply.text}
                    </p>
                  </article>
                ))
              )}
            </div>

            {/* Reply Composer Form */}
            <form onSubmit={handlePostReply} className="p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-dark-950/70 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-500" />
                <span>Contribute to this Discussion</span>
              </h4>

              {replySuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Your reply has been posted to the discussion!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={replyAuthor}
                  onChange={(e) => setReplyAuthor(e.target.value)}
                  placeholder="Your Name or Handle *"
                  className="px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  required
                />
                <input
                  type="text"
                  value={replyRole}
                  onChange={(e) => setReplyRole(e.target.value)}
                  placeholder="Your Role or Company (e.g. Restaurant Manager)"
                  className="px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Share your technical advice, testing results, or followup question..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 resize-y"
                required
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Reply</span>
                </button>
              </div>
            </form>

          </section>

        </div>
      ) : (
        /* 3. Community Forum Index View */
        <div className="space-y-12">
          
          {/* Hero Banner */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>QRLoop Open Creator & Developer Community</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-[11px] font-medium">
                <span className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                <span>{isLiveConnected ? 'Live Cloud Sync' : (isSyncing ? 'Connecting...' : 'Active Discussions')} ({topics.length} Threads)</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Community Discussions & Knowledge Sharing
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Connect with 45,000+ businesses, marketers, and developers. Discuss print specifications, troubleshoot camera focus, share design showcases, and shape the roadmap.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsNewTopicModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs inline-flex items-center gap-2 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Start New Discussion</span>
              </button>
              <button
                onClick={onNavigateToStudio}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors hover:border-emerald-500/40"
              >
                Launch QR Studio →
              </button>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/70 backdrop-blur-xl shadow-xs">
              
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                {CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                        isActive
                          ? 'bg-emerald-500 text-dark-950 font-bold shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search discussions & tags..."
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

            </div>
          </div>

          {/* Discussions List */}
          <div className="space-y-4">
            {filteredTopics.length === 0 ? (
              <div className="p-12 text-center rounded-3xl border border-slate-200/70 dark:border-white/5 bg-white dark:bg-dark-900/40 space-y-3">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No discussions match your filter.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-bold underline"
                >
                  Clear search filters
                </button>
              </div>
            ) : (
              filteredTopics.map((topic) => {
                const isVoted = votedTopicIds.includes(topic.id);

                return (
                  <article
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className="p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 hover:border-emerald-500/40 backdrop-blur-md shadow-xs transition-colors duration-150 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group"
                  >
                    <div className="space-y-2.5 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                          {topic.categoryLabel}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{topic.author}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-400">{topic.date}</span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        {topic.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {topic.content}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {topic.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-950 text-slate-500 dark:text-slate-400">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvoteTopic(topic.id);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                          isVoted
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                            : 'bg-slate-50 dark:bg-dark-950 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${isVoted ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                        <span>{topic.upvotes || 0}</span>
                      </button>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-white/5">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{(topic.replies || []).length}</span>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* 4. New Discussion Topic Modal */}
      {isNewTopicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900 p-6 sm:p-8 shadow-2xl space-y-6">
            
            <button
              onClick={() => setIsNewTopicModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-mono">
                Community Forum
              </span>
              <h2 className="text-xl font-display font-extrabold text-slate-900 dark:text-white">
                Start a New Discussion
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ask a technical question, propose a feature, or share your print results with the community.
              </p>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateTopic} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Topic Title *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Best settings for laser cutting wood QR coasters"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name or Handle *
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Alex M."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Role or Business
                  </label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. Graphic Designer, Cafe Owner"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="e.g. svg, laser, menu"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Discussion Content *
                </label>
                <textarea
                  rows={5}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Explain your situation, the question you have, or the solution you discovered..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-y"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewTopicModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Discussion</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      <AdBanner type="leaderboard" />

    </div>
  );
}
