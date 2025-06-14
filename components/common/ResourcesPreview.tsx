'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiArrowRight,
  FiBookOpen,
  FiDownload,
  FiBox,
  FiFileText,
  FiLayers,
  FiBriefcase,
  FiShield,
} from 'react-icons/fi';
import {
  HiScale,
  HiDocumentText,
  HiClipboardCheck,
  HiDocumentDuplicate,
} from 'react-icons/hi';
import Accent from '../shared/Accent';
import GlowingButton from '../shared/GlowingButton';
import OptimizedImage from '../shared/OptimizedImage';

// Tipe untuk resource item dari props
type ResourcePreview = {
  title: string;
  description: string;
  type: 'document' | 'book' | 'form' | 'link';
  url: string;
};

// Props interface
interface ResourcesPreviewProps {
  resources?: ResourcePreview[];
}

const ResourcesPreview = ({ resources }: ResourcesPreviewProps) => {
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
    const section = document.querySelector('.resources-preview-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Resource items with improved UX and styling
  const resourceItems = [
    {
      title: 'Jurisdictional Resources',
      icon: <HiScale className="w-5 h-5 text-emerald-400" />,
      excerpt:
        'Jurisdictional resources & references, including court forms, legal databases, and procedure guides.',
      variant: 'legal',
    },
    {
      title: 'Legal Templates',
      icon: <HiDocumentDuplicate className="w-5 h-5 text-emerald-400" />,
      excerpt:
        'Collection of legal document templates for corporate & commercial transactions.',
      variant: 'legal',
    },
    {
      title: 'Regulatory Frameworks',
      icon: <HiClipboardCheck className="w-5 h-5 text-emerald-400" />,
      excerpt:
        'Regulatory frameworks and compliance guides for technology companies.',
      variant: 'legal',
    },
    {
      title: 'Research Publications',
      icon: <FiBookOpen className="w-5 h-5 text-emerald-400" />,
      excerpt:
        'Legal research publications, articles and whitepapers on emerging legal issues in technology.',
      variant: 'legal',
    },
  ];

  // Gunakan resources dari props jika diberikan, jika tidak gunakan default
  const itemsToShow = resources || resourceItems;

  return (
    <section className="w-full py-24 relative overflow-hidden resources-preview-section">
      {/* Legal themed decorative background */}
      <div className="absolute inset-0 -z-10">
        {/* Legal texture background */}
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

        {/* Legal decorative elements - columns */}
        <div
          className="absolute left-10 top-1/4 bottom-1/4 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: isVisible ? 0.1 : 0, transitionDelay: '400ms' }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-500/40 transform origin-top scale-y-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
              transitionDelay: '500ms',
            }}
          ></div>
          <div
            className="absolute left-4 top-0 bottom-0 w-[2px] bg-emerald-500/40 transform origin-top scale-y-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
              transitionDelay: '700ms',
            }}
          ></div>
          <div
            className="absolute left-0 top-10 w-6 h-6 border-t-2 border-l-2 border-emerald-500/40 opacity-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: isVisible ? 1 : 0, transitionDelay: '900ms' }}
          ></div>
          <div
            className="absolute left-0 bottom-10 w-6 h-6 border-b-2 border-l-2 border-emerald-500/40 opacity-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: isVisible ? 1 : 0, transitionDelay: '1100ms' }}
          ></div>
        </div>

        {/* Right side decorative columns */}
        <div
          className="absolute right-10 top-1/4 bottom-1/4 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: isVisible ? 0.1 : 0, transitionDelay: '600ms' }}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-[2px] bg-emerald-500/40 transform origin-top scale-y-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
              transitionDelay: '700ms',
            }}
          ></div>
          <div
            className="absolute right-4 top-0 bottom-0 w-[2px] bg-emerald-500/40 transform origin-top scale-y-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
              transitionDelay: '900ms',
            }}
          ></div>
          <div
            className="absolute right-0 top-10 w-6 h-6 border-t-2 border-r-2 border-emerald-500/40 opacity-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: isVisible ? 1 : 0, transitionDelay: '1100ms' }}
          ></div>
          <div
            className="absolute right-0 bottom-10 w-6 h-6 border-b-2 border-r-2 border-emerald-500/40 opacity-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: isVisible ? 1 : 0, transitionDelay: '1300ms' }}
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
            transitionDelay: '800ms',
          }}
        >
          <div className="w-40 h-40 border-t-2 border-l-2 border-emerald-500/40 rounded-tl-md"></div>
        </div>
        <div
          className="absolute bottom-20 right-20 opacity-0 transition-all duration-1500"
          style={{
            opacity: isVisible ? 0.15 : 0,
            transform: isVisible ? 'translate(0, 0)' : 'translate(10px, 10px)',
            transitionDelay: '1000ms',
          }}
        >
          <div className="w-40 h-40 border-b-2 border-r-2 border-emerald-500/40 rounded-br-md"></div>
        </div>

        {/* Legal scale decoration - simplified and animated */}
        <div
          className="absolute top-1/4 right-1/4 opacity-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: isVisible ? 0.1 : 0, transitionDelay: '1200ms' }}
        >
          <div
            className="w-[2px] h-40 bg-emerald-500/40 absolute left-20 top-0 transform origin-top scale-y-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
              transitionDelay: '1300ms',
            }}
          ></div>
          <div
            className="w-40 h-[2px] bg-emerald-500/40 absolute left-0 top-40 transform origin-left scale-x-0 transition-transform duration-1500 ease-out"
            style={{
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '1400ms',
            }}
          ></div>
          <div
            className="w-10 h-10 rounded-full border-2 border-emerald-500/40 absolute left-16 top-36 opacity-0 transition-all duration-1000 ease-in-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.5)',
              transitionDelay: '1500ms',
            }}
          ></div>
          <div
            className="w-10 h-10 rounded-full border-2 border-emerald-500/40 absolute right-0 top-36 opacity-0 transition-all duration-1000 ease-in-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.5)',
              transitionDelay: '1600ms',
            }}
          ></div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header with animation */}
        <div className="mb-12 max-w-3xl">
          <div
            className="flex items-center space-x-2 mb-2"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 700ms ease-out',
              transitionDelay: '400ms',
            }}
          >
            {/* <FiFileText className="text-emerald-400 w-5 h-5" />
            <h2 className="text-sm uppercase tracking-wider text-neutral-400 font-medium">
              Resources
            </h2> */}
          </div>
          <h3
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '500ms',
            }}
          >
            Resources &<span className="gradient-text">Templates</span>
          </h3>
          <p
            className="text-neutral-400 leading-relaxed"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 700ms ease-out, transform 700ms ease-out',
              transitionDelay: '600ms',
            }}
          >
            A curated collection of legal templates, documents, and reference
            materials
          </p>
        </div>

        {/* Resource Cards with animation */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-fade="2"
        >
          {resources
            ? // Jika ada props resources, gunakan itu
              resources.map((resource, index) => (
                <div
                  key={resource.title}
                  className="group relative h-full"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition:
                      'opacity 700ms ease-out, transform 700ms ease-out',
                    transitionDelay: `${800 + index * 150}ms`,
                  }}
                >
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-emerald-900/0 to-emerald-900/0 group-hover:from-emerald-900/10 group-hover:to-emerald-700/10 transition-all duration-300"></div>
                  <div className="relative h-full p-5 rounded-lg bg-[#080b0e]/60 border border-neutral-800/60 hover:border-emerald-900/30 transition-all duration-300 flex flex-col">
                    {/* Legal document corner fold */}
                    <div className="absolute top-0 right-0 w-6 h-6 bg-emerald-900/5 rounded-bl-md">
                      <div className="absolute top-0 right-0 border-t-8 border-r-8 border-t-emerald-900/20 border-r-emerald-900/20 rounded-tr-md"></div>
                    </div>

                    {/* Document header */}
                    <div className="mb-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-md flex items-center justify-center bg-emerald-900/10 border border-emerald-900/20 shadow-sm">
                        {resource.type === 'document' && (
                          <HiDocumentText className="w-5 h-5 text-emerald-400" />
                        )}
                        {resource.type === 'book' && (
                          <FiBookOpen className="w-5 h-5 text-emerald-400" />
                        )}
                        {resource.type === 'form' && (
                          <HiClipboardCheck className="w-5 h-5 text-emerald-400" />
                        )}
                        {resource.type === 'link' && (
                          <FiLayers className="w-5 h-5 text-emerald-400" />
                        )}
                      </div>
                      <h3 className="font-semibold text-base text-white group-hover:text-emerald-300 transition-colors duration-300 flex-1">
                        {resource.title}
                      </h3>
                    </div>

                    {/* Content */}
                    <p className="mb-5 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 flex-grow">
                      {resource.description}
                    </p>

                    {/* Footer with legal document styling */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-800/20">
                      <div className="text-xs text-neutral-500 font-mono">
                        RESOURCES
                      </div>
                      <div className="flex items-center text-emerald-400 text-sm font-medium">
                        <span className="mr-1">View</span>
                        <FiArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : // Jika tidak ada props resources, gunakan default
              resourceItems.map((item, index) => (
                <div
                  key={item.title}
                  className="group relative h-full"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition:
                      'opacity 700ms ease-out, transform 700ms ease-out',
                    transitionDelay: `${800 + index * 150}ms`,
                  }}
                >
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-emerald-900/0 to-emerald-900/0 group-hover:from-emerald-900/10 group-hover:to-emerald-700/10 transition-all duration-300"></div>
                  <div className="relative h-full p-5 rounded-lg bg-[#080b0e]/60 border border-neutral-800/60 hover:border-emerald-900/30 transition-all duration-300 flex flex-col">
                    {/* Legal document corner fold */}
                    <div className="absolute top-0 right-0 w-6 h-6 bg-emerald-900/5 rounded-bl-md">
                      <div className="absolute top-0 right-0 border-t-8 border-r-8 border-t-emerald-900/20 border-r-emerald-900/20 rounded-tr-md"></div>
                    </div>

                    {/* Document header */}
                    <div className="mb-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-md flex items-center justify-center bg-emerald-900/10 border border-emerald-900/20 shadow-sm">
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-base text-white group-hover:text-emerald-300 transition-colors duration-300 flex-1">
                        {item.title}
                      </h3>
                    </div>

                    {/* Content */}
                    <p className="mb-5 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 flex-grow">
                      {item.excerpt}
                    </p>

                    {/* Footer with legal document styling */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-800/20">
                      <div className="text-xs text-neutral-500 font-mono">
                        RESOURCES
                      </div>
                      <div className="flex items-center text-emerald-400 text-sm font-medium">
                        <span className="mr-1">View</span>
                        <FiArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* CTA button with animation */}
        <div
          className="flex justify-center mt-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 700ms ease-out, transform 700ms ease-out',
            transitionDelay: '1600ms',
          }}
        >
          <Link href="/resources">
            <GlowingButton variant="small" iconPosition="link">
              <span className="flex items-center gap-2">
                All Resources Templates
              </span>
            </GlowingButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPreview;
