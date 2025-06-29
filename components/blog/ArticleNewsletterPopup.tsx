import React, { useState, useEffect } from 'react';
import { HiX, HiMail } from 'react-icons/hi';
import GlowingButton from '../shared/GlowingButton';

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
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-500 ${
        isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Backdrop dengan blur effect yang lebih halus */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500"
        onClick={handleClose}
      />

      {/* Popup Container dengan animasi yang lebih halus */}
      <div
        className={`relative w-full max-w-md transform transition-all duration-500 ${
          isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Card dengan desain yang lebih modern */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#0a0a0a] rounded-2xl shadow-2xl">
          {/* Subtle gradient border */}
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          {/* bg-gradient-to-r from-emerald-500/10 via-emerald-500/20
          to-emerald-500/10 opacity-50 */}
          {/* Main content dengan padding yang lebih nyaman */}
          <div className="relative p-8 sm:p-10">
            {/* Close button yang lebih elegan */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <HiX className="w-5 h-5" />
            </button>

            {/* Icon dengan efek glow yang subtle */}
            <div className="mb-6 flex justify-center">
              <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-xl ring-1 ring-emerald-500/20">
                <HiMail className="w-8 h-8 text-emerald-400" />
              </div>
            </div>

            {/* Text content dengan spacing yang lebih baik */}
            <div className="text-center space-y-4">
              <h3 className="text-xl font-medium text-white">
                Like this article?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Get the latest updates and don't miss out my latest articles!.
                Get an email whenever I post, no spam ✌️
              </p>

              {/* Subscribe button dengan desain yang lebih menarik */}
              <div className="pt-2">
                <GlowingButton
                  href="https://alkindivv.substack.com/subscribe?utm_source=article-popup&utm_medium=web&utm_campaign=article-popup"
                  variant="small"
                  className="justify-center"
                >
                  Subscribe Newsletter
                </GlowingButton>
              </div>

              {/* "Mungkin nanti" link yang lebih subtle */}
              <button
                onClick={handleClose}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors mt-4 py-2"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
