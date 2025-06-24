'use client';

import { useEffect, useState } from 'react';

interface PreviewTooltipProps {
  href: string;
}

interface MetaResp {
  title?: string;
  description?: string;
  images?: string[];
}

export default function PreviewTooltip({ href }: PreviewTooltipProps) {
  const [data, setData] = useState<MetaResp | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchMeta() {
      try {
        const res = await fetch(
          `https://jsonlink.io/api/extract?url=${encodeURIComponent(href)}`
        );
        const json = (await res.json()) as MetaResp;
        if (!cancelled) setData(json);
      } catch (_) {
        // ignore errors
      }
    }
    fetchMeta();
    return () => {
      cancelled = true;
    };
  }, [href]);

  if (!data) return <span className="text-neutral-400">Loading…</span>;

  return (
    <div className="flex max-w-xs sm:max-w-sm gap-2">
      {data.images && data.images[0] && (
        <img
          src={data.images[0]}
          alt={data.title || ''}
          className="w-16 h-16 object-cover rounded-sm hidden sm:block"
        />
      )}
      <div>
        <p className="font-medium text-neutral-100 line-clamp-1">
          {data.title || href}
        </p>
        {data.description && (
          <p className="text-xs text-neutral-400 line-clamp-2">
            {data.description}
          </p>
        )}
      </div>
    </div>
  );
}
