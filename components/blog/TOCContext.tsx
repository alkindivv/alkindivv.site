import React, { createContext, useContext, useState, useCallback } from 'react';

export type Heading = {
  id: string;
  title: string;
  level: number;
};

interface TOCContextValue {
  headings: Heading[];
  register: (heading: Heading) => void;
}

export const TOCContext = createContext<TOCContextValue | undefined>(undefined);

export const useTOC = (): TOCContextValue => {
  const ctx = useContext(TOCContext);
  if (!ctx) {
    throw new Error('useTOC must be used within TOCProvider');
  }
  return ctx;
};

export const useTOCOptional = () => useContext(TOCContext);

export const TOCProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  const register = useCallback((heading: Heading) => {
    setHeadings((prev) => {
      if (prev.some((h) => h.id === heading.id)) return prev;
      return [...prev, heading];
    });
  }, []);

  return (
    <TOCContext.Provider value={{ headings, register }}>
      {children}
    </TOCContext.Provider>
  );
};
