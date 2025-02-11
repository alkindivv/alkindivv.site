import { BlogPost, BlogCategory } from '@/types/blog';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import path from 'path';
import readingTime from 'reading-time';
import matter from 'gray-matter';
import { promises as FSPromises } from 'fs';

// Import fs dengan tipe yang benar
let fs: typeof FSPromises;
if (typeof window === 'undefined') {
  fs = FSPromises;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// Helper function to ensure server-side execution
const ensureServerSide = () => {
  if (typeof window !== 'undefined') {
    throw new Error('This function can only be called on the server side');
  }
  if (!fs) {
    throw new Error('fs module is not available');
  }
};

// Get all categories
export async function getAllCategories(): Promise<BlogCategory[]> {
  ensureServerSide();
  const categories = await fs!.readdir(BLOG_DIR);
  const validCategories = [];

  for (const category of categories) {
    const stats = await fs!.stat(path.join(BLOG_DIR, category));
    if (stats.isDirectory()) {
      const categoryPath = path.join(BLOG_DIR, category);
      const files = await fs!.readdir(categoryPath);
      const postCount = files.filter((file) => file.endsWith('.mdx')).length;
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

      validCategories.push({
        name: categoryName,
        description: `Articles about ${categoryName.toLowerCase()} by AL KINDI`,
        slug: category.toLowerCase(),
        count: postCount,
      });
    }
  }

  return validCategories;
}

// Get all posts
export async function getAllPosts(): Promise<BlogPost[]> {
  ensureServerSide();
  const categories = await fs!.readdir(BLOG_DIR);
  const posts = [];

  for (const category of categories) {
    const categoryPath = path.join(BLOG_DIR, category);
    const stats = await fs!.stat(categoryPath);
    if (!stats.isDirectory()) continue;

    const files = await fs!.readdir(categoryPath);
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;

      const filePath = path.join(categoryPath, file);
      const source = await fs!.readFile(filePath, 'utf8');
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

// Get a single post by category and slug
export async function getPostBySlug(category: string, slug: string) {
  ensureServerSide();
  const fullPath = path.join(BLOG_DIR, category, `${slug}.mdx`);

  try {
    const fileContents = await fs!.readFile(fullPath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode as any,
            {
              theme: 'one-dark-pro',
              onVisitLine(node: any) {
                if (node.children.length === 0) {
                  node.children = [{ type: 'text', value: ' ' }];
                }
              },
              onVisitHighlightedLine(node: any) {
                node.properties.className.push('highlighted');
              },
              onVisitHighlightedWord(node: any) {
                node.properties.className = ['word'];
              },
            },
          ],
        ],
      },
      parseFrontmatter: true,
      scope: frontMatter,
    });

    return {
      frontMatter: {
        ...frontMatter,
        readingTime: Math.ceil(readingTime(content).minutes),
        slug,
      },
      mdxSource,
    };
  } catch (error) {
    throw new Error('Post not found');
  }
}

// Get all post slugs for static paths
export async function getAllPostSlugs() {
  ensureServerSide();
  const posts = await getAllPosts();
  return posts.map((post) => ({
    params: {
      category: post.category.toLowerCase(),
      slug: post.slug,
    },
  }));
}
