import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeSlug from 'rehype-slug';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/blog');

interface ReadingTimeResult {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

interface Post {
  publishedAt: string;
  banner: string;
  description: string;
  readingTime: number | string | ReadingTimeResult;
  views: number;
  category: string;
  slug: string;
  title: string;
  tags: string[];
  excerpt: string;
  featuredImage: string;
  date: string;
}

// Cache untuk menyimpan reading time
const readingTimeCache = new Map<string, number>();

// Fungsi helper untuk menghitung reading time
function calculateAccurateReadingTime(content: string): number {
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`.*?`/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/[#*_~`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const stats = readingTime(cleanContent);
  return Math.ceil(stats.minutes);
}

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

export function getAllPosts(): Post[] {
  const categories = fs.readdirSync(postsDirectory);
  const posts: Post[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(postsDirectory, category);

    if (fs.statSync(categoryPath).isDirectory()) {
      const files = fs.readdirSync(categoryPath);

      files.forEach((fileName) => {
        if (fileName.endsWith('.mdx')) {
          const fullPath = path.join(categoryPath, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          const slug = fileName.replace(/\.mdx$/, '');

          const cacheKey = `${category}/${slug}`;
          if (!readingTimeCache.has(cacheKey)) {
            readingTimeCache.set(
              cacheKey,
              calculateAccurateReadingTime(content)
            );
          }

          const readingTimeMinutes = readingTimeCache.get(cacheKey)!;

          posts.push({
            title: data.title || '',
            slug,
            category,
            publishedAt: data.date || '',
            banner: data.featuredImage || '',
            description: data.description || '',
            views: 0,
            tags: data.tags || [],
            excerpt: data.excerpt || '',
            featuredImage: data.featuredImage || '',
            date: data.date || '',
            readingTime: readingTimeMinutes,
          });
        }
      });
    }
  });

  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
