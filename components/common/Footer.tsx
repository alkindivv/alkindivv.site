import React from 'react';
import Link from 'next/link';
import SocialMedia from '../social/SocialMedia';
import Accent from '../shared/Accent';
import { FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full py-12 border-t border-neutral-800 mt-auto">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1" data-fade="1">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-xl font-semibold text-white">
                <Accent className="gradient-text">AL KINDI</Accent>
              </Link>
              <p className="text-neutral-400 text-sm">
                Building elegant digital experiences with a focus on clean
                design and performance.
              </p>
            </div>
          </div>

          <div className="md:col-span-1" data-fade="2">
            <h3 className="text-white font-medium text-lg mb-4">Site Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/"
                className="text-neutral-400 hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-neutral-400 hover:text-white transition-colors duration-200"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-neutral-400 hover:text-white transition-colors duration-200"
              >
                Blog
              </Link>
              <Link
                href="/ama"
                className="text-neutral-400 hover:text-white transition-colors duration-200"
              >
                AMA
              </Link>
              <Link
                href="/contact"
                className="text-neutral-400 hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
              <Link
                href="/projects"
                className="text-neutral-400 hover:text-white transition-colors duration-200"
              >
                Projects
              </Link>
            </div>
          </div>

          <div className="md:col-span-1" data-fade="3">
            <h3 className="text-white font-medium text-lg mb-4">Connect</h3>
            <SocialMedia />
          </div>
        </div>

        <div
          className="mt-12 pt-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4"
          data-fade="4"
        >
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Al Kindi. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group p-2 border border-neutral-800 rounded-full hover:border-neutral-600 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
