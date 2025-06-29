'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';

// Import modern icons - optimized and elegant
import {
  HomeIcon,
  BookIcon,
  UserIcon,
  BalanceScaleIcon,
  EmailIcon,
  GridIcon,
  StarIcon,
  ChevronDownIcon,
  SearchIcon,
  LawBookIcon,
} from '@/components/icons';

interface MoreItem {
  href: string;
  label: string;
  description: string;
  icon: React.FC<{ className?: string; strokeWidth?: number; color?: string }>;
}

interface NavItem {
  href: string;
  label: string;
  description: string;
  icon: React.FC<{ className?: string; strokeWidth?: number; color?: string }>;
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

  // Detect article pages: any path that starts with /blog/ and has at least two
  // additional segments (e.g., /blog/category/slug or deeper)
  const isArticlePage =
    pathname.startsWith('/blog/') &&
    pathname.split('/').filter(Boolean).length >= 3;

  // Header stays visible in mobile to allow closing menu

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

  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'Home',
      description: 'Welcome to my forever work-in-progress!',
      icon: HomeIcon,
    },
    {
      href: '/blog/',
      label: 'Blog',
      description: 'Thoughts & Insights',
      icon: BookIcon,
    },
    // {
    //   href: '/projects/',
    //   label: 'Projects',
    //   description: 'Personal & OSS works',
    //   icon: HiSparkles,
    // },

    {
      href: '/about/',
      label: 'About',
      description: 'Learn more about me',
      icon: UserIcon,
    },
    {
      href: '/glossary/',
      label: 'Glossary',
      description: 'Legal Glossary',
      icon: BalanceScaleIcon,
    },
  ];

  const moreItems: MoreItem[] = [
    {
      href: '/books/',
      label: 'Books',
      description: 'My Book Collections',
      icon: BookIcon,
    },
    {
      href: '/contact/',
      label: 'Contact',
      description: 'Get in touch with me',
      icon: EmailIcon,
    },
    {
      href: '/resources/',
      label: 'Resources',
      description: 'Resources and legal templates',
      icon: LawBookIcon,
    },
    {
      href: '/wishlist/',
      label: 'Wishlist',
      description: 'Life Goals',
      icon: StarIcon,
    },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header
        role="banner"
        aria-label="Main navigation"
        className={clsx(
          'fixed top-6 left-1/2 -translate-x-1/2 z-50 h-12 flex items-center justify-between',
          'hidden md:flex px-4 md:px-0 transition-all duration-300',
          scrolled && 'rounded-lg backdrop-blur-sm bg-[#1A1A1A]/90 shadow-lg',
          scrolled && 'sm:w-[460px]',
          !scrolled && 'sm:w-full'
        )}
      >
        <div className="flex items-center justify-between h-full w-full">
          {/* Logo - Legal styled */}
          <Link
            href="/"
            prefetch={true}
            className="flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors relative "
          >
            {/* <div className="w-8 h-8 flex items-center justify-center text-emerald-400">
              <Image src="/images/logo.png" alt="Logo" width={28} height={28} />
            </div> */}
          </Link>

          {/* Desktop Navigation - Legal styled */}
          <nav
            className="hidden md:flex items-center gap-1 "
            aria-label="Primary navigation"
          >
            {[
              ...navItems,
              {
                href: '#',
                label: 'More',
                description: 'Additional pages and resources',
                icon: ChevronDownIcon,
                isDropdown: true,
                dropdownItems: moreItems,
              } as NavItemWithDropdown,
            ].map((item: NavItem | NavItemWithDropdown, _index) => {
              const isActive = pathname === item.href;
              const isMoreDropdown = 'isDropdown' in item && item.isDropdown;

              if (isMoreDropdown) {
                return (
                  <Menu
                    as="div"
                    className="relative flex items-center pl-4 ml-2 border-l border-gray-700/60"
                    key="more"
                  >
                    {({ open }) => (
                      <>
                        <Menu.Button
                          className={clsx(
                            'inline-flex items-center gap-1.5 pl-3  py-2 rounded-sm group',
                            'text-sm md:text-base font-medium text-neutral-500 transition-colors',
                            ''
                          )}
                        >
                          <span
                            className={clsx(
                              'underline-offset-2',
                              open ? ' ' : 'group-hover:underline'
                            )}
                          >
                            More
                          </span>
                          <ChevronDownIcon
                            className={clsx(
                              'w-3 h-3 transition-transform duration-200',
                              open && 'rotate-180'
                            )}
                            strokeWidth={2}
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
                          <Menu.Items className="absolute -translate-x-1/2 mt-7 ml-10 max-w-[85vw] w-[320px] sm:w-[260px] bg-gradient-to-b from-[#1A1A1A]/95 to-[#111111]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl focus:outline-none divide-y divide-white/5 overflow-hidden">
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                              <Link
                                key={dropdownItem.href}
                                href={dropdownItem.href}
                                prefetch={true}
                                className="group flex items-start gap-3 px-4 py-3 transition-all duration-200 hover:bg-white/5 hover:backdrop-blur-sm relative overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <dropdownItem.icon
                                  className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0 transition-transform duration-200 hover:scale-110"
                                  strokeWidth={1.5}
                                />
                                <div className="text-sm leading-tight relative z-10">
                                  <div className="font-semibold text-neutral-100 group-hover:text-emerald-300 transition-colors duration-200">
                                    {dropdownItem.label}
                                  </div>
                                  <p className="text-xs text-neutral-400 group-hover:text-neutral-300 mt-0.5 line-clamp-2 transition-colors duration-200">
                                    {dropdownItem.description}
                                  </p>
                                </div>
                              </Link>
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
                    'relative inline-flex items-center gap-1.5 py-2 mx-4 group',
                    'text-sm md:text-base font-medium',
                    'transition-all duration-300',
                    'hover:scale-105',
                    isActive
                      ? 'text-emerald-400'
                      : 'text-gray-300 hover:text-emerald-300'
                  )}
                >
                  <span
                    className={clsx(
                      'relative',
                      'before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5',
                      'before:bg-gradient-to-r before:from-emerald-400 before:to-emerald-300',
                      'before:transition-all before:duration-300',
                      'group-hover:before:w-full',
                      isActive && 'before:w-full'
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 pr-4">
            {/* <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="hidden md:inline-flex p-2 rounded-sm hover:bg-emerald-500/10 text-gray-300 hover:text-emerald-400 transition-colors"
            >
              <PremiumSearchIcon className="w-4 h-4" strokeWidth={1.5} />
            </button> */}

            {/* Menu button handled outside for mobile */}
          </div>
        </div>
      </header>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={clsx(
          'fixed top-6 right-4 md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg mt-8',
          'bg-gradient-to-br from-[#1A1A1A]/90 to-[#111111]/90 border border-white/10 backdrop-blur-sm',
          'text-neutral-400 text-sm font-medium shadow-lg',
          'transition-all duration-200 hover:bg-gradient-to-br hover:from-[#222]/90 hover:to-[#1A1A1A]/90 z-50',
          ''
        )}
        aria-label="Toggle menu"
      >
        <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
        <ChevronDownIcon
          className={clsx(
            'w-3 h-3 transition-transform duration-200',
            isMenuOpen && 'rotate-180'
          )}
          strokeWidth={2}
        />
      </button>

      {/* Mobile Menu - Legal styled */}
      {isMenuOpen && (
        <nav
          className="fixed inset-0 z-40 md:hidden bg-gradient-to-b from-black/90 via-black/85 to-black/90 backdrop-blur-xl pt-24 border-t border-neutral-800/50"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto px-4 py-2">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    'block p-4 rounded-lg border text-sm',
                    'transition-all duration-300 group relative overflow-hidden',
                    pathname === item.href
                      ? 'text-emerald-400 border-neutral-800 '
                      : 'text-gray-300 bg-[#0a0a0a]/80 border border-white/5 hover:text-emerald-400 hover:bg-gradient-to-r hover:from-[#222]/60 hover:to-[#1A1A1A]/60 hover:border-emerald-500/20'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#1A1A1A]/70 border border-white/5">
                      <item.icon
                        className="w-4 h-4 text-neutral-400 transition-all duration-200 group-hover:scale-110 "
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="font-medium">{item.label}</span>
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
                      'block p-4 rounded-lg border text-sm',
                      'transition-all duration-300 group relative overflow-hidden',
                      pathname === item.href
                        ? 'text-emerald-400 border-neutral-800 '
                        : 'text-gray-300 bg-[#0a0a0a]/80 border border-white/5 hover:text-emerald-400 hover:bg-gradient-to-r hover:from-[#222]/60 hover:to-[#1A1A1A]/60 hover:border-emerald-500/20'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#1A1A1A]/70 border border-neutral-800/50">
                        <item.icon
                          className="w-4 h-4 text-neutral-400 transition-all duration-200 group-hover:scale-110"
                          strokeWidth={1.5}
                        />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
