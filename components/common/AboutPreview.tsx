'use client';

import React, { useEffect, useRef, useState } from 'react';
import GlowingButton from '../shared/GlowingButton';

import { HiScale } from 'react-icons/hi';
import OptimizedImage from '../shared/OptimizedImage';
import AccentNormal from '../shared/AccentNormal';
import Link from 'next/link';

const AboutPreview = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Observer untuk trigger animasi saat section masuk viewport
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

    // Target section untuk observe
    const section = document.querySelector('.about-preview-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section className="w-full py-16 relative overflow-hidden about-preview-section">
      {/* Clean minimal background */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1015]/30 via-transparent to-[#081a17]/20" />

        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(16,185,129,0.05) 1px, transparent 1px)',
            backgroundSize: '100% 28px',
            opacity: isVisible ? 0.03 : 0,
            transitionDelay: '300ms',
          }}
        />

        {/* Minimal decorative elements */}
        {/* Top horizontal line */}
        <div
          className="absolute top-[15%] left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)',
            opacity: isVisible ? 0.7 : 0,
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'opacity 1s ease-out, transform 1.5s ease-out',
            transitionDelay: '400ms',
          }}
        ></div>

        {/* Bottom horizontal line */}
        <div
          className="absolute bottom-[15%] left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)',
            opacity: isVisible ? 0.7 : 0,
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'opacity 1s ease-out, transform 1.5s ease-out',
            transitionDelay: '600ms',
          }}
        ></div>

        {/* Left vertical line */}
        <div
          className="absolute top-[15%] bottom-[15%] left-[10%] w-px hidden md:block"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)',
            opacity: isVisible ? 0.7 : 0,
            transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
            transition: 'opacity 1s ease-out, transform 1.5s ease-out',
            transitionDelay: '800ms',
            transformOrigin: 'top',
          }}
        ></div>

        {/* Right vertical line */}
        <div
          className="absolute top-[15%] bottom-[15%] right-[10%] w-px hidden md:block"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.2) 50%, transparent 100%)',
            opacity: isVisible ? 0.7 : 0,
            transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
            transition: 'opacity 1s ease-out, transform 1.5s ease-out',
            transitionDelay: '1000ms',
            transformOrigin: 'top',
          }}
        ></div>

        {/* Simple blur spot top right */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"
          style={{
            opacity: isVisible ? 0.15 : 0,
            transition: 'opacity 1.5s ease-out',
            transitionDelay: '300ms',
          }}
        ></div>

        {/* Simple blur spot bottom left */}
        <div
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"
          style={{
            opacity: isVisible ? 0.15 : 0,
            transition: 'opacity 1.5s ease-out',
            transitionDelay: '500ms',
          }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 ">
        {/* Section Header - Clean & Minimal */}
        <div className="mb-1 max-w-3xl ">
          <div
            className="flex items-center space-x-2 mb-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 700ms ease-out',
              transitionDelay: '400ms',
            }}
          ></div>
          <h3
            className="text-4xl md:text-5xl mb-2 font-bold flex gap-3"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '500ms',
            }}
          >
            About <span className="gradient-text">Me</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Content Side - Clean & Minimal */}
          <div
            className="lg:col-span-7 space-y-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '800ms',
            }}
          >
            {/* Main Description - Minimal styling */}
            <div className="space-y-6 relative rounded-lg md:-mt-8">
              <p className="paragraph-text leading-relaxed">
                I'm passionate about exploring the intersection between law and
                technology. I hold a law degree and have always enjoyed writing
                and sharing what I learn. I'm someone who is naturally curious
                and always eager to learn new things, whether it's about law,
                technology, or anything else.
              </p>
            </div>

            {/* Expertise Cards - Simplified */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-white group-hover:text-emerald-300 transition-colors relative leading-tight border-decoration-bottom">
                    Law
                  </h3>
                </div>
                <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                  Corporate M&A, Capital Markets, Crypto Regulatory Compliance
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-white group-hover:text-emerald-300 transition-colors  leading-tight border-decoration-bottom">
                    Technology
                  </h3>
                </div>
                <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                  Web Development, Smart Contracts, Blockchain technologies
                </p>
              </div>
            </div>

            {/* CTA Button - Simplified */}
            <div
              className="pt-4 flex items-center gap-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 700ms ease-out, transform 700ms ease-out',
                transitionDelay: '1300ms',
              }}
            >
              <Link href="/about" className="">
                <GlowingButton variant="small" iconPosition="link">
                  <span className="flex items-center gap-2">More About Me</span>
                </GlowingButton>
              </Link>
            </div>
          </div>

          {/* Image Side - Simplified & Clean */}
          <div
            className="lg:col-span-5 relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '800ms',
            }}
          >
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden border border-neutral-800/50 group-hover:border-emerald-500/20 transition-all duration-500">
                <div className="absolute inset-0">
                  <OptimizedImage
                    src="/images/AL-KINDI.png"
                    alt="Al Kindi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060a0d]/90 via-[#060a0d]/40 to-transparent" />
                </div>

                {/* Profile Card - Simplified */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div
                    className="p-3 rounded-lg bg-neutral-900/80 backdrop-blur-sm border border-neutral-800/40 transform"
                    style={{
                      transform: isVisible
                        ? 'translateY(0)'
                        : 'translateY(20px)',
                      opacity: isVisible ? 0.95 : 0,
                      transition:
                        'opacity 700ms ease-out, transform 700ms ease-out',
                      transitionDelay: '1400ms',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md border border-emerald-800/40 flex items-center justify-center">
                        <HiScale className="w-5 h-5 text-neutral-300" />
                      </div>
                      <div>
                        <h4 className="text-base font-medium ">
                          <AccentNormal>AL KINDI</AccentNormal>
                        </h4>
                        <p className="text-xs text-neutral-300">
                          Law & Technology
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Credential Tag - Simplified */}
              <div
                className="absolute -top-3 -right-3 p-2 rounded-md bg-neutral-900/90 border border-emerald-900/30 shadow-lg transform"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'rotate(2deg)' : 'rotate(10deg)',
                  transition:
                    'opacity 700ms ease-out, transform 700ms ease-out',
                  transitionDelay: '1600ms',
                }}
              >
                {/* <div className="text-center">
                  <div className="text-xs text-emerald-400 font-medium">
                    PRE-QUALIFIED
                  </div>
                  <div className="text-[10px] text-neutral-500">LAWYER</div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
