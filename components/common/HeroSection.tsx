import React, { useEffect, useState } from 'react';
import GlowingButton from '../shared/GlowingButton';
import Accent from '../shared/Accent';
import Link from 'next/link';
import { HiChevronRight, HiChevronDoubleDown } from 'react-icons/hi';
import SocialMedia from '../social/SocialMedia';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set isLoaded to true after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.querySelector('.about-preview-section');
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Legal themed decorative elements */}
      <div className="absolute inset-0 -z-10">
        {/* Base background */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-[#060a0e] via-[#081015] to-[#060a0e]"></div> */}

        {/* Decorative legal columns - left */}
        <div
          className="absolute left-10 top-1/4 bottom-1/4 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: isLoaded ? 0.1 : 0, transitionDelay: '300ms' }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-500/40 transform origin-top scale-y-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isLoaded ? 'scaleY(1)' : 'scaleY(0)',
              transitionDelay: '400ms',
            }}
          ></div>
          <div
            className="absolute left-4 top-0 bottom-0 w-[2px] bg-emerald-500/40 transform origin-top scale-y-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isLoaded ? 'scaleY(1)' : 'scaleY(0)',
              transitionDelay: '600ms',
            }}
          ></div>
          <div
            className="absolute left-0 top-10 w-6 h-6 border-t-2 border-l-2 border-emerald-500/40 opacity-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: isLoaded ? 1 : 0, transitionDelay: '800ms' }}
          ></div>
          <div
            className="absolute left-0 bottom-10 w-6 h-6 border-b-2 border-l-2 border-emerald-500/40 opacity-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: isLoaded ? 1 : 0, transitionDelay: '1000ms' }}
          ></div>
        </div>

        {/* Decorative legal columns - right */}
        <div
          className="absolute right-10 top-1/4 bottom-1/4 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: isLoaded ? 0.1 : 0, transitionDelay: '500ms' }}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-[2px] bg-emerald-500/40 transform origin-top scale-y-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isLoaded ? 'scaleY(1)' : 'scaleY(0)',
              transitionDelay: '600ms',
            }}
          ></div>
          <div
            className="absolute right-4 top-0 bottom-0 w-[2px] bg-emerald-500/40 transform origin-top scale-y-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isLoaded ? 'scaleY(1)' : 'scaleY(0)',
              transitionDelay: '800ms',
            }}
          ></div>
          <div
            className="absolute right-0 top-10 w-6 h-6 border-t-2 border-r-2 border-emerald-500/40 opacity-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: isLoaded ? 1 : 0, transitionDelay: '1000ms' }}
          ></div>
          <div
            className="absolute right-0 bottom-10 w-6 h-6 border-b-2 border-r-2 border-emerald-500/40 opacity-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: isLoaded ? 1 : 0, transitionDelay: '1200ms' }}
          ></div>
        </div>

        {/* Legal scale decoration - more visible with animation */}
        <div
          className="absolute top-1/4 right-1/4 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: isLoaded ? 0.1 : 0, transitionDelay: '800ms' }}
        >
          <div
            className="w-[2px] h-40 bg-emerald-500/40 absolute left-20 top-0 transform origin-top scale-y-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isLoaded ? 'scaleY(1)' : 'scaleY(0)',
              transitionDelay: '900ms',
            }}
          ></div>
          <div
            className="w-40 h-[2px] bg-emerald-500/40 absolute left-0 top-40 transform origin-left scale-x-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '1100ms',
            }}
          ></div>
          <div
            className="w-10 h-10 rounded-full border-2 border-emerald-500/40 absolute left-16 top-36 opacity-0 transition-all duration-1000 ease-in-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.5)',
              transitionDelay: '1300ms',
            }}
          ></div>
          <div
            className="w-10 h-10 rounded-full border-2 border-emerald-500/40 absolute right-0 top-36 opacity-0 transition-all duration-1000 ease-in-out"
            style={{
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'scale(1)' : 'scale(0.5)',
              transitionDelay: '1500ms',
            }}
          ></div>
        </div>

        {/* Legal document texture - more visible */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-2000 ease-in-out"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(16,185,129,0.08) 1px, transparent 1px)',
            backgroundSize: '100% 28px',
            opacity: isLoaded ? 0.03 : 0,
            transitionDelay: '1000ms',
          }}
        />

        {/* SVG Scale of Justice with animation */}
        <div
          className="absolute top-1/3 right-[10%] transform -translate-y-1/2 opacity-0 transition-opacity duration-1500"
          style={{ opacity: isLoaded ? 0.2 : 0, transitionDelay: '1200ms' }}
        >
          <svg
            width="240"
            height="240"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Scale Pole with drawing animation */}
            <rect
              x="118"
              y="10"
              width="4"
              height="180"
              rx="2"
              fill="rgba(16, 185, 129, 0.6)"
              className="transform origin-top"
              style={{
                transformBox: 'fill-box',
                transform: isLoaded ? 'scaleY(1)' : 'scaleY(0)',
                transition: 'transform 1.5s ease-out',
                transitionDelay: '1300ms',
              }}
            />

            {/* Scale Top with drawing animation */}
            <rect
              x="70"
              y="40"
              width="100"
              height="4"
              rx="2"
              fill="rgba(16, 185, 129, 0.6)"
              className="transform origin-center"
              style={{
                transformBox: 'fill-box',
                transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 1.5s ease-out',
                transitionDelay: '1500ms',
              }}
            />

            {/* Left Chain with fade in */}
            <line
              x1="71"
              y1="42"
              x2="71"
              y2="90"
              stroke="rgba(16, 185, 129, 0.4)"
              strokeWidth="2"
              strokeDasharray="4 4"
              style={{
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                transitionDelay: '1700ms',
              }}
            />

            {/* Right Chain with fade in */}
            <line
              x1="169"
              y1="42"
              x2="169"
              y2="90"
              stroke="rgba(16, 185, 129, 0.4)"
              strokeWidth="2"
              strokeDasharray="4 4"
              style={{
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                transitionDelay: '1700ms',
              }}
            />

            {/* Left Plate with scale animation */}
            <circle
              cx="71"
              cy="110"
              r="30"
              stroke="rgba(16, 185, 129, 0.6)"
              strokeWidth="2"
              fill="transparent"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'scale(1)' : 'scale(0.5)',
                transition: 'transform 1.5s ease-out, opacity 1.5s ease-in-out',
                transitionDelay: '1900ms',
              }}
            />
            <circle
              cx="71"
              cy="110"
              r="25"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="1"
              fill="transparent"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'scale(1)' : 'scale(0.5)',
                transition: 'transform 1.5s ease-out, opacity 1.5s ease-in-out',
                transitionDelay: '2000ms',
              }}
            />

            {/* Right Plate with scale animation */}
            <circle
              cx="169"
              cy="110"
              r="30"
              stroke="rgba(16, 185, 129, 0.6)"
              strokeWidth="2"
              fill="transparent"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'scale(1)' : 'scale(0.5)',
                transition: 'transform 1.5s ease-out, opacity 1.5s ease-in-out',
                transitionDelay: '1900ms',
              }}
            />
            <circle
              cx="169"
              cy="110"
              r="25"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="1"
              fill="transparent"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'scale(1)' : 'scale(0.5)',
                transition: 'transform 1.5s ease-out, opacity 1.5s ease-in-out',
                transitionDelay: '2000ms',
              }}
            />

            {/* Base with fade in */}
            <rect
              x="95"
              y="190"
              width="50"
              height="10"
              rx="4"
              fill="rgba(16, 185, 129, 0.4)"
              style={{
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                transitionDelay: '2100ms',
              }}
            />
          </svg>
        </div>

        {/* Legal Gavel - SVG approach with animation */}
        <div
          className="absolute bottom-[20%] left-[10%] opacity-0 transition-opacity duration-1500"
          style={{ opacity: isLoaded ? 0.2 : 0, transitionDelay: '1500ms' }}
        >
          <svg
            width="200"
            height="120"
            viewBox="0 0 200 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gavel Head with animation */}
            <rect
              x="10"
              y="20"
              width="60"
              height="30"
              rx="4"
              transform="rotate(-30 10 20)"
              fill="rgba(16, 185, 129, 0.5)"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded
                  ? 'rotate(-30) translateX(0)'
                  : 'rotate(-30) translateX(-20px)',
                transition: 'transform 1.5s ease-out, opacity 1.5s ease-in-out',
                transitionDelay: '1700ms',
              }}
            />

            {/* Gavel Handle with animation */}
            <rect
              x="60"
              y="35"
              width="120"
              height="8"
              rx="4"
              transform="rotate(-30 60 35)"
              fill="rgba(16, 185, 129, 0.6)"
              className="transform origin-left"
              style={{
                transformBox: 'fill-box',
                transform: isLoaded
                  ? 'rotate(-30) scaleX(1)'
                  : 'rotate(-30) scaleX(0)',
                transition: 'transform 1.8s ease-out',
                transitionDelay: '1900ms',
              }}
            />

            {/* Sound Block with animation */}
            <rect
              x="130"
              y="70"
              width="60"
              height="30"
              rx="4"
              fill="rgba(16, 185, 129, 0.4)"
              style={{
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'transform 1.5s ease-out, opacity 1.5s ease-in-out',
                transitionDelay: '2100ms',
              }}
            />
          </svg>
        </div>

        {/* Simple document corner decorations with animation */}
        <div
          className="absolute top-20 left-20 opacity-0 transition-all duration-1500"
          style={{
            opacity: isLoaded ? 0.15 : 0,
            transform: isLoaded ? 'translate(0, 0)' : 'translate(-10px, -10px)',
            transitionDelay: '800ms',
          }}
        >
          <div className="w-40 h-40 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-md"></div>
        </div>
        <div
          className="absolute bottom-20 right-20 opacity-0 transition-all duration-1500"
          style={{
            opacity: isLoaded ? 0.15 : 0,
            transform: isLoaded ? 'translate(0, 0)' : 'translate(10px, 10px)',
            transitionDelay: '1000ms',
          }}
        >
          <div className="w-40 h-40 border-b-2 border-r-2 border-emerald-500/40 rounded-br-md"></div>
        </div>

        {/* Paragraph lines - left side decoration with animation */}
        <div
          className="absolute top-1/3 left-[5%] opacity-0 transition-opacity duration-1500"
          style={{ opacity: isLoaded ? 0.15 : 0, transitionDelay: '1300ms' }}
        >
          <div className="w-40 space-y-3">
            <div
              className="h-[2px] w-full bg-emerald-500/40 transform origin-left scale-x-0 transition-transform duration-1000 ease-out"
              style={{
                transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: '1400ms',
              }}
            ></div>
            <div
              className="h-[2px] w-3/4 bg-emerald-500/40 transform origin-left scale-x-0 transition-transform duration-1000 ease-out"
              style={{
                transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: '1500ms',
              }}
            ></div>
            <div
              className="h-[2px] w-1/2 bg-emerald-500/40 transform origin-left scale-x-0 transition-transform duration-1000 ease-out"
              style={{
                transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: '1600ms',
              }}
            ></div>
            <div
              className="h-[2px] w-2/3 bg-emerald-500/40 transform origin-left scale-x-0 transition-transform duration-1000 ease-out"
              style={{
                transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: '1700ms',
              }}
            ></div>
          </div>
        </div>

        {/* Paragraph lines - right side decoration with animation */}
        <div
          className="absolute bottom-1/3 right-[5%] opacity-0 transition-opacity duration-1500"
          style={{ opacity: isLoaded ? 0.15 : 0, transitionDelay: '1400ms' }}
        >
          <div className="w-40 space-y-3">
            <div
              className="h-[2px] w-full bg-emerald-500/40 transform origin-right scale-x-0 transition-transform duration-1000 ease-out"
              style={{
                transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: '1500ms',
              }}
            ></div>
            <div
              className="h-[2px] w-3/4 bg-emerald-500/40 transform origin-right scale-x-0 transition-transform duration-1000 ease-out"
              style={{
                transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: '1600ms',
              }}
            ></div>
            <div
              className="h-[2px] w-1/2 bg-emerald-500/40 transform origin-right scale-x-0 transition-transform duration-1000 ease-out"
              style={{
                transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: '1700ms',
              }}
            ></div>
            <div
              className="h-[2px] w-2/3 bg-emerald-500/40 transform origin-right scale-x-0 transition-transform duration-1000 ease-out"
              style={{
                transform: isLoaded ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: '1800ms',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content - left aligned with container */}
      <div className="py-10 relative z-10">
        <div className="ml-0 space-y-8 text-left">
          {/* Status Badge */}
          <div
            className="inline-flex items-center gap-3 py-2 px-4 rounded-full backdrop-blur-md border bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
            data-fade="1"
          >
            <div className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </div>
            <span className="text-sm font-medium">
              Available for opportunities
            </span>
            <HiChevronRight className="w-4 h-4 text-emerald-400/80" />
          </div>

          {/* Main Headline */}
          <div className="space-y-6">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
              data-fade="2"
            >
              <span className=" text-white">I'm</span> {''}
              <span className="gradient-text">AL KINDI</span>
            </h1>

            {/* Subtitle - With horizontal line */}
            <div className="flex items-center space-x-4" data-fade="3">
              <div className="h-[1px] w-12 bg-emerald-500/50"></div>
              <p className="text-base md:text-xl text-neutral-300 leading-relaxed">
                <span className="text-white font-semibold">Law</span> x{' '}
                <span className="text-white font-semibold">Tech</span>{' '}
                Enthusiast
              </p>
            </div>

            {/* Description - Left aligned with max width */}
            <p
              className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-xl paragraph-text"
              data-fade="4"
            >
              Sharing insights on legal innovations, digital transformations,
              and the future of law in the digital age.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-row sm:flex-row gap-4" data-fade="5">
            <Link href="/blog">
              <GlowingButton variant="default">
                <span className="flex items-center gap-2">
                  Explore My Articles
                </span>
              </GlowingButton>
            </Link>

            {/* <Link href="/about">
              <GlowingButton variant="small">
                <span className="flex items-center gap-2">About Me</span>
              </GlowingButton>
            </Link> */}
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-start gap-4 pt-8" data-fade="6">
            <p className="text-sm text-neutral-500 font-medium tracking-wide uppercase">
              Connect with me
            </p>
            <div className="flex items-center gap-6">
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full flex justify-center pb-8"
        data-fade="7"
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
          <div className="flex items-center justify-center group-hover:border-emerald-500/30 transition-all duration-300">
            <HiChevronDoubleDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-300" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
