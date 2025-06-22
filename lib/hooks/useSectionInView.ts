import { useEffect, useState } from 'react';

/**
 * Hook: useSectionInView
 * Mengembalikan true saat elemen yang direferensikan masuk ke viewport.
 * Observasi hanya terjadi sekali – setelah elemen terlihat, observer di-disconnect.
 */
const useSectionInView = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = { threshold: 0.2 }
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Jika elemen belum ter-mount / sudah terlihat, lewati
    if (!ref.current || isVisible) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, isVisible, options]);

  return isVisible;
};

export default useSectionInView;
