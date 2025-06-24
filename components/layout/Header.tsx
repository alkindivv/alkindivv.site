'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  HiNewspaper,
  HiUser,
  HiHome,
  HiMail,
  HiBookOpen,
  HiSparkles,
} from 'react-icons/hi';
import { FaChevronDown } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { GoLaw } from 'react-icons/go';
import { Menu, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import clsx from 'clsx';

interface MoreItem {
  href: string;
  label: string;
  description: string;
  icon: IconType;
}

interface NavItem {
  href: string;
  label: string;
  description: string;
  icon: IconType;
}

interface NavItemWithDropdown extends NavItem {
  isDropdown?: boolean;
  dropdownItems?: MoreItem[];
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  // Detect article pages: any path that starts with /blog/ and has at least two
  // additional segments (e.g., /blog/category/slug or deeper)
  const isArticlePage =
    pathname.startsWith('/blog/') &&
    pathname.split('/').filter(Boolean).length >= 3;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Attach scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup on unmount or deps change
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // if (isArticlePage) {
  //   return null;
  // }

  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'Home',
      description: 'Welcome to my forever work-in-progress!',
      icon: HiHome,
    },
    {
      href: '/blog/',
      label: 'Blog',
      description: 'Thoughts & Insights',
      icon: HiNewspaper,
    },
    {
      href: '/about/',
      label: 'About',
      description: 'Learn more about me',
      icon: HiUser,
    },
    {
      href: '/glossary/',
      label: 'Glossary',
      description: 'Legal Glossary',
      icon: GoLaw,
    },
  ];

  const moreItems: MoreItem[] = [
    {
      href: '/books/',
      label: 'Books',
      description: 'My Book Collections',
      icon: HiBookOpen,
    },
    {
      href: '/contact/',
      label: 'Contact',
      description: 'Get in touch with me',
      icon: HiMail,
    },
    {
      href: '/resources/',
      label: 'Resources',
      description: 'Resources and legal templates',
      icon: HiBookOpen,
    },
    {
      href: '/wishlist/',
      label: 'Wishlist',
      description: 'Life Goals',
      icon: HiSparkles,
    },
  ];

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        className={clsx(
          'sticky z-50 block w-full max-w-6xl mx-auto h-14 backdrop-blur-lg transition-all duration-300',
          scrolled
            ? 'top-2 px-6 rounded-lg bg-[#121212]/90 shadow-lg '
            : 'top-2 bg-transparent'
        )}
        animate={{ width: scrolled ? (isDesktop ? '60%' : '100%') : '100%' }}
        // transition={{ type: 'spring', stiffness: 220, damping: 30 }}
        // transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="flex items-center justify-between h-full px-0">
          {/* Logo - Legal styled */}
          <Link
            href="/"
            prefetch={true}
            className="flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors relative "
          >
            <div className="w-8 h-8 flex items-center justify-center text-emerald-400">
              <Image src="/images/logo.png" alt="Logo" width={28} height={28} />
            </div>
          </Link>

          {/* Desktop Navigation - Legal styled */}
          <nav className="hidden md:flex items-center gap-1 ">
            {[
              ...navItems,
              {
                href: '#',
                label: 'More',
                description: 'Additional pages and resources',
                icon: FaChevronDown,
                isDropdown: true,
                dropdownItems: moreItems,
              } as NavItemWithDropdown,
            ].map((item: NavItem | NavItemWithDropdown, _index) => {
              const isActive = pathname === item.href;
              const isMoreDropdown = 'isDropdown' in item && item.isDropdown;

              if (isMoreDropdown) {
                return (
                  <Menu as="div" className="relative" key="more">
                    {({ open }) => (
                      <>
                        <Menu.Button
                          className={clsx(
                            'inline-flex items-center gap-1.5 px-3 py-2 rounded-sm group',
                            'text-sm font-medium text-gray-300 transition-colors',
                            'group-hover:text-emerald-400'
                          )}
                        >
                          <span
                            className={clsx(
                              'underline-offset-2',
                              open
                                ? 'underline text-emerald-400'
                                : 'group-hover:underline'
                            )}
                          >
                            More
                          </span>
                          <FaChevronDown
                            className={clsx(
                              'w-3 h-3 transition-transform',
                              open && 'rotate-180'
                            )}
                          />
                        </Menu.Button>

                        <Transition
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 mt-2 w-[350px] p-4 bg-[#1A1A1A]/90 backdrop-blur-xl rounded-md shadow-xl shadow-emerald-500/[0.05] focus:outline-none grid grid-cols-2 gap-3">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Menu.Item key={dropdownItem.href}>
                                {({ active }) => (
                                  <Link
                                    href={dropdownItem.href}
                                    prefetch={true}
                                    className={clsx(
                                      'relative group flex flex-col gap-1 p-3 rounded-md border border-white/5 overflow-hidden',
                                      active
                                        ? 'bg-emerald-500/10'
                                        : 'bg-[#111111]/40 hover:bg-[#222]',
                                      'transition-colors duration-300'
                                    )}
                                    onMouseMove={(e) => {
                                      const rect =
                                        e.currentTarget.getBoundingClientRect();
                                      e.currentTarget.style.setProperty(
                                        '--x',
                                        `${e.clientX - rect.left}px`
                                      );
                                      e.currentTarget.style.setProperty(
                                        '--y',
                                        `${e.clientY - rect.top}px`
                                      );
                                    }}
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                      style={{
                                        background:
                                          'radial-gradient(400px circle at var(--x) var(--y), rgba(34,211,151,0.15), transparent 40%)',
                                      }}
                                    />
                                    {(() => {
                                      const Icon = dropdownItem.icon;
                                      return (
                                        <Icon className="w-5 h-5 text-emerald-400" />
                                      );
                                    })()}
                                    <span className="font-medium text-sm text-neutral-100">
                                      {dropdownItem.label}
                                    </span>
                                    <span className="text-[11px] text-gray-400 leading-tight">
                                      {dropdownItem.description}
                                    </span>
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={clsx(
                    'relative inline-flex items-center gap-1.5 py-2 mx-3',
                    'text-sm font-medium',
                    'transition-all duration-300',
                    'underline-offset-2 hover:underline',
                    isActive ? 'text-emerald-400' : 'text-gray-300'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 pr-4">
            {/* Search (desktop only) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="hidden md:inline-flex p-2 rounded-sm hover:bg-emerald-500/10 text-gray-300 hover:text-emerald-400 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={clsx(
                'md:hidden p-2 rounded-sm',
                'transition-colors duration-300',
                'text-gray-400 hover:text-emerald-400',
                'hover:bg-emerald-500/5'
              )}
              aria-label="Toggle menu"
            >
              <div className="w-4 h-4 relative flex flex-col justify-between items-center">
                <span
                  className={clsx(
                    'block w-5 h-0.5 bg-current transform transition-all duration-300',
                    isMenuOpen && 'translate-y-[7px] rotate-45'
                  )}
                ></span>
                <span
                  className={clsx(
                    'block w-4 h-0.5 bg-current transition-all duration-300',
                    isMenuOpen && 'opacity-0'
                  )}
                ></span>
                <span
                  className={clsx(
                    'block w-5 h-0.5 bg-current transform transition-all duration-300',
                    isMenuOpen && '-translate-y-[7px] -rotate-45'
                  )}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] w-full max-w-lg mx-4 p-6 rounded-md shadow-xl relative">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-3 right-3 text-neutral-400 hover:text-emerald-400"
              aria-label="Close search"
            >
              ✕
            </button>
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              className="w-full bg-transparent border border-neutral-700 rounded-md px-4 py-3 outline-none focus:border-emerald-500 placeholder:text-neutral-500"
            />
            <p className="mt-4 text-xs text-neutral-500">
              Type your query and press Enter.
            </p>
          </div>
        </div>
      )}

      {/* Mobile Menu - Legal styled */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/90 backdrop-blur-md pt-14 border-t border-neutral-800/50">
          <div className="container mx-auto px-4 py-2">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    'block p-3 rounded-md border border-white/5 bg-[#111111]/40',
                    'transition-colors duration-300',
                    pathname === item.href
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-gray-300 hover:text-emerald-400 hover:bg-[#222]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-neutral-800/50">
              <p className="text-xs text-neutral-500 uppercase font-medium tracking-wider mb-2">
                More
              </p>
              <div className="space-y-1">
                {moreItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    onClick={() => setIsMenuOpen(false)}
                    className={clsx(
                      'block p-3 rounded-md border border-white/5 bg-[#111111]/40',
                      'transition-colors duration-300',
                      pathname === item.href
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-gray-300 hover:text-emerald-400 hover:bg-[#222]'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
