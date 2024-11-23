const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const [category, slug] = args;

if (!category || !slug) {
  console.error("Usage: node create-article.js <category> <slug>");
  process.exit(1);
}

const template = fs.readFileSync(
  path.join(__dirname, "../content/blog/template.md"),
  "utf8"
);

const date = new Date().toISOString().split("T")[0];
const newArticle = template
  .replace(
    "Judul Artikel",
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  )
  .replace("YYYY-MM-DD", date)
  .replace("Kategori", category);

const articlePath = path.join(
  __dirname,
  `../content/blog/${category}/${slug}.md`
);

fs.writeFileSync(articlePath, newArticle);

console.log(`Article created at ${articlePath}`);
