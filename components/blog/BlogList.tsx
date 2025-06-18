'use client';

import React, { useState, useEffect } from 'react';

import { BlogPost, BlogCategory } from '@/types/blog';
import { HiOutlineSearch, HiOutlineFilter, HiOutlineX } from 'react-icons/hi';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogList({ posts, categories }: BlogListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Filter posts based on search term and selected category
    const filtered = posts.filter((post) => {
      const matchesSearch =
        searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false) ||
        (post.tags &&
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ));

      const matchesCategory =
        !selectedCategory || post.category === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, posts]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiOutlineSearch className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            className="block w-full pl-10 pr-3 py-2 border border-neutral-700 rounded-lg bg-neutral-900/50 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              <HiOutlineX className="h-5 w-5 text-neutral-400 hover:text-white" />
            </button>
          )}
        </div>

        <div className="md:w-auto">
          <button
            className="flex items-center justify-center w-full md:w-auto px-4 py-2 border border-neutral-700 rounded-lg bg-neutral-900/50 text-white hover:bg-neutral-800 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <HiOutlineFilter className="h-5 w-5 mr-2" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Category Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-6 animate-fadeIn">
          <button
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedCategory === null
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedCategory === category.slug
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
              onClick={() => setSelectedCategory(category.slug)}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-neutral-400 mb-6">
        Showing {filteredPosts.length} of {posts.length} articles
      </div>

      {/* Blog Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={`${post.category}-${post.slug}`} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-neutral-300 mb-2">
            No articles found
          </h3>
          <p className="text-neutral-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
