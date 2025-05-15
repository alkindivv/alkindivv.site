import React from 'react';
import GlowingButton from '../shared/GlowingButton';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

const AboutPreview = () => {
  return (
    <section className="py-20 w-full relative overflow-hidden about-preview-section">
      {/* Decorative accent line */}
      <div className="absolute left-0 top-0 h-px w-1/3 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>

      {/* Content container with glass card effect */}
      <div className="relative z-10 border border-neutral-800/50 rounded-2xl overflow-hidden backdrop-blur-sm bg-gradient-to-br from-neutral-900/60 via-neutral-900/40 to-neutral-900/60">
        <div className="flex flex-col gap-8 p-8 md:p-10">
          {/* Header with a floating accent block */}
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-emerald-500/60 rounded-full"></div>
            <h2
              className="text-3xl md:text-4xl font-bold ml-4 tracking-tight"
              data-fade="1"
            >
              About <span className="text-emerald-400">Me</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div
              className="md:col-span-7 lg:col-span-8 space-y-6"
              data-fade="3"
            >
              <p className="text-neutral-200 text-base md:text-lg leading-relaxed">
                Hi, I'm Al Kindi. I'm passionate about creating elegant
                solutions to complex problems through code and design.
              </p>
              <p className="text-neutral-400 text-base leading-relaxed">
                My journey spans across web development, UI/UX design, and legal
                studies, giving me a unique perspective on solving challenges at
                the intersection of technology and society.
              </p>

              {/* Expertise badges */}
              <div className="flex flex-wrap gap-2 pt-3">
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-300">
                  Law
                </span>
                <span className="px-3 py-1 bg-neutral-800/50 border border-neutral-700/50 rounded-full text-xs text-neutral-300">
                  Technology
                </span>
                <span className="px-3 py-1 bg-neutral-800/50 border border-neutral-700/50 rounded-full text-xs text-neutral-300">
                  Design
                </span>
                <span className="px-3 py-1 bg-neutral-800/50 border border-neutral-700/50 rounded-full text-xs text-neutral-300">
                  Web Development
                </span>
              </div>

              <div className="pt-4">
                <Link href="/about">
                  <GlowingButton
                    variant="small"
                    rightIcon={<FiArrowRight className="size-[70%]" />}
                  >
                    More about me
                  </GlowingButton>
                </Link>
              </div>
            </div>

            <div
              className="md:col-span-5 lg:col-span-4 relative h-64 md:h-80"
              data-fade="4"
            >
              {/* Image frame with layered borders */}
              <div className="absolute inset-0 rounded-xl border border-neutral-700/50 -rotate-3 scale-95 opacity-40"></div>
              <div className="absolute inset-0 rounded-xl border border-neutral-700/70 rotate-1 scale-[0.97] opacity-70"></div>

              <div className="relative h-full w-full rounded-xl overflow-hidden border border-neutral-700/90 bg-neutral-900/30 backdrop-blur-sm">
                <div className="absolute inset-0">
                  <Image
                    src="/images/AL-KINDI.png"
                    alt="Al Kindi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                </div>

                {/* Credentials badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">Al Kindi</h4>
                    <p className="text-xs text-neutral-400">
                      Developer & Legal Expert
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-full border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
