import React, { useEffect, useState, useRef } from 'react';
import GlowingButton from '../shared/GlowingButton';
import Accent from '../shared/Accent';
import Link from 'next/link';
import { HiArrowDown, HiChevronRight } from 'react-icons/hi';
import SocialMedia from '../social/SocialMedia';
import clsx from 'clsx';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Set loaded after a brief delay for smooth animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Handle scroll for parallax effect
    const handleScroll = () => {
      if (window.scrollY <= window.innerHeight) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.querySelector('.about-preview-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen lg:min-h-[90vh] flex items-center pb-16 pt-24 md:pt-32 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[#0a0a0a] opacity-90 z-0" />

      {/* Animated gradient overlay */}
      <div
        className={clsx(
          'absolute inset-0 opacity-0 transition-opacity duration-[2000ms]',
          isLoaded && 'opacity-100'
        )}
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)',
          animation: 'morphGradient 20s ease-in-out infinite alternate',
        }}
      />

      {/* Moving particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Particles layer */}
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={clsx(
                'absolute rounded-full bg-emerald-500/10 opacity-0 transition-opacity',
                isLoaded && 'opacity-100'
              )}
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transitionDelay: `${Math.random() * 2}s`,
                animation: `floatParticle ${Math.random() * 10 + 15}s linear infinite,
                           pulseOpacity ${Math.random() * 4 + 3}s ease-in-out infinite alternate`,
                transform: `translateY(${scrollY * 0.1}px)`,
              }}
            />
          ))}
        </div>

        {/* Abstract shapes */}
        <div
          className={clsx(
            'absolute top-1/4 -right-20 w-[600px] h-[600px] rounded-full opacity-0 transition-all duration-[1500ms]',
            isLoaded && 'opacity-20'
          )}
          style={{
            background:
              'radial-gradient(circle at center, rgba(16, 185, 129, 0.15), transparent 70%)',
            animation: 'morphShape 25s ease-in-out infinite alternate',
            transform: `translateY(${scrollY * 0.08}px)`,
          }}
        />

        <div
          className={clsx(
            'absolute -bottom-32 -left-20 w-[700px] h-[700px] rounded-full opacity-0 transition-all duration-[1500ms]',
            isLoaded && 'opacity-10'
          )}
          style={{
            background:
              'radial-gradient(circle at center, rgba(16, 185, 129, 0.1), transparent 70%)',
            animation: 'morphShape 30s ease-in-out infinite alternate-reverse',
            transform: `translateY(${scrollY * -0.05}px)`,
          }}
        />

        {/* SVG wave shape */}
        <div
          className={clsx(
            'absolute bottom-0 left-0 right-0 h-24 opacity-0 transition-opacity duration-[2000ms]',
            isLoaded && 'opacity-5'
          )}
        >
          <svg
            viewBox="0 0 1440 320"
            className="absolute bottom-0"
            style={{
              filter: 'blur(3px)',
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <path
              fill="rgb(16, 185, 129)"
              fillOpacity="0.3"
              d="M0,192L48,202.7C96,213,192,235,288,224C384,213,480,171,576,149.3C672,128,768,128,864,149.3C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Subtle grid pattern with parallax */}
        <div
          className="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none opacity-[0.03]"
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-r border-neutral-500"></div>
          ))}
        </div>

        {/* Horizontal lines with parallax */}
        <div
          className="absolute inset-0 grid grid-rows-12 gap-4 pointer-events-none opacity-[0.03]"
          style={{
            transform: `translateY(${scrollY * 0.02}px)`,
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-full border-b border-neutral-500"></div>
          ))}
        </div>

        {/* Floating decorative elements */}
        <div
          className={clsx(
            'absolute top-1/3 left-[15%] w-8 h-8 border border-emerald-500/20 rounded-full opacity-0 transition-all duration-700 delay-300',
            isLoaded && 'opacity-40'
          )}
          style={{
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)',
            animation: 'float 6s ease-in-out infinite',
            transform: `translateY(calc(${scrollY * 0.1}px + 0px))`,
          }}
        />

        <div
          className={clsx(
            'absolute bottom-1/4 right-[20%] w-4 h-4 rounded-full opacity-0 transition-all duration-700 delay-500',
            isLoaded && 'opacity-60'
          )}
          style={{
            background: 'rgba(16, 185, 129, 0.3)',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)',
            animation: 'float 8s ease-in-out infinite',
            transform: `translateY(calc(${scrollY * -0.08}px + 0px))`,
          }}
        />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full z-10">
        {/* Left content area */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          {/* Badge */}
          <div
            className={clsx(
              'inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-emerald-500/5 text-emerald-300/90 border border-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)] opacity-0 transform translate-y-4 transition-all duration-500',
              isLoaded && 'opacity-100 translate-y-0'
            )}
            style={{ transitionDelay: '100ms' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="text-xs md:text-sm font-medium">
              Available for opportunities
            </span>
            <HiChevronRight className="w-3.5 h-3.5 text-emerald-400/80 animate-pulse" />
          </div>

          {/* Main headline with animated line */}
          <div className="space-y-3">
            <h1
              className={clsx(
                'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight opacity-0 transform translate-y-6 transition-all duration-700',
                isLoaded && 'opacity-100 translate-y-0'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="flex flex-col sm:block">
                <span>I'm </span>
                <span className="relative">
                  <Accent className="gradient-text animate-text-shimmer font-bold">
                    AL KINDI
                  </Accent>
                  <span
                    className={clsx(
                      'absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-emerald-400 via-emerald-300 to-transparent scale-x-0 transform-gpu origin-left transition-all duration-1000 delay-1000',
                      isLoaded && 'scale-x-100'
                    )}
                    style={{ width: '85%' }}
                  ></span>
                </span>
              </span>
            </h1>

            <div
              className={clsx(
                'h-px w-20 md:w-32 bg-gradient-to-r from-emerald-400 to-transparent opacity-0 transform translate-y-6 transition-all duration-700',
                isLoaded && 'opacity-100 translate-y-0'
              )}
              style={{ transitionDelay: '300ms' }}
            />

            <p
              className={clsx(
                'text-lg md:text-xl text-neutral-300 max-w-2xl opacity-0 transform translate-y-6 transition-all duration-700',
                isLoaded && 'opacity-100 translate-y-0'
              )}
              style={{ transitionDelay: '400ms' }}
            >
              Exploring the fascinating intersection of{' '}
              <span className="relative text-white font-medium">
                corporate law
                <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white/20"></span>
              </span>{' '}
              and{' '}
              <span className="relative text-white font-medium">
                technology
                <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white/20"></span>
              </span>
              , with insights on legal innovations and digital transformations.
            </p>
          </div>

          {/* CTA Buttons with bounce effect */}
          <div
            className={clsx(
              'flex flex-wrap gap-4 opacity-0 transform translate-y-6 transition-all duration-700',
              isLoaded && 'opacity-100 translate-y-0'
            )}
            style={{ transitionDelay: '500ms' }}
          >
            <Link
              href="/blog"
              className="transform-gpu transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <GlowingButton
                variant="default"
                className={isLoaded ? 'animate-subtle-bounce' : ''}
              >
                Explore Blog
              </GlowingButton>
            </Link>
            <Link
              href="/about"
              className="transform-gpu transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <GlowingButton
                variant="small"
                className={isLoaded ? 'animate-subtle-bounce-delayed' : ''}
              >
                About Me
              </GlowingButton>
            </Link>
          </div>

          {/* Social Links */}
          <div
            className={clsx(
              'flex items-center gap-4 opacity-0 transform translate-y-6 transition-all duration-700',
              isLoaded && 'opacity-100 translate-y-0'
            )}
            style={{ transitionDelay: '600ms' }}
          >
            <p className="text-sm md:text-base text-neutral-400">
              Connect with me
            </p>
            <div className="flex items-center gap-4">
              <SocialMedia />
            </div>
          </div>
        </div>

        {/* Right decorative area with enhanced hover effects */}
        <div
          className={clsx(
            'hidden lg:block lg:col-span-5 relative h-full opacity-0 transform translate-x-12 transition-all duration-1000',
            isLoaded && 'opacity-100 translate-x-0'
          )}
          style={{
            transitionDelay: '400ms',
            transform: isLoaded
              ? `translateX(0) translateY(${scrollY * -0.03}px)`
              : 'translateX(48px)',
          }}
        >
          {/* Decorative code block with enhanced hover */}
          <div
            className="absolute top-0 right-0 w-72 h-72 border border-neutral-800/50 rounded-xl overflow-hidden backdrop-blur-sm bg-neutral-900/30 p-5 transform rotate-3 shadow-lg hover:rotate-1 hover:scale-105 transition-all duration-500 hover:shadow-emerald-900/10 hover:shadow-xl"
            style={{
              transform: `rotate(3deg) translateY(${scrollY * -0.05}px)`,
              transition: 'all 0.5s ease-out',
            }}
          >
            <div className="h-3 w-full flex items-center gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-2 bg-emerald-500/20 rounded"></div>
              <div className="w-2/3 h-2 bg-neutral-700/50 rounded"></div>
              <div className="w-5/6 h-2 bg-neutral-700/50 rounded"></div>
              <div className="w-1/2 h-2 bg-emerald-500/20 rounded"></div>
              <div className="w-3/4 h-2 bg-neutral-700/50 rounded"></div>
            </div>
          </div>

          {/* Decorative legal document with enhanced hover */}
          <div
            className="absolute bottom-10 left-0 w-64 h-80 border border-neutral-800/50 rounded-xl overflow-hidden backdrop-blur-sm bg-neutral-900/30 p-5 transform -rotate-6 shadow-lg hover:-rotate-2 hover:scale-105 transition-all duration-500 hover:shadow-emerald-900/10 hover:shadow-xl"
            style={{
              transform: `rotate(-6deg) translateY(${scrollY * -0.08}px)`,
              transition: 'all 0.5s ease-out',
            }}
          >
            <div className="h-3 w-full mb-4 bg-neutral-700/40 rounded"></div>
            <div className="space-y-2">
              <div className="w-full h-2 bg-neutral-700/50 rounded"></div>
              <div className="w-full h-2 bg-neutral-700/50 rounded"></div>
              <div className="w-full h-2 bg-neutral-700/50 rounded"></div>
              <div className="w-2/3 h-2 bg-neutral-700/50 rounded"></div>
              <div className="w-full h-2 bg-neutral-700/50 rounded"></div>
              <div className="w-3/4 h-2 bg-neutral-700/50 rounded"></div>
              <div className="w-full h-2 bg-neutral-700/50 rounded"></div>
              <div className="w-2/3 h-2 bg-neutral-700/50 rounded"></div>
              <div className="w-1/2 h-10 bg-emerald-500/20 rounded mt-6"></div>
            </div>
          </div>

          {/* Central glow with pulse animation */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"
            style={{
              animation: 'pulse 8s ease-in-out infinite alternate',
            }}
          ></div>
        </div>
      </div>

      {/* Scroll down indicator with enhanced animation */}
      <button
        onClick={handleScrollDown}
        className={clsx(
          'absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center opacity-0 transition-all duration-700 delay-1000 text-neutral-500 hover:text-emerald-400',
          isLoaded && 'opacity-100'
        )}
      >
        <span className="text-xs mb-2 tracking-wider">Scroll Down</span>
        <div className="w-6 h-10 rounded-full border border-neutral-600 flex items-center justify-center p-1">
          <div
            className="w-1 h-1 bg-emerald-500 rounded-full"
            style={{ animation: 'scrollIndicator 2s ease-in-out infinite' }}
          ></div>
        </div>
      </button>

      {/* Add custom keyframe animations */}
      <style jsx>{`
        @keyframes morphGradient {
          0% {
            background-position: 0% 0%;
            opacity: 0.1;
          }
          50% {
            background-position: 100% 100%;
            opacity: 0.2;
          }
          100% {
            background-position: 0% 0%;
            opacity: 0.1;
          }
        }

        @keyframes morphShape {
          0% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-60px) translateX(10px);
          }
          100% {
            transform: translateY(-80px) translateX(0);
            opacity: 0;
          }
        }

        @keyframes pulseOpacity {
          0% {
            opacity: 0.1;
          }
          100% {
            opacity: 0.9;
          }
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.1;
          }
        }

        @keyframes scrollIndicator {
          0% {
            transform: translateY(0);
            opacity: 0.8;
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 0;
          }
          100% {
            transform: translateY(6px);
            opacity: 0;
          }
        }

        @keyframes subtle-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-subtle-bounce {
          animation: subtle-bounce 6s ease 1s;
        }

        .animate-subtle-bounce-delayed {
          animation: subtle-bounce 6s ease 1.3s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
