import React, { useState } from 'react';
import { HiShare, HiLink, HiCheck } from 'react-icons/hi';
import { FaTwitter, FaLinkedin, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import clsx from 'clsx';
import { FiShare2 } from 'react-icons/fi';

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
}

export default function ShareButtons({
  url,
  title,
  description,
}: ShareButtonsProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const shareButtons = [
    {
      name: 'Twitter',
      icon: FaTwitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]',
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]',
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      color: 'hover:bg-[#25D366]/10 hover:text-[#25D366]',
    },
    {
      name: 'Telegram',
      icon: FaTelegram,
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'hover:bg-[#0088CC]/10 hover:text-[#0088CC]',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative">
      {/* Main Share Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'p-2 rounded-xl transition-all duration-300',
          'text-[#A3A3A3] hover:text-emerald-400 hover:bg-emerald-500/10',
          isOpen && 'bg-emerald-500/10 text-emerald-400'
        )}
        aria-label="Share this article"
      >
        <FiShare2 className="w-4 h-4" />
      </button>

      {/* Share Options */}
      <div
        className={clsx(
          'absolute bottom-full left-1/2 -translate-x-1/2 mb-2',
          'w-[280px] p-2 rounded-xl bg-[#0a0a0a] border border-gray-800',
          'transform transition-all duration-300',
          isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible translate-y-2'
        )}
      >
        {/* Arrow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-[#0a0a0a] border-r border-b border-gray-800" />

        <div className="relative">
          {/* Social Share Buttons */}
          <div className="grid grid-cols-4 gap-1 mb-2">
            {shareButtons.map((button) => (
              <a
                key={button.name}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                  'flex flex-col items-center gap-1 p-2 rounded-lg',
                  'text-gray-400 transition-all duration-300',
                  button.color
                )}
              >
                <button.icon className="w-5 h-5" />
                <span className="text-xs">{button.name}</span>
              </a>
            ))}
          </div>

          {/* Copy Link Button */}
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center gap-2 p-2 rounded-lg
              text-sm text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10
              transition-all duration-300"
          >
            {isCopied ? (
              <>
                <HiCheck className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <HiLink className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
