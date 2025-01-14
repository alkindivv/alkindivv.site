// import React from 'react';
// import { BlogPost } from '@/types/blog';
// import { HiCalendar, HiEye, HiClock } from 'react-icons/hi';
// import useSWR from 'swr';

// interface BlogListItemProps {
//   post: BlogPost;
//   category: string;
// }

// const BlogListItem = ({ post, category }: BlogListItemProps) => {
//   // Menggunakan fetcher yang sama dengan BlogCard
//   const { data: viewsData } = useSWR(
//     `/api/page-views/?slug=${post.slug}`,
//     async (url) => {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error('Failed to fetch views');
//       return res.json();
//     },
//     {
//       refreshInterval: 30000,
//       revalidateOnFocus: false,
//       dedupingInterval: 5000,
//     }
//   );

//   const views = viewsData?.views ?? '–';

//   return (
//     <article className="group relative bg-[#111111] border border-gray-800 hover:border-gray-700 rounded-lg p-5 transition">
//       <div className="flex justify-between items-start">
//         <div className="flex-grow">
//           <div className="flex items-center gap-x-3">
//             <time className="text-sm text-gray-400 flex items-center gap-1">
//               <HiCalendar className="inline" />
//               {new Date(post.date).toLocaleDateString('id-ID', {
//                 month: 'long',
//                 day: 'numeric',
//                 year: 'numeric',
//               })}
//             </time>
//             <span className="text-sm text-gray-400 flex items-center gap-1">
//               <HiClock className="inline" />
//               {post.readingTime} min read
//             </span>
//             <span className="text-sm text-gray-400 flex items-center gap-1">
//               <HiEye className="inline" />
//               {views} views
//             </span>
//           </div>
//           <h2 className="mt-2 text-xl font-semibold text-white group-hover:text-emerald-500 transition">
//             <a href={`/blog/${category}/${post.slug}`}>{post.title}</a>
//           </h2>
//           <p className="mt-2 text-gray-400 line-clamp-2">
//             {post.description || post.excerpt}
//           </p>
//           <div className="mt-4 flex flex-wrap gap-2">
//             {post.tags?.map((tag) => (
//               <span
//                 key={tag}
//                 className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//         {post.featuredImage && (
//           <div className="ml-4 flex-shrink-0">
//             <img
//               src={post.featuredImage}
//               alt={post.title}
//               className="h-24 w-24 object-cover rounded-lg"
//             />
//           </div>
//         )}
//       </div>
//     </article>
//   );
// };

// export default BlogListItem;
