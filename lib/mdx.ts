import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeSlug from 'rehype-slug';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Definisikan interface untuk Post
interface Post {
  publishedAt: string;
  banner: string;
  description: string;
  readingTime: ReturnType<typeof readingTime>;
  views: number;
  category: string;
  slug: string;
  title: string;
  tags: string[];
  excerpt: string;
  featuredImage: string;
  date: string;
  content: string;
}

export async function getPostBySlug(
  category: string,
  slug: string
): Promise<{
  frontMatter: any;
  mdxSource: MDXRemoteSerializeResult;
}> {
  const fullPath = path.join(postsDirectory, category, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: frontMatter, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
      format: 'mdx',
    },
    parseFrontmatter: true,
    scope: frontMatter,
  });
  return {
    frontMatter,
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

          posts.push({
            title: data.title || '',
            slug,
            category,
            content,
            readingTime: readingTime(content),
            views: 0,
            featuredImage: data.featuredImage || '',
            excerpt: data.excerpt || '',
            tags: data.tags || [],
            date: data.date || '',
            publishedAt: data.date || '',
            banner: data.featuredImage || '',
            description: data.description || '',
          } as Post);
        }
      });
    }
  });

  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
