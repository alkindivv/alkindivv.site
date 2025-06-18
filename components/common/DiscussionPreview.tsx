'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import GlowingButton from '../shared/GlowingButton';

export default function DiscussionPreview() {
  const email = 'alkindi@gmail.com';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    const section = document.querySelector('.discussion-preview-section');
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className="w-full py-16 relative overflow-hidden discussion-preview-section">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0a1015]/30 via-transparent to-[#081a17]/20" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-2xl">
        <h3
          className="text-3xl md:text-5xl font-bold mb-4 underline underline-offset-2 decoration-white decoration-2"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 700ms ease-out, transform 700ms ease-out',
          }}
        >
          Any Questions?
        </h3>
        <p
          className="text-neutral-400 mb-8 text-sm md:text-base"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 700ms ease-out, transform 700ms ease-out',
            transitionDelay: '200ms',
          }}
        >
          Feel free to reach out for discussions, collaborations, or just a
          quick question. I'm always open to chat 👋.
        </p>
        <Link href={`mailto:${email}`} className="">
          <GlowingButton variant="small" iconPosition="link">
            <span className="flex items-center gap-2">Email Me</span>
          </GlowingButton>
        </Link>
      </div>
    </section>
  );
}
