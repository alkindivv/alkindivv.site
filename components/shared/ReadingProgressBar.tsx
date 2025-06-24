'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const percent = total ? (current / total) * 100 : 0;
      setProgress(percent);
    };
    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
