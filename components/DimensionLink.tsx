import React from "react";
import Link from "next/link";

interface DimensionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

const DimensionLink = ({
  href,
  children,
  className = "",
  external = false,
}: DimensionLinkProps) => {
  if (external) {
    return (
      <a
        href={href}
        className={`dimension-link ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`dimension-link ${className}`}>
      {children}
    </Link>
  );
};

export default DimensionLink;
