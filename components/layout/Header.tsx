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
  const pathname = usePathname();

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

  if (isArticlePage) {
    return null;
  }

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
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
        </>
      )}

      <div className="container max-w-6xl mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full ">
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
                            'inline-flex items-center gap-1.5 px-3 py-2 rounded-sm',
                            'text-sm font-medium text-gray-300 hover:text-emerald-400',
                            'transition-colors duration-300 hover:bg-emerald-500/5',
                            'underline-offset-2 hover:underline'
                          )}
                        >
                          More
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
                          <Menu.Items className="absolute right-0 mt-2 w-64 p-2 bg-[#1A1A1A] backdrop-blur-xl rounded-sm shadow-xl shadow-emerald-500/[0.05] focus:outline-none">
                            {item.dropdownItems?.map((dropdownItem) => (
                              <Menu.Item key={dropdownItem.href}>
                                {({ active }) => (
                                  <Link
                                    href={dropdownItem.href}
                                    prefetch={true}
                                    className={clsx(
                                      'group block p-2.5 rounded-md transition-colors border border-neutral-800',
                                      active
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'bg-[#111111]/40 text-gray-400 hover:text-emerald-400'
                                    )}
                                  >
                                    <div className="font-medium text-sm text-gray-200 underline-offset-2 group-hover:underline">
                                      {dropdownItem.label}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {dropdownItem.description}
                                    </div>
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
                    isActive ? 'underline underline-offset-2 ' : 'text-gray-300'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={clsx(
              'relative md:hidden p-2 rounded-sm',
              'transition-colors duration-300',
              'text-gray-400 hover:text-emerald-400',
              'hover:bg-emerald-500/5'
            )}
            aria-label="Toggle menu"
          >
            {/* Hamburger lines */}
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
                      'transition-all duration-300 ',
                      pathname === item.href
                        ? 'text-emerald-400 '
                        : 'text-gray-300 hover:text-emerald-400 '
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
