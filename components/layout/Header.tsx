import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
// import { motion } from 'framer-motion';

// import UnstyledLink from '@/components/shared/UnstyledLink';
// import { links } from '@/lib/constants/links';
// import { useTheme } from 'next-themes';
// import Image from 'next/image';
import LanguageSwitcher from '../shared/LanguageSwitcher';
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

// interface NavItemWithDropdown extends NavItem {
//   isDropdown?: boolean;
//   dropdownItems?: MoreItem[];
// }

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  // Check if current page is an article page
  const isArticlePage =
    router.pathname.includes('/blog/') && router.pathname !== '/blog';

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

  // If it's an article page, don't render the header
  if (isArticlePage) {
    return null;
  }

  const navItems: NavItem[] = [
    {
      href: '/',
      label: t('navigation.home'),
      description: t('descriptions.home'),
      icon: HiHome,
    },
    {
      href: '/blog',
      label: t('navigation.blog'),
      description: t('descriptions.blog'),
      icon: HiNewspaper,
    },
    {
      href: '/about',
      label: t('navigation.about'),
      description: t('descriptions.about'),
      icon: HiUser,
    },
    {
      href: '/glossary',
      label: t('navigation.glossary'),
      description: t('descriptions.glossary'),
      icon: GoLaw,
    },
  ];

  const moreItems: MoreItem[] = [
    {
      href: '/books',
      label: t('navigation.books'),
      description: t('descriptions.books'),
      icon: HiBookOpen,
    },
    {
      href: '/contact',
      label: t('navigation.contact'),
      description: t('descriptions.contact'),
      icon: HiMail,
    },
    {
      href: '/resources',
      label: t('navigation.resources'),
      description: t('descriptions.resources'),
      icon: HiBookOpen,
    },
    {
      href: '/wishlist',
      label: t('navigation.wishlist'),
      description: t('descriptions.wishlist'),
      icon: HiSparkles,
    },
    {
      href: '/docs',
      label: t('navigation.docs'),
      description: t('descriptions.docs'),
      icon: HiDocument,
    },
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300 ease-in-out',
        scrolled ? 'h-20 bg-black/10 backdrop-blur-lg' : 'h-20 bg-transparent'
      )}
    >
      <div className="container max-w-6xl mx-auto h-full px-4">
        <div className="flex items-center h-full">
          {/* Left Section: Logo & Navigation */}
          <div className="flex-1 flex items-center gap-8">
            {/* Logo */}
            {/* <Link
              href="/"
              className="text-lg font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              AL
            </Link> */}

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'relative text-sm font-medium transition-all duration-300',
                    'hover:text-emerald-400',
                    router.pathname === item.href
                      ? 'text-emerald-400'
                      : 'text-gray-300'
                  )}
                >
                  {item.label}
                  {router.pathname === item.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-500/20 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section: More Dropdown & Language */}
          <div className="flex items-center gap-6">
            {/* More Dropdown */}
            <div className="hidden md:block relative group">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={clsx(
                  'flex items-center gap-1.5 text-sm font-medium',
                  'text-gray-300 hover:text-emerald-400 transition-colors'
                )}
              >
                {t('navigation.more')}
                <FaChevronDown
                  className={clsx(
                    'w-3 h-3 transition-transform duration-300',
                    isMoreOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Dropdown Menu */}
              <div
                className={clsx(
                  'absolute right-0 mt-2 w-64 p-2',
                  'bg-[#0a0a0a]/95 backdrop-blur-xl rounded-xl',
                  'border border-emerald-500/10',
                  'shadow-xl shadow-emerald-500/[0.05]',
                  'transition-all duration-300 ease-out',
                  'transform opacity-0 invisible translate-y-2 scale-95',
                  'group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100'
                )}
              >
                <div className="space-y-1">
                  {moreItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 p-2.5 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-300"
                    >
                      <div className="w-8 h-8 flex items-center justify-center bg-emerald-500/10 rounded-lg">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-200">
                          {item.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={clsx(
                'md:hidden p-2 rounded-lg',
                'text-gray-400 hover:text-emerald-400 transition-colors',
                'hover:bg-emerald-500/5'
              )}
              aria-label={t('navigation.menu')}
            >
              {isMenuOpen ? (
                <HiX className="w-5 h-5" />
              ) : (
                <HiMenu className="w-5 h-5" />
              )}
            </button>
          </div>
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
            'absolute inset-0 bg-black/90 backdrop-blur-sm',
            'transition-opacity duration-300',
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={clsx(
            'absolute top-20 inset-x-4',
            'bg-[#0a0a0a] rounded-2xl',
            'border border-emerald-500/10',
            'transform transition-all duration-300',
            'shadow-xl shadow-emerald-500/[0.05]',
            isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          )}
        >
          <div className="p-2">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    'flex items-center gap-3 p-3 rounded-xl',
                    'transition-all duration-300',
                    'hover:bg-emerald-500/5',
                    'group',
                    isActive
                      ? 'text-emerald-400 bg-emerald-500/10'
                      : 'text-gray-300 hover:text-emerald-400'
                  )}
                >
                  <div className="w-9 h-9 flex items-center justify-center bg-emerald-500/10 rounded-xl">
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.label}</div>
                    <p className="text-xs text-gray-500 group-hover:text-emerald-400/70">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}

            <div className="h-px bg-emerald-500/10 my-2" />

            {moreItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-300"
              >
                <div className="w-9 h-9 flex items-center justify-center bg-emerald-500/10 rounded-xl">
                  <item.icon className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="font-medium text-sm">{item.label}</div>
                  <p className="text-xs text-gray-500 group-hover:text-emerald-400/70">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
