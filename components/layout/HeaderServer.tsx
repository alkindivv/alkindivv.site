import dynamic from 'next/dynamic';

const HeaderClient = dynamic(() => import('./Header'), { ssr: false });

export default function Header() {
  return <HeaderClient />;
}
