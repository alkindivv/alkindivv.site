import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({
  className,
  variant = 'text',
  animation = 'pulse',
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        'bg-gray-800/50',
        {
          'rounded-md': variant === 'text',
          'rounded-2xl': variant === 'rectangular',
          'rounded-full': variant === 'circular',
          'animate-pulse': animation === 'pulse',
          'animate-shimmer': animation === 'wave',
        },
        className
      )}
    />
  );
}

export function ArticleSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
      <div className="space-y-4">
        <Skeleton variant="rectangular" className="w-full h-48" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}

export function GlossarySkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="bg-black/30 rounded-xl border border-gray-800/50 p-4 space-y-2"
        >
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
