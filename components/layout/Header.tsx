import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HiNewspaper,
  HiUser,
  HiHome,
  HiMail,
  HiMenu,
  HiX,
} from 'react-icons/hi';
import clsx from 'clsx';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Check if current page is an article page
  const isArticlePage =
    router.pathname.includes('/blog/') && router.pathname !== '/blog';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // If it's an article page, don't render the header
  if (isArticlePage) {
    return null;
  }

  const navItems = [
    {
      href: '/',
      icon: HiHome,
      label: 'Home',
      description: 'Welcome to my forever work-in-progress!',
    },
    {
      href: '/blog',
      icon: HiNewspaper,
      label: 'Blog',
      description: 'Thoughts, mental models, and tutorials',
    },
    {
      href: '/about',
      icon: HiUser,
      label: 'About',
      description: 'Learn more about me',
    },
    {
      href: '/contact',
      icon: HiMail,
      label: 'Contact',
      description: 'Get in touch with me',
    },
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50',
        'bg-[#0a0a0a]',
        'transition-all duration-300 ease-in-out',
        scrolled
          ? 'h-14 shadow-lg shadow-black/10 border-b border-gray-700/50'
          : 'h-16 bg-transparent'
      )}
    >
      <div
        className={clsx(
          'max-w-[1200px] mx-auto md:pr-8 pr-2',
          'transition-all duration-300',
          scrolled ? 'py-2' : 'py-4'
        )}
      >
        <div className="flex items-center justify-end h-full">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'relative px-4 py-2 rounded-lg',
                    'text-sm font-medium',
                    'transition-all duration-200',
                    'flex items-center space-x-2',
                    'hover:scale-105',
                    'group',
                    isActive
                      ? 'text-emerald-400 '
                      : 'text-gray-300 hover:text-emerald-400'
                  )}
                >
                  <item.icon
                    className={clsx(
                      'w-4 h-4',
                      'transition-transform duration-200',
                      'group-hover:scale-110 group-hover:rotate-3'
                    )}
                  />
                  <span className="relative">
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={clsx(
              'md:hidden p-2 rounded-lg ml-4',
              'transition-all duration-200',
              'text-gray-300 hover:text-emerald-400',
              'hover:bg-emerald-400/5',
              'hover:scale-105 active:scale-95',
              'focus:outline-none focus:ring-2 focus:ring-emerald-400/20'
            )}
            aria-label="Toggle menu"
          >
            <div
              className={clsx(
                'transition-transform duration-300',
                isMenuOpen && 'rotate-180'
              )}
            >
              {isMenuOpen ? (
                <HiX className="w-5 h-5" />
              ) : (
                <HiMenu className="w-5 h-5" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          'fixed inset-0 md:hidden z-40',
          'transition-all duration-300',
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div
          className={clsx(
            'absolute inset-0 bg-black/80 backdrop-blur-sm',
            'transition-opacity duration-300',
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={clsx(
            'absolute top-16 inset-x-4',
            'bg-[#0a0a0a] rounded-lg',
            'border border-gray-800',
            'transform transition-all duration-300',
            'shadow-xl shadow-black/20',
            isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          )}
        >
          <div className="p-3">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    'flex items-center space-x-3 p-3 rounded-lg',
                    'transition-all duration-200',
                    'hover:translate-x-1',
                    'group',
                    isActive
                      ? 'bg-emerald-400/5 text-emerald-400'
                      : 'text-gray-300 hover:bg-emerald-400/5 hover:text-emerald-400'
                  )}
                >
                  <item.icon
                    className={clsx(
                      'w-5 h-5',
                      'transition-transform duration-200',
                      'group-hover:scale-110 group-hover:rotate-3'
                    )}
                  />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <p className="text-xs text-gray-500 group-hover:text-emerald-400/70">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
