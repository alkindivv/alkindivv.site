import Link from "next/link";
import clsx from "clsx";

interface DimensionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function DimensionLink({
  href,
  children,
  className,
}: DimensionLinkProps) {
  return (
    <Link href={href} className={clsx("dimension-link", className)}>
      {children}
    </Link>
  );
}
