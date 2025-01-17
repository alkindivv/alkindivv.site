import { BlogPost, BlogCategory } from '@/types/blog';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// Get all categories
export function getAllCategories(): BlogCategory[] {
  const categories = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => fs.statSync(path.join(BLOG_DIR, file)).isDirectory());

  return categories.map((category) => {
    const categoryPath = path.join(BLOG_DIR, category);
    const postCount = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith('.mdx')).length;

    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

    return {
      name: categoryName,
      description: `Articles about ${categoryName.toLowerCase()} by AL KINDI`,
      slug: category.toLowerCase(),
      count: postCount,
    };
  });
}

// Helper function to create SEO-friendly slug
function createSEOSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[&]/g, '-and-') // Replace & with 'and'
    .replace(/[()]/g, '') // Remove parentheses
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .replace(/--+/g, '-'); // Replace multiple hyphens with single hyphen
}

// Get all posts
export async function getAllPosts(): Promise<BlogPost[]> {
  const categories = fs.readdirSync(BLOG_DIR);
  const posts: BlogPost[] = [];

  for (const category of categories) {
    const categoryPath = path.join(BLOG_DIR, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath);
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;

      try {
        const filePath = path.join(categoryPath, file);
        const source = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(source);
        const rawSlug = file.replace(/\.mdx$/, '');

        // Use the file name as the slug to maintain consistency
        const slug = rawSlug;

        // Validate required fields
        if (!data.title) {
          console.warn(`Missing title in ${filePath}`);
          continue;
        }

        if (!data.date) {
          console.warn(`Missing date in ${filePath}`);
          continue;
        }

        // Add dummy views for testing sorting
        const views = Math.floor(Math.random() * 1000);

        // Ensure all required fields are present with fallbacks
        const post: BlogPost = {
          title: data.title,
          date: new Date(data.date).toISOString(),
          author: data.author || 'AL KINDI',
          category: createSEOSlug(data.category || category),
          excerpt: data.excerpt || content.slice(0, 200) + '...',
          description:
            data.description || data.excerpt || content.slice(0, 200) + '...',
          tags: Array.isArray(data.tags) ? data.tags : [],
          featuredImage: data.featuredImage || null,
          slug,
          readingTime: Math.ceil(readingTime(content).minutes),
          views,
        };

        posts.push(post);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
        continue;
      }
    }
  }

  // Sort posts by date in descending order
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.tags?.includes(tag));
}

// Get related posts
export async function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();

  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => ({
      ...post,
      relevanceScore: calculateRelevanceScore(post, currentPost),
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit);
}

// Helper function to calculate post relevance
function calculateRelevanceScore(
  post: BlogPost,
  currentPost: BlogPost
): number {
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

  return score;
}

// Get all post slugs for static paths
export function getAllPostSlugs() {
  const categories = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => fs.statSync(path.join(BLOG_DIR, file)).isDirectory());

  const paths = categories.flatMap((category) => {
    const categoryPath = path.join(BLOG_DIR, category);
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
  try {
    const fullPath = path.join(BLOG_DIR, category, `${slug}.mdx`);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      // Try to find post with old slug
      const posts = await getAllPosts();
      const post = posts.find(
        (p) => createSEOSlug(p.title) === slug || p.slug === slug
      );

      if (post) {
        // Return redirect info if found with different slug
        return {
          redirect: {
            destination: `/blog/${post.category}/${post.slug}`,
            permanent: true,
          },
        };
      }

      throw new Error('Post not found');
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);

    const mdxSource = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: 'one-dark-pro',
              onVisitLine(node: any) {
                if (node.children.length === 0) {
                  node.children = [
                    {
                      type: 'text',
                      value: ' ',
                    },
                  ];
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
      },
      mdxSource,
    };
  } catch (error) {
    console.error(`Error getting post ${category}/${slug}:`, error);
    throw error;
  }
}
