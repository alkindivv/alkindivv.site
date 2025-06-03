import React from 'react';
import Link from 'next/link';
import {
  FiArrowRight,
  FiBook,
  FiFileText,
  FiLink,
  FiDatabase,
} from 'react-icons/fi';
import GlowingButton from '../shared/GlowingButton';
import { IconType } from 'react-icons';

type ResourceIcon = 'book' | 'file' | 'link' | 'database';

type Resource = {
  title: string;
  description: string;
  icon: ResourceIcon;
  url: string;
};

interface ResourcesPreviewProps {
  resources: Resource[];
}

const ResourcesPreview = ({ resources = [] }: ResourcesPreviewProps) => {
  // Icon mapping
  const iconMap: Record<ResourceIcon, IconType> = {
    book: FiBook,
    file: FiFileText,
    link: FiLink,
    database: FiDatabase,
  };

  // Fallback resources jika tidak ada data
  const previewResources =
    resources.length > 0
      ? resources.slice(0, 6)
      : [
          {
            title: 'Legal Templates',
            description:
              'Essential legal document templates for various corporate needs.',
            icon: 'file' as ResourceIcon,
            url: '/resources#templates',
          },
          {
            title: 'Book Recommendations',
            description: 'Curated list of books on corporate law and fintech.',
            icon: 'book' as ResourceIcon,
            url: '/books',
          },
          {
            title: 'Research Publications',
            description:
              'Latest research papers and publications on legal tech.',
            icon: 'database' as ResourceIcon,
            url: '/resources#research',
          },
          {
            title: 'Learning Resources',
            description:
              'Courses, webinars, and learning materials on various legal topics.',
            icon: 'link' as ResourceIcon,
            url: '/resources#learning',
          },
        ];

  return (
    <section className="py-16 w-full bg-neutral-950/50">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2
            className="text-2xl md:text-3xl font-semibold text-white/90"
            data-fade="1"
          >
            Resources
          </h2>
          <div
            className="h-px max-w-[120px] w-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-transparent"
            data-fade="2"
          />
          <p className="text-neutral-400 text-sm md:text-base" data-fade="3">
            Helpful materials and resources for legal professionals
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          data-fade="4"
        >
          {previewResources.map((resource, _index) => {
            const Icon = iconMap[resource.icon];
            return (
              <Link key={resource.title} href={resource.url} className="group">
                <div className="h-full p-4 border border-neutral-800 hover:border-neutral-700 bg-neutral-900/30 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] flex flex-col">
                  <div className="mb-3 size-10 rounded-lg bg-emerald-900/20 border border-emerald-900/30 flex items-center justify-center text-emerald-500 group-hover:text-emerald-400 transition-colors duration-300">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-medium text-white mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-3 flex-grow">
                    {resource.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-center mt-8" data-fade="5">
          <Link href="/resources">
            <GlowingButton
              variant="small"
              rightIcon={<FiArrowRight className="size-[70%]" />}
            >
              Browse all resources
            </GlowingButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPreview;
