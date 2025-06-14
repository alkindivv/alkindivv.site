'use client';

import React, { useState, useEffect } from 'react';
import GlowingButton from '../shared/GlowingButton';
import Link from 'next/link';
import {
  FiArrowUpRight,
  FiSend,
  FiMessageCircle,
  FiUser,
  FiCpu,
  FiFileText,
  FiBriefcase,
} from 'react-icons/fi';
import {
  HiScale,
  HiDocumentText,
  HiLibrary,
  HiOutlineDocumentSearch,
} from 'react-icons/hi';

const ChatPreview = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [demoResponse, setDemoResponse] = useState('');
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
    const section = document.querySelector('.chat-preview-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsTyping(true);

    // Simulasi respons typing untuk konsultasi hukum
    let response =
      'Thank you for your question. This is a preview of the AMA feature. If you have any questions, please contact me directly at alkindi@gmail.com';
    let currentChar = 0;

    const typingInterval = setInterval(() => {
      if (currentChar < response.length) {
        setDemoResponse(response.substring(0, currentChar + 1));
        currentChar++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 20); // Kecepatan typing yang realistis

    // Reset pesan setelah interval
    setTimeout(() => {
      setMessage('');
      setDemoResponse('');
    }, 8000);
  };

  return (
    <section className="w-full py-16 relative overflow-hidden chat-preview-section">
      {/* Legal themed background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(16,185,129,0.08) 1px, transparent 1px)',
            backgroundSize: '100% 28px',
            opacity: isVisible ? 0.03 : 0,
            transitionDelay: '300ms',
          }}
        />

        {/* Tech circuit pattern */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-1500 ease-in-out"
          style={{
            opacity: isVisible ? 0.04 : 0,
            transitionDelay: '300ms',
          }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="circuitPattern"
                patternUnits="userSpaceOnUse"
                width="100"
                height="100"
                patternTransform="rotate(45)"
              >
                <path
                  d="M0 0 L50 0 L50 50 L0 50 Z"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="0.5"
                />
                <circle cx="50" cy="50" r="2" fill="#10b981" />
                <circle cx="0" cy="0" r="2" fill="#10b981" />
                <path d="M0 50 L50 50" stroke="#10b981" strokeWidth="0.5" />
                <path d="M50 0 L50 50" stroke="#10b981" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuitPattern)" />
          </svg>
        </div>

        {/* Subtle glow effects */}
        <div
          className="absolute top-20 left-1/4 w-32 h-32 rounded-full bg-emerald-500/5 filter blur-[80px] opacity-0 transition-opacity duration-2000 ease-in-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '800ms',
            animationDuration: '8s',
            animationName: 'pulse',
            animationIterationCount: 'infinite',
            animationDelay: isVisible ? '800ms' : '0ms',
          }}
        />
        <div
          className="absolute bottom-40 right-1/3 w-40 h-40 rounded-full bg-emerald-500/3 filter blur-[100px] opacity-0 transition-opacity duration-2000 ease-in-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '1200ms',
            animationDuration: '10s',
            animationName: 'pulse',
            animationIterationCount: 'infinite',
            animationDelay: isVisible ? '1200ms' : '0ms',
          }}
        />

        {/* Processor lines - top right with animation */}
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-0 pointer-events-none transition-opacity duration-1500 ease-in-out"
          style={{ opacity: isVisible ? 0.2 : 0, transitionDelay: '600ms' }}
        >
          <div
            className="absolute top-20 right-20 w-40 h-1 bg-gradient-to-r from-transparent to-emerald-500/20 transform origin-right scale-x-0 transition-transform duration-1200 ease-out"
            style={{
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '700ms',
            }}
          ></div>
          <div
            className="absolute top-24 right-30 w-20 h-1 bg-gradient-to-r from-transparent to-emerald-500/30 transform origin-right scale-x-0 transition-transform duration-1200 ease-out"
            style={{
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '900ms',
            }}
          ></div>
          <div
            className="absolute top-28 right-40 w-10 h-1 bg-gradient-to-r from-transparent to-emerald-500/40 transform origin-right scale-x-0 transition-transform duration-1200 ease-out"
            style={{
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '1100ms',
            }}
          ></div>
        </div>

        {/* Legal document corner decorations */}
        <div
          className="absolute top-20 left-20 opacity-0 transition-all duration-1500"
          style={{
            opacity: isVisible ? 0.15 : 0,
            transform: isVisible
              ? 'translate(0, 0)'
              : 'translate(-10px, -10px)',
            transitionDelay: '1000ms',
          }}
        >
          <div className="w-40 h-40 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-md"></div>
        </div>
        <div
          className="absolute bottom-20 right-20 opacity-0 transition-all duration-1500"
          style={{
            opacity: isVisible ? 0.15 : 0,
            transform: isVisible ? 'translate(0, 0)' : 'translate(10px, 10px)',
            transitionDelay: '1200ms',
          }}
        >
          <div className="w-40 h-40 border-b-2 border-r-2 border-emerald-500/40 rounded-br-md"></div>
        </div>

        {/* Legal scale decoration - center */}
        <div
          className="absolute top-1/4 right-1/4 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: isVisible ? 0.1 : 0, transitionDelay: '800ms' }}
        >
          <div
            className="w-[2px] h-40 bg-emerald-500/40 absolute left-20 top-0 transform origin-top scale-y-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
              transitionDelay: '900ms',
            }}
          ></div>
          <div
            className="w-40 h-[2px] bg-emerald-500/40 absolute left-0 top-40 transform origin-left scale-x-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '1000ms',
            }}
          ></div>
          <div
            className="w-10 h-10 rounded-full border-2 border-emerald-500/40 absolute left-16 top-36 opacity-0 transition-all duration-1000 ease-in-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.5)',
              transitionDelay: '1100ms',
            }}
          ></div>
          <div
            className="w-10 h-10 rounded-full border-2 border-emerald-500/40 absolute right-0 top-36 opacity-0 transition-all duration-1000 ease-in-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.5)',
              transitionDelay: '1200ms',
            }}
          ></div>
        </div>

        {/* Circuit board traces - animated */}
        <div
          className="absolute top-1/3 left-[5%] opacity-0 transition-opacity duration-1500"
          style={{ opacity: isVisible ? 0.15 : 0, transitionDelay: '900ms' }}
        >
          <div className="w-40 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative">
                <div
                  className="h-[1px] w-full bg-emerald-500/60 transform origin-left scale-x-0 transition-transform duration-1000 ease-out"
                  style={{
                    transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                    width: `${100 - i * 10}%`,
                    transitionDelay: `${1000 + i * 150}ms`,
                  }}
                ></div>
                <div
                  className="absolute right-0 w-2 h-2 rounded-full bg-emerald-500/40 opacity-0 transition-opacity duration-700 ease-in-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${1200 + i * 150}ms`,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Legal Styled */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div
            className="flex items-center space-x-2 mb-2 justify-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 700ms ease-out',
              transitionDelay: '400ms',
            }}
          >
            {/* <HiLibrary className="text-emerald-400 w-5 h-5" />
            <h2 className="text-sm uppercase tracking-wider text-neutral-400 font-medium">
              Qustions
            </h2> */}
          </div>
          <h3
            className="text-3xl md:text-5xl font-bold mb-4 text-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '500ms',
            }}
          >
            Ask <span className="gradient-text">Me Anything</span>
          </h3>
          <p
            className="text-neutral-400 leading-relaxed text-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '600ms',
            }}
          >
            Submit your questions about law, technology, and cryptocurrency.
          </p>
          {/*
          <div
            className="flex items-center mt-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 700ms ease-out',
              transitionDelay: '700ms',
            }}
          >
            <div className="h-px flex-grow bg-neutral-800/50"></div>
            <div className="px-4 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 rounded-sm bg-emerald-900/10">
              PRELIMINARY INQUIRY
            </div>
            <div className="h-px flex-grow bg-neutral-800/50"></div>
          </div> */}
        </div>

        {/* Chat Interface - Legal Consultation Style */}
        <div
          className="relative backdrop-blur-md bg-gradient-to-br from-neutral-900/60 via-neutral-900/40 to-neutral-900/60 border border-emerald-900/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.05)] opacity-0 transform translate-y-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 800ms ease-out, transform 800ms ease-out',
            transitionDelay: '800ms',
          }}
        >
          {/* Decorative header bar - Legal styled */}
          <div className="bg-gradient-to-r from-neutral-900/80 via-neutral-900/60 to-neutral-900/80 border-b border-emerald-900/20 py-3 px-4 flex items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full bg-emerald-500/60 opacity-0 transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: '1200ms',
                }}
              ></div>
              <div className="text-sm font-medium text-emerald-400">
                AMA Portal
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2 text-neutral-500 text-xs">
              <div
                className="w-2 h-2 rounded-full bg-emerald-500/60 opacity-0 transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: '1400ms',
                  animationName: 'pulse',
                  animationDuration: '2s',
                  animationIterationCount: 'infinite',
                  animationDelay: isVisible ? '1400ms' : '0ms',
                }}
              ></div>
              {/* <span>CONFIDENTIAL</span> */}
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Chat Messages Area */}
            <div className="min-h-[200px] mb-6 space-y-4">
              {/* Welcome Message - Legal Styled */}
              <div
                className="flex gap-4 items-start opacity-0 transform translate-y-4"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition:
                    'opacity 700ms ease-out, transform 700ms ease-out',
                  transitionDelay: '1000ms',
                }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600/20 to-emerald-500/30 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <HiScale className="text-emerald-400 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl rounded-tl-md py-3 px-4 border border-emerald-900/20">
                    <div className="text-xs text-emerald-400 mb-1 font-medium">
                      AL KINDI
                    </div>
                    <p className="text-neutral-200 text-sm md:text-base">
                      Welcome to the AMA preview. You may submit questions about
                      law, technology, and cryptocurrency. Please note this is
                      not for formal legal advice.
                    </p>
                  </div>
                  <div className="flex items-center mt-1 ml-4">
                    {/* <div className="text-xs text-neutral-500">
                      Ref: CONS-2025/PRE
                    </div> */}
                    <div className="h-3 w-px bg-neutral-800 mx-2"></div>
                    <div className="text-xs text-neutral-500">Just now</div>
                  </div>
                </div>
              </div>

              {/* Demo Response - Legal Format */}
              {demoResponse && (
                <div className="flex gap-4 items-start animate-slideUp">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600/20 to-emerald-500/30 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    <HiScale className="text-emerald-400 w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl rounded-tl-md py-3 px-4 border border-emerald-900/20">
                      <div className="text-xs text-emerald-400 mb-1 font-medium">
                        AL KINDI
                      </div>
                      <p className="text-neutral-200 text-sm md:text-base">
                        {demoResponse}
                        {isTyping && (
                          <span className="inline-block w-2 h-4 ml-1 bg-emerald-400 animate-pulse rounded-sm"></span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center mt-1 ml-4">
                      {/* <div className="text-xs text-neutral-500">
                        Ref: CONS-2025/PRE
                      </div> */}
                      <div className="h-3 w-px bg-neutral-800 mx-2"></div>
                      <div className="text-xs text-neutral-500">Just now</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && !demoResponse && (
                <div className="flex gap-4 items-start animate-slideUp">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600/20 to-emerald-500/30 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    <HiScale className="text-emerald-400 w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl rounded-tl-md py-3 px-4 border border-emerald-900/20">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form - Legal Styled */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 opacity-0 transform translate-y-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 700ms ease-out, transform 700ms ease-out',
                transitionDelay: '1200ms',
              }}
            >
              <div className="relative group">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-neutral-500 group-focus-within:text-emerald-400 transition-colors">
                    <HiOutlineDocumentSearch className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Type your legal inquiry here..."
                    className="w-full bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl py-4 pl-12 pr-14 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-900/50 focus:border-emerald-500/60 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="absolute right-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <FiSend className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Questions - Legal Styled */}
              <div
                className="flex flex-wrap gap-2 opacity-0 transform translate-y-4"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition:
                    'opacity 700ms ease-out, transform 700ms ease-out',
                  transitionDelay: '1400ms',
                }}
              >
                <span className="text-xs text-neutral-500 mr-2">
                  Common questions:
                </span>
                {[
                  "What's involved in M&A due diligence?",
                  'Crypto regulation status?',
                  'Smart contract legal validity?',
                ].map((question, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setMessage(question)}
                    className="px-3 py-1.5 text-xs text-emerald-300 bg-emerald-900/20 rounded-full border border-emerald-900/30 hover:bg-emerald-900/30 hover:border-emerald-900/40 transition-all duration-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Decorative bottom bar - Legal styled */}
          <div className="bg-gradient-to-r from-neutral-900/80 via-neutral-900/60 to-neutral-900/80 border-t border-emerald-900/20 py-3 px-4 flex justify-between items-center">
            <div className="text-xs text-neutral-500">
              Not for formal legal advice
            </div>
            <div className="text-xs text-emerald-500 font-medium"></div>
          </div>
        </div>

        {/* Call to Action - Legal Styled */}
        <div
          className="flex justify-center mt-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 700ms ease-out, transform 700ms ease-out',
            transitionDelay: '1400ms',
          }}
        >
          <Link href="/contact" className="group">
            <GlowingButton variant="small">
              <span className="flex items-center gap-2">Get in touch</span>
            </GlowingButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChatPreview;
