import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeSlug from 'rehype-slug';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import { BlogPost, ReadingTimeResult, BlogCategory } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Cache untuk menyimpan reading time
const readingTimeCache = new Map<string, number>();

// Fungsi helper untuk menghitung reading time
function calculateAccurateReadingTime(content: string): number {
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`.*?`/g, '') // Remove inline code
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/[#*_~`]/g, '') // Remove markdown symbols
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  const stats = readingTime(cleanContent);
  return Math.ceil(stats.minutes);
}

// Get all categories with metadata
export function getAllCategories(): BlogCategory[] {
  const categories = fs
    .readdirSync(postsDirectory)
    .filter((file) =>
      fs.statSync(path.join(postsDirectory, file)).isDirectory()
    );

  return categories.map((category) => {
    const categoryPath = path.join(postsDirectory, category);
    const postCount = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith('.mdx')).length;

    return {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      description: `Articles about ${category}`,
      slug: category.toLowerCase(),
      count: postCount,
    };
  });
}

// Get all post slugs for static paths
export function getAllPostSlugs() {
  const categories = fs
    .readdirSync(postsDirectory)
    .filter((file) =>
      fs.statSync(path.join(postsDirectory, file)).isDirectory()
    );

  const paths = categories.flatMap((category) => {
    const categoryPath = path.join(postsDirectory, category);
    const posts = fs
      .readdirSync(categoryPath)
      .filter((filename) => filename.endsWith('.mdx'));

    return posts.map((filename) => ({
      params: {
        category: category.toLowerCase(),
        slug: filename.replace(/\.mdx$/, ''),
      },
    }));
  });

  return paths;
}

// Get a single post by category and slug
export async function getPostBySlug(category: string, slug: string) {
  const fullPath = path.join(postsDirectory, category, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: frontMatter, content } = matter(fileContents);

  const cacheKey = `${category}/${slug}`;
  if (!readingTimeCache.has(cacheKey)) {
    readingTimeCache.set(cacheKey, calculateAccurateReadingTime(content));
  }

  const readingTimeMinutes = readingTimeCache.get(cacheKey)!;

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
    },
    parseFrontmatter: true,
    scope: frontMatter,
  });

  return {
    frontMatter: {
      ...frontMatter,
      readingTime: readingTimeMinutes,
    },
    mdxSource,
  };
}

// Get all posts with optional category filter
export function getAllPosts(category?: string): BlogPost[] {
  const categories = category
    ? [category]
    : fs
        .readdirSync(postsDirectory)
        .filter((file) =>
          fs.statSync(path.join(postsDirectory, file)).isDirectory()
        );

  const posts: BlogPost[] = [];

  categories.forEach((cat) => {
    const categoryPath = path.join(postsDirectory, cat);

    if (fs.statSync(categoryPath).isDirectory()) {
      const files = fs
        .readdirSync(categoryPath)
        .filter((file) => file.endsWith('.mdx'));

      files.forEach((fileName) => {
        const fullPath = path.join(categoryPath, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const slug = fileName.replace(/\.mdx$/, '');

        const cacheKey = `${cat}/${slug}`;
        if (!readingTimeCache.has(cacheKey)) {
          readingTimeCache.set(cacheKey, calculateAccurateReadingTime(content));
        }

        const readingTimeMinutes = readingTimeCache.get(cacheKey)!;

        posts.push({
          title: data.title || '',
          slug,
          category: cat,
          date: data.date || '',
          publishedAt: data.date || '',
          author: data.author || 'AL KINDI',
          description: data.description || '',
          excerpt: data.excerpt || '',
          featuredImage: data.featuredImage || '',
          banner: data.featuredImage || '',
          tags: data.tags || [],
          views: 0,
          readingTime: readingTimeMinutes,
        });
      });
    }
  });

  // Sort posts by date (newest first)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags?.includes(tag));
}

// Get related posts
export function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3
): BlogPost[] {
  const allPosts = getAllPosts();

  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0;

      // Same category
      if (post.category === currentPost.category) score += 5;

      // Matching tags
      const currentTags = new Set(currentPost.tags || []);
      (post.tags || []).forEach((tag) => {
        if (currentTags.has(tag)) score += 2;
      });

      // Recent posts (within 30 days)
      const daysDiff =
        (new Date().getTime() - new Date(post.date).getTime()) /
        (1000 * 60 * 60 * 24);
      if (daysDiff <= 30) score += 1;

      return { ...post, relevanceScore: score };
    })
    .sort((a, b) => (b as any).relevanceScore - (a as any).relevanceScore)
    .slice(0, limit);
}
