import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import { format } from 'date-fns';
import useSWR, { mutate } from 'swr';
import { FaGoogle } from 'react-icons/fa';
import { BiUpvote } from 'react-icons/bi';

interface CommentsProps {
  postSlug: string;
}

interface CommentItemProps {
  comment: any;
  onReply: (parentId: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReply }) => {
  const [showReplies, setShowReplies] = useState(true);
  const { data: session } = useSession();

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Comment */}
      <div className="flex gap-3">
        <div className="flex flex-col items-center">
          <Image
            src={comment.author.image}
            alt={comment.author.name}
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-200">
                  {comment.author.name}
                </span>
                <span className="text-xs text-gray-500">
                  • {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                </span>
              </div>
              {session && (
                <button
                  onClick={() => onReply(comment.id)}
                  className="text-sm text-gray-400 hover:text-emerald-500 transition-colors"
                >
                  Reply
                </button>
              )}
            </div>
            <div className="text-sm text-gray-300">{comment.content}</div>
          </div>
        </div>
      </div>

      {/* Replies Section */}
      {comment.replies?.length > 0 && (
        <div className="ml-8 pl-4 border-l-2 border-gray-800">
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-sm text-gray-400 hover:text-emerald-500 transition-colors flex items-center gap-1 mb-4"
          >
            {showReplies ? '▼' : '▶'} {comment.replies.length} repl
            {comment.replies.length === 1 ? 'y' : 'ies'}
          </button>

          {showReplies && (
            <div className="space-y-4">
              {comment.replies.map((reply: any) => (
                <div key={reply.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <Image
                      src={reply.author.image}
                      alt={reply.author.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#0d1117] rounded-lg border border-gray-800 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-200">
                            {reply.author.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            • {format(new Date(reply.createdAt), 'MMM d, yyyy')}
                          </span>
                        </div>
                        {session && (
                          <button
                            onClick={() => onReply(comment.id)}
                            className="text-sm text-gray-400 hover:text-emerald-500 transition-colors"
                          >
                            Reply
                          </button>
                        )}
                      </div>
                      <div className="text-sm text-gray-300">
                        <span className="text-emerald-500 text-xs mb-2 block">
                          Replying to {comment.author.name}
                        </span>
                        {reply.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function Comments({ postSlug }: CommentsProps) {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
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

  const handleReply = (parentId: string) => {
    setReplyTo(parentId);
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.focus();
      textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      signIn('google');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: comment,
          postSlug,
          parentId: replyTo,
        }),
      });

      if (!res.ok) throw new Error('Failed to post comment');
      setComment('');
      setReplyTo(null);
      mutate(`/api/comments?postSlug=${postSlug}`);
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const commentsCount = comments?.length || 0;
  const repliesCount =
    comments?.reduce(
      (acc: number, comment: any) => acc + (comment.replies?.length || 0),
      0
    ) || 0;

  return (
    <div className="mt-8 space-y-8">
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-400">
          {commentsCount} comments • {repliesCount} replies
          <span className="text-gray-500 ml-2">— powered by giscus</span>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm bg-[#1c1c1c] text-gray-300 rounded-md hover:bg-[#252525]">
            Oldest
          </button>
          <button className="px-3 py-1 text-sm bg-[#1c1c1c] text-gray-300 rounded-md hover:bg-[#252525]">
            Newest
          </button>
        </div>
      </div>

      {replyTo && (
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2 bg-[#1c1c1c] p-2 rounded-lg">
          <span>Replying to comment</span>
          <button
            onClick={() => setReplyTo(null)}
            className="text-emerald-500 hover:text-emerald-400 ml-auto"
          >
            Cancel reply
          </button>
        </div>
      )}

      <div className="bg-[#0d1117] rounded-lg border border-gray-800 overflow-hidden">
        <div className="border-b border-gray-800">
          <div className="flex">
            <button
              onClick={() => setActiveTab('write')}
              className={`px-4 py-2 text-sm ${
                activeTab === 'write'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Write
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 text-sm ${
                activeTab === 'preview'
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'write' ? (
              <div className="relative">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={
                    session ? 'Leave a comment' : 'Sign in to comment'
                  }
                  className="w-full min-h-[150px] p-4 bg-[#0d1117] border border-gray-800 rounded-lg text-gray-300 placeholder-gray-500 focus:border-gray-700 focus:ring-0 resize-y text-sm"
                  rows={6}
                  disabled={!session}
                />
              </div>
            ) : (
              <div className="min-h-[150px] p-4 bg-[#0d1117] border border-gray-800 rounded-lg text-gray-300 text-sm">
                {comment || 'Nothing to preview'}
              </div>
            )}

            {!session ? (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => signIn('google')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors text-sm"
                >
                  <FaGoogle className="text-lg" />
                  Sign in with Google
                </button>
              </div>
            ) : (
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !comment.trim()}
                  className="px-4 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Comment
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {comments?.map((comment: any) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
          />
        ))}
      </div>
    </div>
  );
}
