import { BlogPost, BlogCategory } from '@/types/blog';
import path from 'path';
import readingTime from 'reading-time';
import matter from 'gray-matter';
import { promises as FSPromises } from 'fs';
import GithubSlugger from 'github-slugger';

let fs: typeof FSPromises;
if (typeof window === 'undefined') {
  fs = FSPromises;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

const ensureServerSide = () => {
  if (typeof window !== 'undefined') throw new Error('Server only');
  if (!fs) throw new Error('fs unavailable');
};

const log = (msg: string, data?: any) => {
  if (process.env.NODE_ENV === 'production')
    console.log(`[Posts] ${msg}`, data);
};

export async function getAllCategories(): Promise<BlogCategory[]> {
  ensureServerSide();
  try {
    const categories = await fs.readdir(BLOG_DIR);
    const result: BlogCategory[] = [];
    for (const category of categories) {
      const categoryPath = path.join(BLOG_DIR, category);
      const stats = await fs.stat(categoryPath);
      if (!stats.isDirectory()) continue;
      const files = await fs.readdir(categoryPath);
      const count = files.filter((f) => f.endsWith('.mdx')).length;
      result.push({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        slug: category.toLowerCase(),
        count,
        description: `Articles about ${category} by AL KINDI`,
      });
    }
    return result;
  } catch (e) {
    console.error('getAllCategories error', e);
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  ensureServerSide();
  const categories = await fs.readdir(BLOG_DIR);
  const posts: BlogPost[] = [];
  for (const category of categories) {
    const dir = path.join(BLOG_DIR, category);
    const stat = await fs.stat(dir);
    if (!stat.isDirectory()) continue;
    const files = await fs.readdir(dir);
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;
      const source = await fs.readFile(path.join(dir, file), 'utf8');
      const { data, content } = matter(source);
      if (!data.title || !data.date) continue;
      posts.push({
        title: data.title,
        date: new Date(data.date).toISOString(),
        author: data.author || 'AL KINDI',
        category: category.toLowerCase(),
        excerpt: data.excerpt || content.slice(0, 200) + '...',
        description:
          data.description || data.excerpt || content.slice(0, 200) + '...',
        tags: Array.isArray(data.tags) ? data.tags : [],
        featuredImage: data.featuredImage || null,
        slug: file.replace(/\.mdx$/, ''),
        readingTime: Math.ceil(readingTime(content).minutes),
      });
    }
  }
  return posts;
}

export async function getPostBySlug(category: string, slug: string) {
  ensureServerSide();
  const fullPath = path.join(BLOG_DIR, category, `${slug}.mdx`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data: frontMatter, content } = matter(fileContents);
  const slugger = new GithubSlugger();
  const headings: { id: string; title: string; level: number }[] = [];
  const regex = /^(##|###)\s+(.+)$/gm;
  let m;
  while ((m = regex.exec(content))) {
    const level = m[1] === '##' ? 2 : 3;
    headings.push({ id: slugger.slug(m[2].trim()), title: m[2].trim(), level });
  }
  return {
    frontMatter: {
      ...frontMatter,
      readingTime: Math.ceil(readingTime(content).minutes),
      slug,
    },
    headings,
  };
}

export async function getAllPostSlugs() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ params: { category: p.category, slug: p.slug } }));
}

export async function getAllTags(): Promise<string[]> {
  ensureServerSide();
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) =>
      tagSet.add(encodeURIComponent(tag.toLowerCase()))
    );
  });
  return Array.from(tagSet);
}
