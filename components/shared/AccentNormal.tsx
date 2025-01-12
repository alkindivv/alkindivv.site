import React from 'react';

interface AccentProps {
  children: React.ReactNode;
  className?: string;
}
const AccentNormal = ({ children, className = '' }: AccentProps) => {
  return <span className={`accent-normal ${className}`}>{children}</span>;
};

export default AccentNormal;
