import React from 'react';

interface AccentProps {
  children: React.ReactNode;
  className?: string;
}
const Accent = ({ children, className = '' }: AccentProps) => {
  return <span className={`accent-text ${className}`}>{children}</span>;
};

export default Accent;
