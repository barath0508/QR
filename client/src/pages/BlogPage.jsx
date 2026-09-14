import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Share2, 
  ChevronRight, 
  Search, 
  Filter, 
  MessageSquare, 
  Sparkles, 
  Calendar 
} from 'lucide-react';
import AdBanner from '../components/AdBanner';
import Breadcrumb from '../components/Breadcrumb';
import CommentSection from '../components/CommentSection';
import { articles, articleComments } from '../data/articles';

export default function BlogPage({ 
  onNavigateToDynamic, 
  onNavigateToStatic, 
  onBackToHome,
  initialArticleId = null 
}) {
  const [selectedArticleId, setSelectedArticleId] = useState(() => {
    if (initialArticleId) return initialArticleId;
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const paramArticle = urlParams.get('article');
      if (paramArticle && articles.some((a) => a.id === paramArticle)) {
        return paramArticle;
      }
      const pathParts = window.location.pathname.split('/');
      if (pathParts[1] === 'blog' && pathParts[2] && articles.some((a) => a.id === pathParts[2])) {
        return pathParts[2];
      }
    }
    return null;
  });

  const [shareCopied, setShareCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sync article selection to URL without reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedArticleId) {
        window.history.replaceState(null, '', `/blog?article=${selectedArticleId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.history.replaceState(null, '', '/blog');
      }
    }
  }, [selectedArticleId]);

  const activeArticle = useMemo(
    () => articles.find((a) => a.id === selectedArticleId),
    [selectedArticleId]
  );

  // Dynamic category list from articles
  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered articles based on search and category
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        art.title.toLowerCase().includes(query) ||
        art.summary.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleArticleShare = async () => {
    if (!activeArticle) return;
    const shareUrl = `${window.location.origin}/blog?article=${activeArticle.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: activeArticle.title, text: activeArticle.summary, url: shareUrl });
      } catch (error) {
        if (error.name !== 'AbortError') console.error(error);
      }
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 2200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Article Detail View */}
      {activeArticle ? (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
          <Breadcrumb
            items={[
              { label: 'Knowledge Hub & Guides', href: '/blog', onClick: () => setSelectedArticleId(null) },
              { label: activeArticle.title }
            ]}
            onNavigateHome={onBackToHome}
          />

          <div className="space-y-3">
            <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${activeArticle.badgeColor}`}>
              {activeArticle.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-display font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {activeArticle.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-400 pb-4 border-b border-slate-200 dark:border-white/5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {activeArticle.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
              <button
                onClick={handleArticleShare}
                className="ml-auto inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:text-brand-500 font-semibold transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{shareCopied ? 'Link copied!' : 'Share guide'}</span>
              </button>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-sans">
            {activeArticle.content}
          </div>

          {/* Community Discussion & User Comments */}
          <CommentSection
            articleId={activeArticle.id}
            articleTitle={activeArticle.title}
            initialComments={articleComments[activeArticle.id] || []}
          />

          {/* Bottom Action Card */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-dark-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Ready to put this guide into practice?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Generate a free lifetime dynamic or static QR code in 30 seconds.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onNavigateToStatic}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-brand-500/40 transition-colors cursor-pointer"
              >
                Create Static
              </button>
              <button
                onClick={onNavigateToDynamic}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-dark-950 shadow-sm transition-colors cursor-pointer"
              >
                Create Dynamic QR
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Blog Index View with Search & Filters */
        <div className="space-y-10">
          <div className="max-w-3xl mx-auto">
            <Breadcrumb
              items={[{ label: 'Knowledge Hub & Guides' }]}
              onNavigateHome={onBackToHome}
            />
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-brand-500" />
              <span>Developer & Marketer Knowledge Hub</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span>{articles.length} Comprehensive Guides</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight">
              QR Code Knowledge Base & Guides
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              In-depth research, printing specifications, security warnings, and real-world architectures for modern 2D barcodes and dynamic redirection.
            </p>

            {/* Search and Category Filters */}
            <div className="pt-4 max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, topic, or keyword (e.g. print, security, GS1, menus)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-brand-500 transition-colors shadow-xs"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-brand-500 text-dark-950 font-bold shadow-xs'
                        : 'bg-slate-100 dark:bg-dark-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-300 dark:hover:border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Article Card (if on "All" and no search query) */}
          {selectedCategory === 'All' && !searchQuery && articles.length > 0 && (
            <div 
              onClick={() => setSelectedArticleId(articles[0].id)}
              className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/80 p-6 sm:p-8 backdrop-blur-md hover:border-brand-500/40 transition-colors duration-150 shadow-sm dark:shadow-xl cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Featured Guide
                    </span>
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${articles[0].badgeColor}`}>
                      {articles[0].category}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {articles[0].title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {articles[0].summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span>{articles[0].date}</span>
                    <span>•</span>
                    <span>{articles[0].readTime}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {(articleComments[articles[0].id] || []).length} Community Comments
                    </span>
                  </div>
                </div>

                <button className="flex-shrink-0 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 group-hover:bg-brand-500 group-hover:text-dark-950 transition-colors duration-150 cursor-pointer">
                  <span>Read Full Guide</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <p className="text-slate-500 dark:text-slate-400 text-sm">No articles matched your search query "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="text-xs font-semibold text-brand-600 dark:text-brand-400 underline cursor-pointer"
              >
                Clear filters and view all articles
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                <span>Showing {filteredArticles.length} of {articles.length} articles</span>
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-brand-500 hover:underline">
                    Reset search
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles
                  .filter((art) => selectedCategory !== 'All' || searchQuery ? true : art.id !== articles[0].id)
                  .map((art) => (
                    <div
                      key={art.id}
                      onClick={() => setSelectedArticleId(art.id)}
                      className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/60 p-5 backdrop-blur-md hover:border-brand-500/40 transition-all duration-150 shadow-xs dark:shadow-none hover:shadow-md cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${art.badgeColor}`}>
                            {art.category}
                          </span>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <span>{art.readTime}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                              <MessageSquare className="w-3 h-3" />
                              {(articleComments[art.id] || []).length}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                          {art.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                          {art.summary}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-brand-600 dark:text-brand-400 font-semibold">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      <AdBanner type="leaderboard" />

    </div>
  );
}
