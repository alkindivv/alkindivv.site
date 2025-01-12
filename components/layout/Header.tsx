import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/styles/Header.module.css';

const Header: React.FC = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'Blog', href: '/blog' },
    { text: 'Contact', href: '/contact' },
    { text: 'About', href: '/about' },
  ];

  const menuVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <div className={styles.desktopNav}>
            {navLinks.map(({ text, href }) => {
              const isActive = router.pathname === href;
              return (
                <div key={text} className={styles.navItemWrapper}>
                  <Link
                    href={href}
                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                  >
                    {text}
                    {isActive && (
                      <motion.div
                        className={styles.activeIndicator}
                        layoutId="activeIndicator"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={styles.menuIconWrapper}>
              <motion.div
                className={styles.menuIcon}
                animate={isMenuOpen ? 'open' : 'closed'}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
                <span
                  className={`${styles.menuLine} ${isMenuOpen ? styles.open : ''}`}
                />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.div
                  className={styles.backdrop}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                />
                <motion.div
                  className={styles.mobileMenu}
                  variants={menuVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className={styles.mobileMenuInner}>
                    {navLinks.map(({ text, href }, i) => {
                      const isActive = router.pathname === href;
                      return (
                        <motion.div
                          key={text}
                          variants={itemVariants}
                          custom={i}
                        >
                          <Link
                            href={href}
                            className={`${styles.mobileMenuItem}  ${isActive ? styles.active : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <motion.div
                              className={styles.menuItemContent}
                              whileHover={{ x: 0 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <span className={styles.menuText}>{text}</span>
                              {isActive && (
                                <motion.span
                                  className={styles.activeIcon}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.2 }}
                                >
                                  •
                                </motion.span>
                              )}
                            </motion.div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
