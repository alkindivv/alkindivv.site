import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HiNewspaper,
  HiUser,
  HiHome,
  HiMail,
  HiMenu,
  HiX,
  HiChevronRight,
} from 'react-icons/hi';
import { IoDocumentText } from 'react-icons/io5';
import { VscProject } from 'react-icons/vsc';
import { BsListCheck } from 'react-icons/bs';
import clsx from 'clsx';
import Accent from '@/components/shared/Accent';

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('main');

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHasScrolled(currentScrollY > 0);

      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > 50) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    {
      href: '/',
      icon: HiHome,
      label: 'Home',
      description: 'Welcome to my forever work-in-progress!',
      gradient: 'from-emerald-600 to-emerald-400',
    },
    {
      href: '/blog/',
      icon: HiNewspaper,
      label: 'Blog',
      description: 'Thoughts, mental models, and tutorials',
      gradient: 'from-emerald-500 to-emerald-300',
    },
    {
      href: '/about/',
      icon: VscProject,
      label: 'About',
      description: 'Showcase of my projects',
      gradient: 'from-emerald-500 to-emerald-300',
    },
    {
      href: '/contact/',
      icon: IoDocumentText,
      label: 'Contact',
      description: 'Personal notes of snippets',
      gradient: 'from-emerald-500 to-emerald-300',
    },
    {
      href: '/about',
      icon: HiUser,
      label: 'About',
      description: 'Learn more about me!',
      gradient: 'from-emerald-500 to-emerald-300',
    },
    {
      href: '/uses',
      icon: HiMail,
      label: 'Uses',
      description: 'A peek into my digital workspace',
      gradient: 'from-emerald-500 to-emerald-300',
    },
    {
      href: '/bucket-list',
      icon: BsListCheck,
      label: 'Bucket List',
      description: 'Things to do at least once in my life',
      gradient: 'from-emerald-500 to-emerald-300',
    },
  ];

  return (
    <header
      className={clsx(
        'fixed left-0 right-0 top-0 z-50',
        'transition-all duration-500 ease-in-out',
        !isVisible && '-translate-y-24',
        'flex items-center justify-center'
      )}
    >
      {/* Desktop Navigation */}
      <nav
        className={clsx(
          'h-14 my-4 rounded-2xl hidden md:block',
          'backdrop-blur-xl',
          'bg-[#111111]/90',
          'border border-gray-800/20',
          'transition-all duration-500 ease-in-out',
          hasScrolled && [
            'shadow-lg shadow-black/10',
            'border-emerald-500/20',
            'bg-[#111111]',
          ],
          'w-fit px-6',
          'relative overflow-hidden'
        )}
      >
        <div className="h-full relative">
          <ul className="h-full flex items-center justify-center gap-5">
            {navItems.slice(0, 4).map((item) => {
              const isActive =
                item.href === '/'
                  ? router.pathname === '/'
                  : router.pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      'relative flex items-center justify-center gap-1.5',
                      'px-2 py-1.5 rounded-xl',
                      'text-[0.925rem] font-medium',
                      'transition-all duration-300 ease-out',
                      'hover:bg-emerald-500/5',
                      'group',
                      isActive
                        ? 'text-emerald-400'
                        : 'text-gray-400 hover:text-emerald-400'
                    )}
                  >
                    <div className="relative">
                      <item.icon
                        className={clsx(
                          'w-[1.1rem] h-[1.1rem]',
                          'transition-transform duration-300',
                          'group-hover:scale-110',
                          isActive && [
                            'text-emerald-400',
                            'drop-shadow-[0_0_6px_rgba(52,211,153,0.4)]',
                          ]
                        )}
                      />
                      {isActive && (
                        <div
                          className={clsx(
                            'absolute -bottom-[0.15rem] left-1/2 w-1 h-1',
                            'bg-emerald-400',
                            'rounded-full transform -translate-x-1/2',
                            'transition-all duration-300',
                            'animate-pulse'
                          )}
                        />
                      )}
                    </div>
                    <span
                      className={clsx(
                        'transition-all duration-300',
                        'relative',
                        isActive
                          ? 'text-emerald-400 font-semibold'
                          : 'text-gray-400 group-hover:text-emerald-400'
                      )}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className={clsx(
                            'absolute -bottom-0.5 left-0 w-full h-[0.1rem]',
                            'bg-gradient-to-r from-emerald-500/50 via-emerald-400/50 to-emerald-500/50',
                            'rounded-full transform scale-x-0 group-hover:scale-x-100',
                            'transition-transform duration-300',
                            'origin-left'
                          )}
                        />
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={clsx(
            'flex items-center justify-center w-11 h-11',
            'rounded-xl',
            'bg-[#111111]/90 backdrop-blur-xl',
            'border border-gray-800/20',
            'transition-all duration-300',
            'hover:scale-105',
            'hover:shadow-lg hover:shadow-emerald-500/10',
            'active:scale-95',
            'group',
            isMobileMenuOpen && ['bg-[#111111]', 'border-emerald-500/20']
          )}
        >
          <div className="relative w-6 h-6">
            {/* Hamburger Icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
              {/* Top line */}
              <span
                className={clsx(
                  'h-[0.1rem] rounded-full',
                  'transform transition-all duration-300 ease-in-out',
                  'bg-gradient-to-r from-gray-400 via-emerald-400 to-gray-400',
                  'group-hover:from-emerald-400 group-hover:via-emerald-300 group-hover:to-emerald-400',
                  isMobileMenuOpen ? 'w-0 rotate-[360deg] translate-y-2' : 'w-5'
                )}
              />
              {/* Middle line */}
              <span
                className={clsx(
                  'h-[0.1rem] rounded-full',
                  'transform transition-all duration-300 ease-in-out',
                  'bg-gradient-to-r from-gray-400 via-emerald-400 to-gray-400',
                  'group-hover:from-emerald-400 group-hover:via-emerald-300 group-hover:to-emerald-400',
                  isMobileMenuOpen ? 'w-0' : 'w-4'
                )}
              />
              {/* Bottom line */}
              <span
                className={clsx(
                  'h-[0.1rem] rounded-full',
                  'transform transition-all duration-300 ease-in-out',
                  'bg-gradient-to-r from-gray-400 via-emerald-400 to-gray-400',
                  'group-hover:from-emerald-400 group-hover:via-emerald-300 group-hover:to-emerald-400',
                  isMobileMenuOpen
                    ? 'w-0 -rotate-[360deg] -translate-y-2'
                    : 'w-5'
                )}
              />
            </div>
            {/* Close Icon */}
            <div
              className={clsx(
                'absolute inset-0 flex items-center justify-center',
                'transition-opacity duration-300',
                isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
              )}
            >
              <HiX
                className={clsx(
                  'w-6 h-6',
                  'text-emerald-400',
                  'transform transition-all duration-300',
                  'group-hover:scale-110',
                  'group-hover:rotate-90'
                )}
              />
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          'fixed inset-0 md:hidden z-40',
          'transition-all duration-700 ease-in-out',
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Backdrop with blur animation */}
        <div
          className={clsx(
            'absolute inset-0 bg-[#111111]/95',
            'transition-all duration-700 ease-in-out',
            isMobileMenuOpen ? 'backdrop-blur-xl' : 'backdrop-blur-none'
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Content */}
        <div
          className={clsx(
            'absolute right-4 top-20 w-72 rounded-2xl',
            'bg-[#111111]/95 backdrop-blur-xl',
            'transition-all duration-700 ease-in-out',
            'flex flex-col overflow-hidden',
            'border border-gray-800/20',
            'max-h-[80vh]',
            isMobileMenuOpen
              ? 'scale-100 translate-y-0 opacity-100'
              : 'scale-95 translate-y-4 opacity-0',
            'origin-top-right',
            'shadow-lg shadow-black/20'
          )}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-800/20">
            <h2 className="text-base font-bold text-gray-200">
              Navigation <Accent>Menu</Accent>
            </h2>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-2 bg-[#111111]/80">
            <nav className="space-y-1">
              {navItems.map((item, index) => {
                const isActive =
                  item.href === '/'
                    ? router.pathname === '/'
                    : router.pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      'group flex items-center gap-3 p-2 rounded-lg',
                      'transition-all duration-300',
                      'relative overflow-hidden',
                      isActive
                        ? 'bg-gray-800/50 text-gray-200'
                        : 'hover:bg-gray-800/30 text-gray-400',
                      'transform transition-transform',
                      isMobileMenuOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-4 opacity-0',
                      'transition-all duration-300',
                      'delay-[' + index * 50 + 'ms]'
                    )}
                  >
                    {/* Background Gradient */}
                    <div
                      className={clsx(
                        'absolute inset-0 opacity-0 transition-opacity duration-300',
                        'bg-gradient-to-r from-gray-800 to-gray-700',
                        isActive ? 'opacity-10' : 'group-hover:opacity-5'
                      )}
                    />

                    {/* Icon Container */}
                    <div
                      className={clsx(
                        'relative flex items-center justify-center',
                        'w-9 h-9 rounded-lg',
                        'transition-all duration-300',
                        isActive
                          ? 'bg-gray-800/50 text-gray-200'
                          : 'bg-gray-900/50 text-gray-400',
                        'group-hover:scale-110',
                        'group-hover:text-gray-200'
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">{item.label}</div>
                        <HiChevronRight
                          className={clsx(
                            'w-4 h-4 transition-transform duration-300',
                            'text-gray-600 group-hover:text-gray-400',
                            'opacity-0 group-hover:opacity-100',
                            'translate-x-2 group-hover:translate-x-0'
                          )}
                        />
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1 group-hover:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-2 border-t border-gray-800/20 bg-[#111111]/80">
            <div className="text-xs text-center text-gray-500">
              Press{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-[#111111] text-[10px] border border-gray-800">
                Esc
              </kbd>{' '}
              to close
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
