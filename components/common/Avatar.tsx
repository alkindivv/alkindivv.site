import Image from 'next/image';
import clsx from 'clsx';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Avatar({
  src,
  alt,
  size = 'md',
  className,
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-[300px] h-[300px] md:w-[400px] md:h-[400px]',
  };

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-full ring-2 ring-emerald-500/20',
        sizeClasses[size],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={
          size === 'xl'
            ? '(max-width: 768px) 300px, 400px'
            : size === 'lg'
              ? '48px'
              : size === 'md'
                ? '32px'
                : '28px'
        }
      />
    </div>
  );
}
