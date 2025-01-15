import { useRouter } from 'next/router';
import Link from 'next/link';

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileNav({ isOpen, setIsOpen }: MobileNavProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={() => setIsOpen(false)}
      />
      <nav className="fixed top-[var(--header-height)] right-0 w-64 h-screen bg-[#111111] border-l border-gray-800/50 p-6 z-50 transform transition-transform duration-300">
        <ul className="space-y-4">
          <li>
            <Link
              href="/blog"
              className={`block text-sm py-2 px-4 rounded-lg transition-colors ${
                router.pathname.includes('/blog')
                  ? 'text-emerald-500 bg-emerald-500/10'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`block text-sm py-2 px-4 rounded-lg transition-colors ${
                router.pathname === '/about'
                  ? 'text-emerald-500 bg-emerald-500/10'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className={`block text-sm py-2 px-4 rounded-lg transition-colors ${
                router.pathname === '/projects'
                  ? 'text-emerald-500 bg-emerald-500/10'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
