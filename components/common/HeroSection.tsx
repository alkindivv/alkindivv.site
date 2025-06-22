'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import GlowingButton from '../shared/GlowingButton';
import SocialMedia from '../social/SocialMedia';
import { HiChevronDoubleDown, HiScale } from 'react-icons/hi';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Efek untuk melacak posisi mouse
  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // PERBAIKAN: Fungsi handleScrollDown yang lebih andal
  const handleScrollDown = () => {
    // Cara lebih efektif untuk scroll ke section berikutnya
    const aboutSection = document.querySelector('.about-preview-section');

    if (aboutSection) {
      // Gunakan offset untuk menghindari tertutup header
      const headerOffset = 80;
      const aboutSectionPosition = aboutSection.getBoundingClientRect().top;
      const offsetPosition =
        aboutSectionPosition + window.pageYOffset - headerOffset;

      // Scroll ke posisi yang sudah dihitung
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      // Fallback jika tidak menemukan section
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="w-full relative min-h-screen flex items-center overflow-hidden">
      {/* 1. Latar Belakang Partikel Interaktif - HANYA DI HERO SECTION */}
      {/* Particle background disabled as per request */}

      {/* 2. Efek Sorotan Mengikuti Mouse */}
      {/* {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px -z-10 transition duration-300"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
          }}
        />
      )} */}

      {/* 3. Decorative diagonal grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,rgba(0,0,0,1)_70%)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className="text-emerald-500/20"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Konten Utama */}
      <div className="mx-auto">
        <div className="space-y-8 text-center">
          <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-emerald-500/10 text-emerald-300 text-xs md:text-sm font-medium">
            <HiScale className="w-4 h-4" />
            Looking for opportunities
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            I'm <span>AL KINDI</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            Bridging the intersection between law & technology — growing my
            skills in M&A and capital markets, and sharing insights on law,
            tech, and crypto through this website.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact">
              <GlowingButton variant="default" iconPosition="right">
                Get in Touch
              </GlowingButton>
            </Link>
            <GlowingButton
              onClick={handleScrollDown}
              variant="default"
              iconPosition="down"
            >
              Learn How
            </GlowingButton>
          </div>

          <div className="flex justify-center pt-1">
            <SocialMedia />
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Perbaikan posisi dan visibilitas */}
      <div
        className="absolute bottom-8 left-0 right-0 w-full flex justify-center"
        style={{ zIndex: 20 }}
      >
        <button
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-1 text-neutral-500 hover:text-emerald-400 transition-colors duration-300 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm "
          aria-label="Scroll to next section"
        >
          {/* <span className="text-xs font-medium">Scroll Down</span> */}
          <HiChevronDoubleDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
