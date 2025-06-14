'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import GlowingButton from '../shared/GlowingButton';
import SocialMedia from '../social/SocialMedia';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { HiChevronDoubleDown, HiScale } from 'react-icons/hi';
import type { ISourceOptions, OutMode } from 'tsparticles-engine';

// Varian animasi untuk container utama
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Varian animasi untuk item anak (teks, tombol, dll.)
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Inisialisasi particles.js
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

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
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    } else {
      // Fallback jika tidak menemukan section
      window.scrollTo({
        top: window.innerHeight,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  // Opsi konfigurasi untuk Particles.js
  const particlesOptions: ISourceOptions = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#10b981', // Emerald-500
      },
      links: {
        color: '#10b981',
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce' as OutMode,
        },
        random: false,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50,
      },
      opacity: {
        value: 0.2,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  return (
    <section className="w-full relative min-h-screen flex items-center overflow-hidden ">
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
      <motion.div
        className=""
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* 4. Kartu Glassmorphism untuk Konten */}
        <motion.div className=" " variants={itemVariants}>
          <div className="space-y-8">
            {/* Small Intro Badge */}
            <motion.div
              className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs md:text-sm font-medium backdrop-blur-sm"
              variants={itemVariants}
            >
              <HiScale className="w-4 h-4" />
              Looking for opportunities
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white max-w-3xl"
              variants={containerVariants}
            >
              I'm <span className="gradient-text">AL KINDI</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.div variants={itemVariants}>
              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl">
                Developing my expertise in corporate M&A, and capital market,
                and as writing about law, tech, and crypto.
              </p>
            </motion.div>

            {/* Tagline below sub-headline */}
            {/* <motion.p
              className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-lg"
              variants={itemVariants}
            >
              Bridging complex regulations with innovative technology solutions.
            </motion.p> */}

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-row gap-4 flex-wrap"
              variants={itemVariants}
            >
              <GlowingButton
                onClick={handleScrollDown}
                variant="default"
                iconPosition="down"
              >
                Learn How
              </GlowingButton>
              {/* <Link href="/services" className="inline-block">
                <GlowingButton variant="default" iconPosition="right">
                  Explore Services
                </GlowingButton>
              </Link> */}
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex flex-col  gap-4 pt-6"
              variants={itemVariants}
            >
              <div className="flex items-center gap-6">
                <SocialMedia />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

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
