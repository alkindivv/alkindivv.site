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
      icon: HiHome,
    },
    {
      href: '/blog/',
      label: 'Blog',
      description: 'Thoughts & Insights',
      icon: HiNewspaper,
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
      <header
        className={clsx(
          'fixed top-6 left-1/2 -translate-x-1/2 z-50 h-12 flex items-center justify-between',
          'hidden md:flex px-4 md:px-0 transition-all duration-300',
          scrolled && 'rounded-lg backdrop-blur-lg bg-[#1A1A1A]/90 shadow-lg',
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
                          <Menu.Items className="absolute  -translate-x-1/2 mt-7 ml-10 max-w-[85vw] w-[320px] sm:w-[260px] bg-[#1A1A1A]/95 backdrop-blur-lg border border-white/5 rounded-md shadow-lg focus:outline-none divide-y divide-white/5">
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                              <Link
                                key={dropdownItem.href}
                                href={dropdownItem.href}
                                prefetch={true}
                                className="group flex items-start gap-3 px-4 py-3 transition-colors"
                              >
                                {(() => {
                                  const Icon = dropdownItem.icon;
                                  return (
                                    <Icon className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" />
                                  );
                                })()}
                                <div className="text-sm leading-tight">
                                  <div className="font-medium text-neutral-100  group-hover:underline underline-offset-2">
                                    {dropdownItem.label}
                                  </div>
                                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
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
                    'relative inline-flex items-center gap-1.5 py-2 mx-4',
                    'text-sm md:text-base font-medium',
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
            {/* <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="hidden md:inline-flex p-2 rounded-sm hover:bg-emerald-500/10 text-gray-300 hover:text-emerald-400 transition-colors"
            >
              <Search className="w-4 h-4" />
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
          'bg-[#1A1A1A]/90 border border-white/5',
          'text-neutral-400 text-sm',
          'transition-colors duration-200 hover:bg-[#222] hover:text-emerald-400 z-50'
        )}
        aria-label="Toggle menu"
      >
        <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
        <FaChevronDown
          className={clsx(
            'w-3 h-3 transition-transform',
            isMenuOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Mobile Menu - Legal styled */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/90 backdrop-blur-md pt-24 border-t border-neutral-800/50">
          <div className="container mx-auto px-4 py-2">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    'block p-3 rounded-md border border-white/5 bg-[#111111]/40 text-sm',
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
                      'block p-3 rounded-md border border-white/5 bg-[#111111]/40 text-sm',
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
