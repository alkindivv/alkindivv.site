import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { format, formatDistanceToNow } from 'date-fns';
import useSWR, { mutate } from 'swr';
import { FaGoogle } from 'react-icons/fa';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { FiMessageSquare, FiHeart, FiShare2 } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { IoSendSharp } from 'react-icons/io5';
import Avatar from '@/components/common/Avatar';
import { id } from 'date-fns/locale';
import Accent from './shared/Accent';

interface CommentsProps {
  postSlug: string;
}

interface CommentItemProps {
  comment: any;
  onReply: (parentId: string, content: string) => void;
  onLike: (commentId: string, isReply?: boolean) => void;
  session: any;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
  onLike,
  session,
}) => {
  const [showReplies, setShowReplies] = useState(true);
  const [votes, setVotes] = useState<number>(comment.votes || 0);
  const [isVoting, setIsVoting] = useState(false);
  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [likeCount, setLikeCount] = useState<number>(comment.likeCount || 0);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [replyStates, setReplyStates] = useState(
    comment.replies?.reduce(
      (acc: any, reply: any) => ({
        ...acc,
        [reply.id]: {
          votes: reply.votes || 0,
          isLiked: reply.isLiked || false,
          likeCount: reply.likeCount || 0,
        },
      }),
      {}
    ) || {}
  );

  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: id });
  };

  const handleVote = async (value: number) => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      setVotes((prev) => prev + value);
      await new Promise((resolve) => setTimeout(resolve, 300));
    } finally {
      setIsVoting(false);
    }
  };

  const handleLike = async () => {
    if (!session) return;
    setIsLiked(!isLiked);
    setLikeCount((prev: number) => (isLiked ? prev - 1 : prev + 1));
    await onLike(comment.id);
  };

  const handleReplyLike = async (replyId: string) => {
    if (!session) return;
    setReplyStates((prev: any) => ({
      ...prev,
      [replyId]: {
        ...prev[replyId],
        isLiked: !prev[replyId].isLiked,
        likeCount: prev[replyId].isLiked
          ? prev[replyId].likeCount - 1
          : prev[replyId].likeCount + 1,
      },
    }));
    await onLike(replyId, true);
  };

  const handleReplyVote = async (replyId: string, value: number) => {
    if (!session) return;
    setReplyStates((prev: any) => ({
      ...prev,
      [replyId]: {
        ...prev[replyId],
        votes: prev[replyId].votes + value,
      },
    }));
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !replyContent.trim()) return;

    setIsSubmittingReply(true);
    try {
      await onReply(comment.id, replyContent);
      setReplyContent('');
      setShowReplyForm(false);
    } catch (error) {
      console.error('Error posting reply:', error);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  return (
    <div className="group relative">
      <div className="flex-1">
        <div className="bg-[#0a0a0a]/90 backdrop-blur-lg rounded-2xl border border-white/[0.1] p-6 shadow-xl hover:shadow-emerald-500/3 transition-all duration-500">
          {/* Comment Header */}
          <div className="flex items-start justify-between pb-4 mb-4 border-b border-white/[0.1] bg-[#0a0a0a]/50 -mx-6 -mt-6 p-5 rounded-t-2xl">
            <div className="flex gap-3.5">
              <Avatar
                src={comment.author.image}
                alt={comment.author.name}
                size="md"
                className="ring-2 ring-white/[0.05] hover:ring-emerald-500/20 transition-all duration-300"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[15px] font-semibold text-gray-200 hover:text-emerald-400/90 transition-colors">
                    {comment.author.name}
                  </span>
                  {comment.isAuthor && (
                    <span className="px-2 py-0.5 text-[11px] bg-emerald-500/10 text-emerald-400/90 rounded-full font-medium">
                      Author
                    </span>
                  )}
                </div>
                <span className="text-[13px] text-gray-500">
                  {getTimeAgo(new Date(comment.createdAt))}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`group p-2.5 rounded-xl transition-all duration-300 ${
                  isLiked
                    ? 'text-pink-500/90 bg-pink-500/10'
                    : 'text-gray-500 hover:text-pink-500/90 hover:bg-pink-500/10'
                }`}
                title={isLiked ? 'Batal Suka' : 'Suka'}
              >
                <div className="relative">
                  <FiHeart
                    className={`w-[18px] h-[18px] ${
                      isLiked
                        ? 'fill-current scale-110'
                        : 'group-hover:scale-110'
                    } transition-transform duration-300`}
                  />
                  {likeCount > 0 && (
                    <span className="absolute -top-1 -right-1 text-[10px] font-medium bg-pink-500/90 text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {likeCount}
                    </span>
                  )}
                </div>
              </button>

              <button
                className="p-2.5 rounded-xl text-gray-500 hover:text-emerald-400/90 hover:bg-emerald-500/10 transition-all duration-300 group"
                title="Bagikan"
              >
                <FiShare2 className="w-[18px] h-[18px] group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Comment Content */}
          <div className="text-[15px] text-gray-300/90 leading-relaxed mb-5">
            {comment.content}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#0a0a0a]/50 rounded-xl p-1.5 shadow-inner">
              <button
                onClick={() => handleVote(1)}
                disabled={isVoting}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                  votes > 0
                    ? 'text-emerald-400/90 bg-emerald-500/10'
                    : 'text-gray-500 hover:text-emerald-400/90 hover:bg-emerald-500/10'
                }`}
              >
                <BiUpvote
                  className={`w-4 h-4 ${votes > 0 ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}
                />
                <span className="text-xs font-medium min-w-[16px]">
                  {votes > 0 ? `+${votes}` : '0'}
                </span>
              </button>
              <div className="w-px h-3.5 bg-gray-800 mx-1" />
              <button
                onClick={() => handleVote(-1)}
                disabled={isVoting}
                className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                  votes < 0
                    ? 'text-red-400/90 bg-red-500/10'
                    : 'text-gray-500 hover:text-red-400/90 hover:bg-red-500/10'
                }`}
              >
                <BiDownvote
                  className={`w-4 h-4 ${votes < 0 ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}
                />
                <span className="text-xs font-medium min-w-[16px]">
                  {votes < 0 ? Math.abs(votes) : '0'}
                </span>
              </button>
            </div>

            {session && (
              <button
                onClick={() => {
                  setShowReplyForm(true);
                  setReplyContent(`@${comment.author.name} `);
                }}
                className="group flex items-center gap-1.5 px-3.5 py-1.5 text-sm text-gray-500 hover:text-emerald-400/90 rounded-xl hover:bg-emerald-500/10 transition-all duration-300"
              >
                <FiMessageSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-300" />
                <span>Reply</span>
              </button>
            )}
          </div>
        </div>

        {/* Replies Section */}
        {comment.replies?.length > 0 && (
          <div className="relative mt-5 pl-14">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/20 via-emerald-500/10 to-transparent"></div>

            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-400/90 mb-3 group transition-all duration-300"
            >
              <span
                className={`text-lg transition-transform duration-300 ${showReplies ? 'rotate-90' : ''}`}
              >
                ›
              </span>
              <span className="flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform duration-300">
                <FiMessageSquare className="w-3.5 h-3.5" />
                {comment.replies.length} replies
              </span>
            </button>

            {showReplies && (
              <div className="space-y-3 ml-3">
                {comment.replies.map((reply: any) => {
                  const replyState = replyStates[reply.id] || {
                    votes: 0,
                    isLiked: false,
                    likeCount: 0,
                  };

                  return (
                    <div
                      key={reply.id}
                      className="bg-[#0a0a0a]/90 backdrop-blur-lg rounded-xl border border-white/[0.1] p-4"
                    >
                      {/* Reply Header */}
                      <div className="flex items-start justify-between pb-3 mb-3 border-b border-white/[0.1] bg-[#0a0a0a]/50 -mx-4 -mt-4 p-4 rounded-t-xl">
                        <div className="flex gap-4">
                          <Avatar
                            src={reply.author.image}
                            alt={reply.author.name}
                            size="md"
                            className="ring-1 ring-white/[0.05]"
                          />
                          <div>
                            <div className="flex items-center gap-2.5 mb-1.5">
                              <span className="text-[15px] font-semibold text-gray-200">
                                {reply.author.name}
                              </span>
                              {reply.isAuthor && (
                                <span className="px-2.5 py-0.5 text-xs bg-emerald-500/10 font-semibold text-emerald-400/90 rounded-full">
                                  Author
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">
                              {getTimeAgo(new Date(reply.createdAt))}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleReplyLike(reply.id)}
                          className={`group p-2 rounded-lg transition-all duration-300 ${
                            replyState.isLiked
                              ? 'text-pink-500/90 bg-pink-500/10'
                              : 'text-gray-500 hover:text-pink-500/90 hover:bg-pink-500/10'
                          }`}
                        >
                          <div className="relative">
                            <FiHeart
                              className={`w-4 h-4 ${
                                replyState.isLiked
                                  ? 'fill-current scale-110'
                                  : 'group-hover:scale-110'
                              } transition-transform duration-300`}
                            />
                            {replyState.likeCount > 0 && (
                              <span className="absolute -top-1 -right-1 text-[9px] font-medium bg-pink-500/90 text-white rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                                {replyState.likeCount}
                              </span>
                            )}
                          </div>
                        </button>
                      </div>

                      {/* Reply Content */}
                      <div className="text-[14px] text-gray-300/90 leading-relaxed mb-4">
                        {reply.content}
                      </div>

                      {/* Reply Actions */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-[#0a0a0a]/50 rounded-xl p-1.5 shadow-inner">
                          <button
                            onClick={() => handleReplyVote(reply.id, 1)}
                            className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all duration-300 ${
                              replyState.votes > 0
                                ? 'text-emerald-400/90 bg-emerald-500/10'
                                : 'text-gray-500 hover:text-emerald-400/90 hover:bg-emerald-500/10'
                            }`}
                          >
                            <BiUpvote
                              className={`w-4 h-4 ${replyState.votes > 0 ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}
                            />
                            <span className="text-sm font-medium min-w-[20px]">
                              {replyState.votes > 0
                                ? `+${replyState.votes}`
                                : '0'}
                            </span>
                          </button>
                          <div className="w-px h-4 bg-gray-800 mx-1.5" />
                          <button
                            onClick={() => handleReplyVote(reply.id, -1)}
                            className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all duration-300 ${
                              replyState.votes < 0
                                ? 'text-red-400/90 bg-red-500/10'
                                : 'text-gray-500 hover:text-red-400/90 hover:bg-red-500/10'
                            }`}
                          >
                            <BiDownvote
                              className={`w-4 h-4 ${replyState.votes < 0 ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}
                            />
                            <span className="text-sm font-medium min-w-[20px]">
                              {replyState.votes < 0
                                ? Math.abs(replyState.votes)
                                : '0'}
                            </span>
                          </button>
                        </div>

                        {session && (
                          <button
                            onClick={() => {
                              setShowReplyForm(true);
                              setReplyContent(`@${reply.author.name} `);
                            }}
                            className="group flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-emerald-400/90 rounded-xl hover:bg-emerald-500/10 transition-all duration-300"
                          >
                            <FiMessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                            <span>Reply</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Reply Form */}
        {showReplyForm && session && (
          <div className="mt-5 pl-8 border-l border-emerald-500/20">
            <div className="ml-3">
              <form
                onSubmit={handleReplySubmit}
                className="bg-[#0a0a0a]/90 backdrop-blur-lg rounded-xl border border-white/[0.1] p-4"
              >
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder={`Reply to ${comment.author.name}...`}
                  className="w-full h-28 px-5 py-4 bg-[#0a0a0a]/50 rounded-xl border border-white/[0.1] text-[15px] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all duration-300 resize-none"
                  autoFocus
                />
                <div className="mt-5 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowReplyForm(false);
                      setReplyContent('');
                    }}
                    className="px-6 py-2.5 text-sm text-gray-400 hover:text-gray-300 rounded-xl hover:bg-white/5 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!replyContent.trim() || isSubmittingReply}
                    className="group flex items-center gap-2.5 px-6 py-2.5 bg-emerald-500/90 text-white rounded-xl hover:bg-emerald-500
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <span className="text-sm font-medium">
                      {isSubmittingReply ? 'Sending...' : 'Send Reply'}
                    </span>
                    <IoSendSharp className="w-4 h-4 group-hover:translate-x-0.5 group-hover:scale-110 transition-all duration-300" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Comments({ postSlug }: CommentsProps) {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('write');

  const { data: comments, error } = useSWR(
    `/api/comments?postSlug=${postSlug}`,
    async (url) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch comments');
      return res.json();
    }
  );

  const handleReply = async (parentId: string, content: string) => {
    if (!session) {
      signIn('google');
      return;
    }

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          postSlug,
          parentId,
        }),
      });

      if (!res.ok) throw new Error('Failed to post reply');
      mutate(`/api/comments?postSlug=${postSlug}`);
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const handleLike = async (commentId: string, isReply: boolean = false) => {
    if (!session) {
      signIn('google');
      return;
    }

    try {
      const res = await fetch('/api/comments/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commentId,
          postSlug,
          isReply,
        }),
      });

      if (!res.ok) throw new Error('Failed to like comment');
      mutate(`/api/comments?postSlug=${postSlug}`);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const commentsCount = comments?.length || 0;
  const repliesCount =
    comments?.reduce(
      (acc: number, comment: any) => acc + (comment.replies?.length || 0),
      0
    ) || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: comment,
          postSlug,
        }),
      });

      if (!res.ok) throw new Error('Failed to post comment');
      setComment('');
      mutate(`/api/comments?postSlug=${postSlug}`);
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold text-gray-200">
            <Accent>Comments</Accent>
          </h3>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-[#0a0a0a]/50 rounded-full text-sm text-gray-500">
            <span>{commentsCount}</span>
            <span>&bull;</span>
            <span>{repliesCount} replies</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2 text-sm bg-[#0a0a0a]/50 text-gray-500 rounded-xl hover:text-gray-400 hover:bg-[#0a0a0a]/80 transition-all duration-300">
            Oldest
          </button>
          <button className="px-5 py-2 text-sm bg-emerald-500/[0.08] text-emerald-400/90 rounded-xl hover:bg-emerald-500/[0.12] transition-all duration-300">
            Latest
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.1] overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-lg">
        <div className="border-b border-white/[0.1]">
          <div className="flex">
            <button
              onClick={() => setActiveTab('write')}
              className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === 'write'
                  ? 'text-emerald-400/90 bg-emerald-500/[0.08] border-b-2 border-emerald-400/90'
                  : 'text-gray-500 hover:text-gray-400 hover:bg-white/[0.02]'
              }`}
            >
              Write
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === 'preview'
                  ? 'text-emerald-400/90 bg-emerald-500/[0.08] border-b-2 border-emerald-400/90'
                  : 'text-gray-500 hover:text-gray-400 hover:bg-white/[0.02]'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        <div className="p-8">
          {session ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex gap-5">
                <Avatar
                  src={session.user?.image || ''}
                  alt={session.user?.name || ''}
                  size="md"
                  className="ring-2 ring-white/[0.05] hover:ring-emerald-500/20 transition-all duration-300"
                />
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full h-32 px-5 py-4 bg-[#0a0a0a]/50 rounded-xl border border-white/[0.03] text-[15px] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 transition-all duration-300 resize-none"
                  />
                  <div className="mt-5 flex justify-end">
                    <button
                      type="submit"
                      disabled={!comment.trim() || isSubmitting}
                      className="group flex items-center gap-2.5 px-6 py-2.5  gradient-border  text-white rounded-xl hover:bg-emerald-500
                      disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                      <span className="text-sm font-medium">
                        {isSubmitting ? 'Sending...' : 'Send'}
                      </span>
                      <IoSendSharp className="w-4 h-4 group-hover:translate-x-0.5 group-hover:scale-110 transition-all duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-400 mb-4">
                Sign in to comment and interact with other readers
              </p>
              <button
                onClick={() => signIn('google')}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <FaGoogle className="w-5 h-5" />
                <span className="font-medium">Sign in with Google</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {comments?.map((comment: any) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onLike={handleLike}
            session={session}
          />
        ))}
      </div>
    </div>
  );
}
