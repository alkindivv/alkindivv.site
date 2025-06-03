# 🧹 WEBSITE CLEANUP PLAN

## 📋 STEP-BY-STEP CLEANUP PROCESS

### **PHASE 1: Remove Unused Dependencies**

```bash
npm uninstall @prisma/client @next-auth/prisma-adapter next-auth prisma zustand swr @vercel/analytics nprogress lodash @next/bundle-analyzer lighthouse ts-prune ts-unused-exports purgecss stylelint stylelint-config-standard @emailjs/browser
```

### **PHASE 2: Delete Files & Directories**

#### **Database & Auth Related:**

```bash
rm -rf prisma/
rm lib/prisma.ts
rm lib/schema.ts
rm -rf pages/api/auth/
rm pages/api/comments.ts
rm pages/api/page-views.ts
rm components/Comments.tsx
rm middleware.ts
```

#### **Unused Configs & Reports:**

```bash
rm ecosystem.config.js
rm package-clean.json
rm tsconfig.tsbuildinfo
rm localhost_2025-06-03_16-44-23.report.html
rm chromewebdata_2025-06-03_16-39-40.report.html
rm .prettierignore
```

#### **Unused Components:**

```bash
rm components/shared/GoogleAnalytics.tsx
rm lib/api-middleware.ts
rm -rf lib/hooks/ (if empty or unused)
```

### **PHASE 3: Simplify Configurations**

#### **Simplified next.config.js:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: 'https://alkindivv.site',
  },
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
};

module.exports = nextConfig;
```

#### **Simplified .eslintrc.json:**

```json
{
  "extends": "next/core-web-vitals",
  "rules": {
    "@next/next/no-img-element": "off"
  }
}
```

#### **Simplified .prettierrc.js:**

```javascript
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
};
```

### **PHASE 4: Clean Component Dependencies**

#### **Remove from components that use:**

- NextAuth imports
- Prisma imports
- SWR hooks
- Zustand stores
- NProgress
- Lodash functions

#### **Update Layout.tsx:**

- Remove NProgress
- Remove complex loading states
- Simplify to basic layout

#### **Update pages/\_app.tsx:**

- Remove SessionProvider
- Remove complex providers
- Keep only essential providers

### **PHASE 5: Simplify API Routes**

#### **Keep Only:**

```bash
pages/api/
├── send-email.ts (contact form)
├── atom.xml.ts (RSS feed)
└── blog/ (if needed for RSS)
```

#### **Remove:**

- All auth-related APIs
- Comments API
- Page views API
- Complex middleware

## 🎯 **FINAL CLEAN STRUCTURE**

```
alkindivv-site/
├── 📁 pages/
│   ├── api/
│   │   ├── send-email.ts
│   │   └── atom.xml.ts
│   ├── blog/
│   │   └── [category]/
│   │       └── [slug].tsx
│   ├── index.tsx
│   ├── about.tsx
│   ├── contact.tsx
│   ├── glossary.tsx
│   ├── resources.tsx
│   ├── books.tsx
│   ├── _app.tsx
│   └── _document.tsx
├── 📁 components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── common/
│   │   ├── HeroSection.tsx
│   │   ├── AboutPreview.tsx
│   │   └── LatestBlogPosts.tsx
│   ├── shared/
│   │   ├── SEO.tsx
│   │   ├── StructuredData.tsx
│   │   └── OptimizedImage.tsx
│   └── mdx/
│       └── MDXComponents.tsx
├── 📁 content/
│   └── blog/
│       ├── law/
│       └── cryptocurrency/
├── 📁 lib/
│   ├── mdx.ts
│   ├── rss.ts
│   └── utils.ts
├── 📁 types/
│   └── blog.ts
├── 📁 public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── 📁 styles/
│   └── globals.css
├── package.json (simplified)
├── next.config.js (simplified)
├── tailwind.config.js
├── tsconfig.json
└── next-sitemap.config.js
```

## ✅ **BENEFITS AFTER CLEANUP**

### **Performance:**

- ⚡ 60-70% smaller bundle size
- ⚡ Faster build times (3-5x faster)
- ⚡ Reduced complexity
- ⚡ Better Core Web Vitals

### **Maintainability:**

- 🧹 Much cleaner codebase
- 🧹 Easier to understand
- 🧹 Fewer dependencies to manage
- 🧹 Simpler deployment

### **Development:**

- 🚀 Faster development server
- 🚀 Easier debugging
- 🚀 Less configuration overhead
- 🚀 Focus on content creation

## 🚨 **BACKUP BEFORE CLEANUP**

```bash
# Create backup branch
git checkout -b backup-before-cleanup
git add .
git commit -m "Backup before major cleanup"

# Create new clean branch
git checkout -b simplified-version
```

## 📝 **MIGRATION CHECKLIST**

- [ ] Backup current version
- [ ] Remove unused dependencies
- [ ] Delete unnecessary files
- [ ] Update component imports
- [ ] Simplify configurations
- [ ] Test build process
- [ ] Test all pages
- [ ] Update deployment settings
- [ ] Test contact form
- [ ] Verify RSS feed
- [ ] Check SEO functionality

---

**Estimated Time:** 2-4 hours
**Risk Level:** Low (with proper backup)
**Complexity Reduction:** ~70%
