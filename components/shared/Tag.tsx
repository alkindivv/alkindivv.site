import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import styles from '@/styles/Blog.module.css';

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient';
}

const Tag = ({ children, className = '', variant = 'default' }: TagProps) => {
  return (
    <span
      className={`
        ${styles.tag}
        ${
          variant === 'gradient'
            ? 'bg-gradient-to-r from-[#059669] to-[#34d399] text-white border-transparent'
            : ''
        }
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Tag;
