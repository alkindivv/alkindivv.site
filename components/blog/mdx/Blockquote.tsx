import React from 'react';
import clsx from 'clsx';

interface BlockquoteProps {
  children: React.ReactNode;
  className?: string;
}

export default function Blockquote({ children, className }: BlockquoteProps) {
  return (
    <blockquote
      className={clsx(
        'border-l-4 border-accent pl-6 italic text-gray-300',
        className
      )}
    >
      {children}
    </blockquote>
  );
}
