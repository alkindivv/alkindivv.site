import { cache } from 'react';

export const getPostsByCategory = cache(async (category: string) => {
  // existing code...
});

export const getAllPosts = cache(async () => {
  // existing code...
});
