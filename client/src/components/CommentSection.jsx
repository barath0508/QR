import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Reply, Send, CheckCircle2, User, Sparkles, Star } from 'lucide-react';

export default function CommentSection({ 
  articleId = 'general', 
  articleTitle = 'QR Guide',
  initialComments = [] 
}) {
  const storageKey = `qrloop_comments_${articleId}`;
  const votesStorageKey = `qrloop_votes_${articleId}`;

  const [comments, setComments] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Could not read saved comments:', e);
      }
    }
    return initialComments;
  });

  const [votedIds, setVotedIds] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(votesStorageKey);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Could not read saved votes:', e);
      }
    }
    return [];
  });

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'newest'

  // Persist comments to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(comments));
      } catch (e) {
        console.warn('Could not save comments:', e);
      }
    }
  }, [comments, storageKey]);

  // Persist upvotes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(votesStorageKey, JSON.stringify(votedIds));
      } catch (e) {
        console.warn('Could not save votes:', e);
      }
    }
  }, [votedIds, votesStorageKey]);

  const handleUpvote = (id) => {
    if (votedIds.includes(id)) {
      // Toggle off vote
      setVotedIds(prev => prev.filter(vId => vId !== id));
      setComments(prev => prev.map(c => c.id === id ? { ...c, upvotes: Math.max(0, (c.upvotes || 0) - 1) } : c));
    } else {
      // Upvote
      setVotedIds(prev => [...prev, id]);
      setComments(prev => prev.map(c => c.id === id ? { ...c, upvotes: (c.upvotes || 0) + 1 } : c));
    }
  };

  const handleReply = (authorName) => {
    setCommentText(prev => `@${authorName} ` + prev.replace(/^@\w+\s*/, ''));
    const inputEl = document.getElementById(`comment-textarea-${articleId}`);
    if (inputEl) {
      inputEl.focus();
      inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    const trimmedText = commentText.trim();

    if (!trimmedName) {
      setError('Please enter your name or handle.');
      return;
    }
    if (!trimmedText) {
      setError('Please enter a comment.');
      return;
    }
    if (trimmedText.length < 5) {
      setError('Comments must be at least 5 characters long.');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const newComment = {
        id: `user-${Date.now()}`,
        author: trimmedName,
        role: role.trim() || 'Community Member',
        date: formattedDate,
        isoDate: now.toISOString(),
        text: trimmedText,
        upvotes: 1,
        isVerified: false
      };

      setComments(prev => [newComment, ...prev]);
      setVotedIds(prev => [...prev, newComment.id]);
      setCommentText('');
      setName('');
      setRole('');
      setSubmitting(false);
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 4000);
    }, 400);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'popular') {
      return (b.upvotes || 0) - (a.upvotes || 0);
    }
    return new Date(b.isoDate || 0) - new Date(a.isoDate || 0);
  });

  return (
    <section 
      id="comments" 
      aria-label="Community Discussion and Comments"
      itemScope 
      itemType="https://schema.org/DiscussionForumPosting"
      className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-dark-900/70 p-6 sm:p-8 backdrop-blur-xl shadow-xs space-y-8"
    >
      <meta itemProp="headline" content={`Community Discussion: ${articleTitle}`} />

      {/* Header with Comment Counter and Sort Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Community Discussion</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono font-semibold border border-emerald-500/20">
                {comments.length}
              </span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Share real-world feedback, ask questions, or contribute best practices.
            </p>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-dark-950 p-1 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 self-end sm:self-auto border border-slate-200/60 dark:border-white/5">
          <button
            type="button"
            onClick={() => setSortBy('popular')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              sortBy === 'popular'
                ? 'bg-white dark:bg-dark-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Top Voted
          </button>
          <button
            type="button"
            onClick={() => setSortBy('newest')}
            className={`px-3 py-1 rounded-lg transition-colors ${
              sortBy === 'newest'
                ? 'bg-white dark:bg-dark-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Newest First
          </button>
        </div>
      </div>

      {/* Comment Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-dark-950/60 border border-slate-200/60 dark:border-white/5">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Join the Conversation</span>
        </h4>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Thank you! Your comment has been published to the community thread.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor={`comment-name-${articleId}`} className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Your Name or Handle *
            </label>
            <input
              id={`comment-name-${articleId}`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex M."
              maxLength={40}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label htmlFor={`comment-role-${articleId}`} className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Role or Business (Optional)
            </label>
            <input
              id={`comment-role-${articleId}`}
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Restaurant Owner, Graphic Designer"
              maxLength={50}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor={`comment-textarea-${articleId}`} className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
              Your Feedback or Question *
            </label>
            <span className="text-[10px] text-slate-400 font-mono">
              {commentText.length}/500
            </span>
          </div>
          <textarea
            id={`comment-textarea-${articleId}`}
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share your experience with dynamic QR codes, print tips, or questions..."
            maxLength={500}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 resize-y leading-relaxed"
            required
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
            Moderated for spam and malicious links. No account required to participate.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="ml-auto px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-dark-950 font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Posting...' : 'Post Comment'}</span>
          </button>
        </div>
      </form>

      {/* Comments List with Schema.org Microdata */}
      <div className="space-y-4 pt-2">
        {sortedComments.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          sortedComments.map((comment) => {
            const hasVoted = votedIds.includes(comment.id);

            return (
              <article
                key={comment.id}
                itemProp="comment"
                itemScope
                itemType="https://schema.org/Comment"
                className="p-4 sm:p-5 rounded-2xl border border-slate-200/70 dark:border-white/5 bg-slate-50/50 dark:bg-dark-950/40 space-y-3 transition-colors"
              >
                {/* Author row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xs shadow-xs flex-shrink-0">
                      {comment.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span 
                          itemProp="author" 
                          itemScope 
                          itemType="https://schema.org/Person"
                          className="font-bold text-xs text-slate-900 dark:text-white"
                        >
                          <span itemProp="name">{comment.author}</span>
                        </span>
                        {comment.isVerified && (
                          <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                            Team
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        {comment.role && <span>{comment.role}</span>}
                        {comment.role && <span>•</span>}
                        <time itemProp="dateCreated" dateTime={comment.isoDate || '2026-09-14'}>
                          {comment.date}
                        </time>
                      </div>
                    </div>
                  </div>

                  {/* Upvote Button with Interaction Counter */}
                  <div 
                    itemProp="interactionStatistic" 
                    itemScope 
                    itemType="https://schema.org/InteractionCounter"
                  >
                    <meta itemProp="interactionType" content="https://schema.org/LikeAction" />
                    <button
                      type="button"
                      onClick={() => handleUpvote(comment.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                        hasVoted
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                          : 'bg-white dark:bg-dark-900 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                      aria-label={`Upvote comment by ${comment.author}. Current upvotes: ${comment.upvotes || 0}`}
                    >
                      <ThumbsUp className={`w-3 h-3 ${hasVoted ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                      <span itemProp="userInteractionCount">{comment.upvotes || 0}</span>
                    </button>
                  </div>
                </div>

                {/* Comment Text */}
                <div 
                  itemProp="text" 
                  className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-11"
                >
                  {comment.text}
                </div>

                {/* Quick Reply Trigger */}
                <div className="pl-11 pt-1 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleReply(comment.author)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <Reply className="w-3 h-3" />
                    <span>Reply</span>
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
