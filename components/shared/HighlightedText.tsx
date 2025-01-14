import React from 'react';

interface HighlightedTextProps {
  text: string;
  searchQuery: string;
  className?: string;
}

export default function HighlightedText({
  text,
  searchQuery,
  className = '',
}: HighlightedTextProps) {
  if (!searchQuery.trim()) {
    return <span className={className}>{text}</span>;
  }

  const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.toLowerCase() === searchQuery.toLowerCase() ? (
          <span key={i} className="bg-emerald-500/20 text-emerald-400">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}
