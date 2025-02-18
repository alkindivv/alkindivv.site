import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import Image from 'next/image'; // Import Image

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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
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
      label: 'Home',
      description: 'Back to homepage',
      icon: HiHome,
    },
    {
      href: '/blog',
      label: 'Blog',
      description: 'Read my articles',
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
      description: 'Legal terms dictionary',
      icon: GoLaw,
    },
  ];

  const moreItems: MoreItem[] = [
    {
      href: '/books',
      label: 'Books',
      description: 'Books I read and recommend',
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
      description: 'Useful resources and tools',
      icon: HiBookOpen,
    },
    {
      href: '/wishlist',
      label: 'Wishlist',
      description: 'My personal goals and wishes',
      icon: HiSparkles,
    },
    {
      href: '/docs',
      label: 'Docs',
      description: 'Documentation and guides',
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
            <div className="flex items-center">
              <a>
                <Image
                  src="/images/logo-5.png" // Ganti dengan path logo kamu
                  alt="Logo"
                  width={30} // Sesuaikan dengan lebar logo
                  height={30} // Sesuaikan dengan tinggi logo
                />
              </a>
            </div>

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
                More
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
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-black/95 backdrop-blur-xl">
            <nav className="container max-w-6xl mx-auto px-4 py-8">
              <div className="space-y-6">
                {/* Main Navigation */}
                <div className="space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={clsx(
                        'block text-lg font-medium text-gray-300 hover:text-emerald-400'
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* More Section */}
                <div className="space-y-3">
                  {moreItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-lg font-medium text-gray-300 hover:text-emerald-400"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
