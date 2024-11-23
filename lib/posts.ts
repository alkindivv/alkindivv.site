import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

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
      .filter(
        (filename) =>
          (filename.endsWith(".md") || filename.endsWith(".mdx")) &&
          !filename.startsWith(".")
      );

    return posts.map((filename) => ({
      params: {
        category: category.toLowerCase(),
        slug: filename.replace(/\.(md|mdx)$/, ""),
      },
    }));
  });

  return paths;
}

export async function getPostData(category: string, slug: string) {
  const fullPath = path.join(postsDirectory, category, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    slug,
    category,
    contentHtml,
    ...matterResult.data,
  };
}

export function getPostsByCategory(category: string) {
  const categoryPath = path.join(postsDirectory, category);
  const fileNames = fs
    .readdirSync(categoryPath)
    .filter(
      (file) =>
        (file.endsWith(".md") || file.endsWith(".mdx")) && !file.startsWith(".")
    );

  return fileNames.map((fileName) => {
    const fullPath = path.join(categoryPath, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    // Hitung reading time
    const wordCount = matterResult.content.split(/\s+/g).length;
    const readingTime = Math.ceil(wordCount / 200);

    // Format tanggal
    const date = new Date(matterResult.data.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return {
      slug: fileName.replace(/\.(md|mdx)$/, ""),
      category: category.toLowerCase(),
      date: formattedDate,
      readingTime: `${readingTime} min read`,
      title: matterResult.data.title,
      author: matterResult.data.author,
      excerpt: matterResult.data.excerpt,
      tags: matterResult.data.tags,
      featuredImage: matterResult.data.featuredImage,
    };
  });
}

export function getAllCategories() {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) =>
      fs.statSync(path.join(postsDirectory, file)).isDirectory()
    );
}

const cryptocurrencyPostsDirectory = path.join(
  process.cwd(),
  "content/blog/cryptocurrency"
);

export function getCryptocurrencyPosts() {
  const fileNames = fs
    .readdirSync(cryptocurrencyPostsDirectory)
    .filter((file) => file.endsWith(".md") && !file.startsWith("."));
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(cryptocurrencyPostsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as {
        date: string;
        title: string;
        excerpt: string;
      }),
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
