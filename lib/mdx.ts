// import { BlogPost, BlogCategory } from '@/types/blog';
// import path from 'path';
// import readingTime from 'reading-time';
// import matter from 'gray-matter';
// import { promises as FSPromises } from 'fs';
// import GithubSlugger from 'github-slugger';

// // Import fs dengan tipe yang benar
// let fs: typeof FSPromises;
// if (typeof window === 'undefined') {
//   fs = FSPromises;
// }
// //
// const BLOG_DIR = path.join(process.cwd(), 'content/blog');

// // Helper function to ensure server-side execution
// const ensureServerSide = () => {
//   if (typeof window !== 'undefined') {
//     throw new Error('This function can only be called on the server side');
//   }
//   if (!fs) {
//     throw new Error('fs module is not available');
//   }
// };

// // Helper untuk logging di production
// const logInProduction = (message: string, data?: any) => {
//   if (process.env.NODE_ENV === 'production') {
//     console.log(`[MDX] ${message}`);
//     if (data) {
//       console.log(`[MDX] Data:`, data);
//     }
//   }
// };

// // Get all categories
// export async function getAllCategories(): Promise<BlogCategory[]> {
//   ensureServerSide();
//   logInProduction('Getting all categories');
//   try {
//     const categories = await fs!.readdir(BLOG_DIR);
//     logInProduction(`Found ${categories.length} potential categories`);
//     const validCategories = [];

//     for (const category of categories) {
//       const categoryPath = path.join(BLOG_DIR, category);
//       const stats = await fs!.stat(categoryPath);
//       if (stats.isDirectory()) {
//         try {
//           const files = await fs!.readdir(categoryPath);
//           const postCount = files.filter((file) =>
//             file.endsWith('.mdx')
//           ).length;
//           const categoryName =
//             category.charAt(0).toUpperCase() + category.slice(1);

//           validCategories.push({
//             name: categoryName,
//             description: `Articles about ${categoryName.toLowerCase()} by AL KINDI`,
//             slug: category.toLowerCase(),
//             count: postCount,
//           });
//         } catch (error) {
//           console.error(`Error processing category ${category}:`, error);
//           // Continue processing other categories
//         }
//       }
//     }

//     logInProduction(`Returning ${validCategories.length} valid categories`);
//     return validCategories;
//   } catch (error) {
//     console.error('Error in getAllCategories:', error);
//     return [];
//   }
// }

// // Get all posts
// export async function getAllPosts(): Promise<BlogPost[]> {
//   ensureServerSide();
//   logInProduction('Getting all posts');
//   try {
//     const categories = await fs!.readdir(BLOG_DIR);
//     logInProduction(`Found ${categories.length} categories folders`);
//     const posts = [];

//     for (const category of categories) {
//       const categoryPath = path.join(BLOG_DIR, category);
//       try {
//         const stats = await fs!.stat(categoryPath);
//         if (!stats.isDirectory()) continue;

//         const files = await fs!.readdir(categoryPath);
//         for (const file of files) {
//           if (!file.endsWith('.mdx')) continue;

//           try {
//             const filePath = path.join(categoryPath, file);
//             const source = await fs!.readFile(filePath, 'utf8');
//             const { data, content } = matter(source);

//             if (!data.title || !data.date) continue;

//             posts.push({
//               title: data.title,
//               date: new Date(data.date).toISOString(),
//               author: data.author || 'AL KINDI',
//               category: category.toLowerCase(),
//               excerpt: data.excerpt || content.slice(0, 200) + '...',
//               description:
//                 data.description ||
//                 data.excerpt ||
//                 content.slice(0, 200) + '...',
//               tags: Array.isArray(data.tags) ? data.tags : [],
//               featuredImage: data.featuredImage || null,
//               slug: file.replace(/\.mdx$/, ''),
//               readingTime: Math.ceil(readingTime(content).minutes),
//             });
//           } catch (error) {
//             console.error(`Error processing file ${file}:`, error);
//             // Continue processing other files
//           }
//         }
//       } catch (error) {
//         console.error(`Error processing category ${category}:`, error);
//         // Continue processing other categories
//       }
//     }

//     logInProduction(`Returning ${posts.length} total posts`);
//     return posts;
//   } catch (error) {
//     console.error('Error in getAllPosts:', error);
//     return [];
//   }
// }

// // Get a single post by category and slug
// export async function getPostBySlug(category: string, slug: string) {
//   ensureServerSide();
//   logInProduction(`Getting post by slug: ${category}/${slug}`);
//   const fullPath = path.join(BLOG_DIR, category, `${slug}.mdx`);

//   try {
//     const fileContents = await fs!.readFile(fullPath, 'utf8');
//     const { data: frontMatter, content } = matter(fileContents);

//     // Extract headings (## or ###) for TOC
//     const slugger = new GithubSlugger();
//     const headingRegex = /^(##|###)\s+(.+)$/gm;
//     const headings: Array<{ id: string; title: string; level: number }> = [];
//     let match;
//     while ((match = headingRegex.exec(content)) !== null) {
//       const level = match[1] === '##' ? 2 : 3;
//       const raw = match[2].trim();
//       const id = slugger.slug(raw);
//       headings.push({ id, title: raw, level });
//     }

//     logInProduction(`Successfully processed post: ${category}/${slug}`);
//     return {
//       frontMatter: {
//         ...frontMatter,
//         readingTime: Math.ceil(readingTime(content).minutes),
//         slug,
//       },
//       headings,
//     };
//   } catch (error) {
//     console.error(`Error in getPostBySlug for ${category}/${slug}:`, error);
//     throw new Error('Post not found');
//   }
// }

// // Get all post slugs for static paths
// export async function getAllPostSlugs() {
//   ensureServerSide();
//   logInProduction('Getting all post slugs for static paths');
//   try {
//     const posts = await getAllPosts();
//     logInProduction(`Generated ${posts.length} static paths`);
//     return posts.map((post) => ({
//       params: {
//         category: post.category.toLowerCase(),
//         slug: post.slug,
//       },
//     }));
//   } catch (error) {
//     console.error('Error in getAllPostSlugs:', error);
//     return [];
//   }
// }
