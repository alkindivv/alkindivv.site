import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import GlowingButton from '../shared/GlowingButton';
import SocialMedia from '../social/SocialMedia';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { HiChevronRight, HiChevronDoubleDown } from 'react-icons/hi';
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

  const handleScrollDown = () => {
    const nextSection = document.querySelector('.about-preview-section');
    if (nextSection) {
      nextSection.scrollIntoView({
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
    <section className="min-h-screen flex items-center overflow-hidden">
      {/* 1. Latar Belakang Partikel Interaktif */}
      {!prefersReducedMotion && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0 -z-20"
        />
      )}

      {/* 2. Efek Sorotan Mengikuti Mouse */}
      {/* {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px -z-10 transition duration-300"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
          }}
        />
      )} */}

      {/* 3. Elemen Dekoratif Grid */}
      <div className=""></div>

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
            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center gap-3 py-2 px-4 rounded-full border bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
              variants={itemVariants}
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </div>
              <span className="text-sm font-medium">
                Available for new opportunities
              </span>
              <HiChevronRight className="w-4 h-4 text-emerald-400/80" />
            </motion.div>

            {/* Main Headline dengan Animasi per Karakter */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white"
              variants={containerVariants}
            >
              <span className="whitespace-nowrap">I'm </span>
              <span className="gradient-text whitespace-nowrap">AL KINDI</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div variants={itemVariants}>
              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                A Passionate{' '}
                <span className="font-semibold text-white">Lawyer</span> &{' '}
                <span className="font-semibold text-white">
                  Technology Enthusiast
                </span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl"
              variants={itemVariants}
            >
              Exploring the synergy between law and technology, and sharing
              insights on the future of legal practice in a digital world.
            </motion.p>

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
                <span className="flex items-left gap-2">Get in Touch</span>
              </GlowingButton>
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

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 w-full flex justify-center pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <button
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-1 text-neutral-500 hover:text-emerald-400 transition-colors duration-300"
          aria-label="Scroll down to next section"
          type="button"
        >
          <span className="text-xs tracking-wide uppercase font-medium mb-1">
            Scroll Down
          </span>
          <div className="flex items-center justify-center">
            <HiChevronDoubleDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
          </div>
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
