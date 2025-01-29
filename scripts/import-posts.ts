import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const CONTENT_PATH = path.join(process.cwd(), 'content/blog');

async function importPosts() {
  try {
    // Get default author (you)
    const defaultAuthor = await prisma.user.findUnique({
      where: { email: 'alkindivv@gmail.com' },
    });

    if (!defaultAuthor) {
      console.error('Default author not found');
      return;
    }

    // Get all categories (directories)
    const categories = fs
      .readdirSync(CONTENT_PATH, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const category of categories) {
      const categoryPath = path.join(CONTENT_PATH, category);
      const files = fs
        .readdirSync(categoryPath)
        .filter((file) => file.endsWith('.mdx'));

      for (const file of files) {
        const filePath = path.join(categoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data: frontMatter, content } = matter(fileContent);

        const slug = file.replace('.mdx', '');

        // Create or update post
        await prisma.post.upsert({
          where: { slug },
          update: {
            title: frontMatter.title,
            excerpt: frontMatter.excerpt,
            category,
            tags: frontMatter.tags || [],
            content,
            publishedAt: frontMatter.date ? new Date(frontMatter.date) : null,
            featured: frontMatter.featured || false,
          },
          create: {
            slug,
            title: frontMatter.title,
            excerpt: frontMatter.excerpt,
            category,
            tags: frontMatter.tags || [],
            content,
            authorId: defaultAuthor.id,
            publishedAt: frontMatter.date ? new Date(frontMatter.date) : null,
            featured: frontMatter.featured || false,
          },
        });

        console.log(`Imported: ${category}/${file}`);
      }
    }

    console.log('Import completed successfully!');
  } catch (error) {
    console.error('Error importing posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

importPosts();
