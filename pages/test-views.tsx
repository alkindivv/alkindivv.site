import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TestViews() {
  const { data, error } = useSWR('/api/page-views?slug=test-post', fetcher);

  useEffect(() => {
    // Increment view count on page load
    fetch('/api/page-views?slug=test-post', {
      method: 'POST',
    });
  }, []);

  if (error) return <div>Failed to load views</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Test Views</h1>
      <p>Views: {data.views}</p>
    </div>
  );
}
