'use client';

import { useEffect, useState } from 'react';
import { FiTwitter, FiLinkedin, FiLink } from 'react-icons/fi';
import clsx from 'clsx';

interface FloatingShareProps {
  title: string;
}

export default function FloatingShare({ title }: FloatingShareProps) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  const shareConfigs = [
    {
      label: 'Twitter',
      icon: FiTwitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: 'LinkedIn',
      icon: FiLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className={clsx(
        'hidden lg:flex flex-col gap-3 fixed left-8 top-1/3 z-40',
        'print:hidden'
      )}
    >
      {shareConfigs.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1a1a1a]/90 border border-white/10 text-neutral-300 hover:bg-emerald-600 hover:text-white transition-colors"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
      {/* Copy link */}
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1a1a1a]/90 border border-white/10 text-neutral-300 hover:bg-emerald-600 hover:text-white transition-colors"
      >
        {copied ? (
          <span className="text-xs font-semibold">✓</span>
        ) : (
          <FiLink className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
