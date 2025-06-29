# AL KINDI - Personal Website

A modern, performant personal website and blog built with Next.js, focusing on law, technology, and cryptocurrency topics.

## 🚀 Features

- **Modern Blog Platform** - MDX-based blog with categories, tags, and search functionality
- **Static Site Generation (SSG)** - Leveraging Next.js for optimal performance
- **Responsive Design** - Mobile-first approach with elegant UI/UX
- **SEO Optimized** - Comprehensive metadata and OpenGraph support
- **Legal & Tech Content** - Articles on corporate law, capital markets, cryptocurrency, and more
- **Performance Focused** - Optimized images, lazy loading, and incremental static regeneration

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom components
- **Content**: [MDX](https://mdxjs.com/) for rich content authoring
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Typography**: Custom font implementation with optimized loading
- **Deployment**: Vercel/Netlify (recommended)

## 📁 Project Structure

```
alkind.id/
├── app/               # App directory for Next.js App Router
│   ├── atom.xml/      # RSS feed implementation
│   ├── feed.xml/      # Alternative feed format
│   └── fonts/         # Font optimization
├── components/        # React components
│   ├── blog/          # Blog-specific components
│   │   └── mdx/       # MDX rendering components
│   ├── common/        # Shared UI components
│   ├── layout/        # Layout components
│   ├── shared/        # Utility components
│   └── social/        # Social media integration
├── content/           # Blog content in MDX format
│   └── blog/          # Organized by categories
│       ├── cryptocurrency/
│       └── law/
├── lib/               # Utility functions and helpers
│   ├── hooks/         # Custom React hooks
│   ├── stores/        # State management
│   └── utils/         # Helper functions
├── pages/             # Next.js pages
│   ├── api/           # API routes
│   └── blog/          # Blog routes with dynamic paths
│       └── [category]/# Category-based blog structure
├── public/            # Static assets
│   ├── fonts/         # Font files
│   ├── icons/         # Site icons
│   ├── images/        # Image assets
│   └── resources/     # Downloadable resources
├── styles/            # Global styles and CSS modules
└── types/             # TypeScript type definitions
```

## 📝 Blog Implementation

The blog is implemented using Next.js Static Site Generation with MDX:

- **Content Organization**: Blog posts are organized by categories in the `content/blog/` directory
- **Dynamic Routing**: Uses Next.js dynamic routes (`[category]` and `[slug]`)
- **Static Generation**: All pages are pre-rendered at build time with `getStaticProps` and `getStaticPaths`
- **Incremental Static Regeneration**: Content refreshes periodically with `revalidate: 3600`
- **MDX Processing**: Custom components for rich content presentation

## 🔍 SEO Optimization

The site includes robust SEO features:

- Custom `PowerfulSEO` component for consistent metadata
- OpenGraph tags for social media sharing
- Structured metadata for articles (author, publish date, etc.)
- Optimized image loading with priority for critical content
- Customizable meta descriptions and titles per page

## 🚀 Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/alkind.id.git
   cd alkind.id
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Create an `.env.local` file based on `.env.example`

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Creating Blog Content

1. Add a new MDX file to the appropriate category folder in `content/blog/`
2. Include frontmatter with required fields:

   ```md
   ---
   title: 'Your Article Title'
   date: '2023-05-15'
   author: 'AL KINDI'
   category: 'law'
   excerpt: 'A brief description of your article'
   tags: ['corporate law', 'contracts']
   featuredImage: '/images/your-image.jpg'
   ---

   Your content here...
   ```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

AL KINDI - [@alkindivv](https://twitter.com/alkindivv) - alkindivv@gmail.com

Project Link: [https://github.com/yourusername/alkind.id](https://github.com/yourusername/alkind.id)
