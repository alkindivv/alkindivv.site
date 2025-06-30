import React, { useState, useEffect } from 'react';
import { HiX, HiMail } from 'react-icons/hi';
import GlowingButton from '../shared/GlowingButton';
import DimensionLinkNoArrow from '../common/DimensionLinkNoArrow';

interface ArticleNewsletterPopupProps {
  slug: string;
}

export default function ArticleNewsletterPopup({
  slug,
}: ArticleNewsletterPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const lastClosed = localStorage.getItem(`newsletterPopup_${slug}`);
    const shouldShow =
      !lastClosed || Date.now() - Number(lastClosed) > 7 * 24 * 60 * 60 * 1000;

    // Newsletter popup state tracking

    if (shouldShow) {
      const handleScroll = () => {
        if (hasScrolled) return;

        const scrollPercent =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;

        // Track scroll progress for popup trigger

        if (scrollPercent > 50) {
          setHasScrolled(true);
          setIsOpen(true);
          window.removeEventListener('scroll', handleScroll);
        }
      };

      // Tambahkan passive: true untuk performa yang lebih baik
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Cek scroll position saat komponen dimount
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [slug, hasScrolled]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      localStorage.setItem(`newsletterPopup_${slug}`, Date.now().toString());
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-3 left-2 sm:bottom-4 sm:left-4 z-50 w-[90vw] max-w-[260px] transition-transform duration-500 ${
        isClosing
          ? 'translate-x-[-120%] opacity-0'
          : 'translate-x-0 opacity-100'
      }`}
    >
      {/* Card dengan desain yang lebih modern */}
      <div className="relative overflow-hidden bg-neutral-900/90 rounded-xl shadow-lg border border-white/10 flex items-center gap-3 px-4 py-3">
        {/* Subtle gradient border */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        {/* bg-gradient-to-r from-emerald-500/10 via-emerald-500/20
        to-emerald-500/10 opacity-50 */}
        {/* Main content dengan padding yang lebih nyaman */}
        <div className="relative flex items-center gap-3">
          {/* Close button yang lebih elegan */}
          <button
            onClick={handleClose}
            aria-label="Close newsletter popup"
            className="absolute -top-2 -right-16 p-0 rounded-full bg-neutral-800/80 backdrop-blur text-gray-300 hover:text-white hover:bg-neutral-700 transition-colors duration-200"
          >
            <HiX className="w-4.5 h-4.5" />
          </button>

          {/* Icon dengan efek glow yang subtle */}
          <div className="flex-shrink-0">
            <div className="p-2 bg-gradient-to-br from-emerald-500/30 to-emerald-500/10 rounded-lg ring-1 ring-emerald-500/30">
              <HiMail className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          {/* Text content dengan spacing yang lebih baik */}
          <div className="flex flex-col gap-1 text-left">
            <p className="text-xs text-white font-medium">
              Enjoying this article?
            </p>
            {/* <a
              href="https://alkindivv.substack.com/subscribe?utm_source=article-popup&utm_medium=web&utm_campaign=article-popup"
              className="text-[0.7rem] text-emerald-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Subscribe
            </a> */}
            <DimensionLinkNoArrow
              href="https://alkindivv.substack.com/subscribe?utm_source=article-popup&utm_medium=web&utm_campaign=article-popup"
              className="text-[0.6rem] text-neutral-400"
            >
              Subscribe
            </DimensionLinkNoArrow>
          </div>
        </div>
      </div>
    </div>
  );
}
