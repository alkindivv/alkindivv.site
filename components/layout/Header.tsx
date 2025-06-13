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
  HiMenu,
  HiX,
  HiBookOpen,
  HiSparkles,
  HiDocument,
  HiScale,
} from 'react-icons/hi';
import clsx from 'clsx';
import { FaChevronDown } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { GoLaw } from 'react-icons/go';

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
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (isMoreOpen) {
        setIsMoreOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen, isMoreOpen]);

  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'Home',
      description: 'Welcome to my forever work-in-progress!',
      icon: HiHome,
    },
    {
      href: '/blog',
      label: 'Blog',
      description: 'Thoughts, mental models, and tutorials',
      icon: HiNewspaper,
    },
    {
      href: '/about',
      label: 'About',
      description: 'Learn more about me',
      icon: HiUser,
    },
    {
      href: '/glossary',
      label: 'Glossary',
      description: 'Legal Glossary',
      icon: GoLaw,
    },
  ];

  const moreItems: MoreItem[] = [
    {
      href: '/books',
      label: 'Books',
      description: 'My Book Collections',
      icon: HiBookOpen,
    },
    {
      href: '/contact',
      label: 'Contact',
      description: 'Get in touch with me',
      icon: HiMail,
    },
    {
      href: '/resources',
      label: 'Resources',
      description: 'Resources and templates',
      icon: HiBookOpen,
    },
    {
      href: '/wishlist',
      label: 'Wishlist',
      description: 'Life Goals & Aspirations',
      icon: HiSparkles,
    },
    {
      href: '/docs',
      label: 'Docs',
      description: 'Tutorials & Guides',
      icon: HiDocument,
    },
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300 ease-in-out',
        scrolled ? 'h-20 bg-black/80 backdrop-blur-lg ' : 'h-20 bg-transparent'
      )}
    >
      {/* Legal document corner decorations - only visible when scrolled */}
      {scrolled && (
        <>
          {/* <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-emerald-500/30"></div> */}
          {/* <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-emerald-500/30"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-emerald-500/30"></div> */}

          {/* Top header line - legal document style */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
        </>
      )}

      {/* <div className="container max-w-6xl mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors relative"
          >
            <div className="w-8 h-8 flex items-center justify-center text-emerald-400">
              <GoLaw className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-neutral-500 font-mono">
                LAW & TECHNOLOGY
              </span>
            </div>
          </Link> */}

      <div className="container max-w-6xl mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full">
          {/* Logo - Legal styled */}
          <Link
            href="/"
            prefetch={true}
            className="flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors relative"
          >
            <div className="w-8 h-8 flex items-center justify-center text-emerald-400">
              <Image src="/images/logo.png" alt="Logo" width={28} height={28} />
            </div>
            {/* <div className="flex flex-col">
              <span className="text-[10px] text-neutral-500 font-sans">
                LAW & TECHNOLOGY
              </span>
            </div> */}
          </Link>

          {/* Desktop Navigation - Legal styled */}
          <nav className="hidden md:flex items-center gap-1">
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
                  <div key="more" className="relative group">
                    <button
                      onClick={() => setIsMoreOpen(!isMoreOpen)}
                      className={clsx(
                        'relative inline-flex items-center gap-1.5 px-3 py-2 rounded-sm',
                        'text-sm font-medium',
                        'transition-all duration-300',
                        'hover:bg-emerald-500/5 border border-transparent',
                        'text-gray-300 hover:text-emerald-400 hover:border-emerald-500/20'
                      )}
                    >
                      More
                      <FaChevronDown
                        className={clsx(
                          'w-3 h-3 transition-transform duration-300',
                          isMoreOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    {/* Dropdown Menu - Legal styled */}
                    <div
                      className={clsx(
                        'absolute right-0 mt-2 w-64 p-2',
                        'bg-[#0a0a0a]/95 backdrop-blur-xl rounded-sm',
                        'border border-neutral-800/70',
                        'shadow-xl shadow-emerald-500/[0.05]',
                        'transition-all duration-300',
                        'opacity-0 invisible translate-y-2',
                        'group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                      )}
                    >
                      {/* Legal document styling */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
                      {/* <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-emerald-500/30"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-emerald-500/30"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-emerald-500/30"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-emerald-500/30"></div> */}

                      <div className="space-y-1">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            prefetch={true}
                            className="flex items-center gap-3 p-2.5 rounded-sm text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-300 border border-transparent hover:border-emerald-500/20"
                          >
                            <div className="w-8 h-8 flex items-center justify-center bg-emerald-500/10 rounded-sm">
                              <dropdownItem.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-medium text-sm text-gray-200">
                                {dropdownItem.label}
                              </div>
                              <div className="text-xs text-gray-500">
                                {dropdownItem.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Document footer */}
                      <div className="mt-4 pt-2 border-t border-neutral-800/30 text-center">
                        <div className="text-[10px] text-neutral-500 font-mono">
                          MENU-{new Date().getFullYear()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  className={clsx(
                    'relative inline-flex items-center gap-1.5 px-3 py-2 rounded-sm',
                    'text-sm font-medium',
                    'transition-all duration-300 border',
                    'hover:bg-emerald-500/5',
                    isActive
                      ? 'text-emerald-400 border-transparent '
                      : 'text-gray-300 hover:text-emerald-400 border-transparent hover:border-emerald-500/20'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button - Legal styled */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={clsx(
              'md:hidden p-2 rounded-sm',
              'transition-all duration-300',
              'text-gray-400 hover:text-emerald-400 border border-transparent',
              'hover:bg-emerald-500/5 hover:border-emerald-500/20'
            )}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <HiX className="w-5 h-5" />
            ) : (
              <HiMenu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Legal styled */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/90 border-t border-neutral-800/50 backdrop-blur-md">
          <div className="container mx-auto px-4 py-2">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    'block px-3 py-2 rounded-sm',
                    'transition-all duration-300',
                    pathname === item.href
                      ? 'text-emerald-400 bg-emerald-500/5'
                      : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/5'
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
                      'block px-3 py-2 rounded-sm',
                      'transition-all duration-300',
                      pathname === item.href
                        ? 'text-emerald-400 bg-emerald-500/5'
                        : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/5'
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
    </header>
  );
}
