// Minimal stub of @mdx-js/react for React Server Components environment
export function useMDXComponents(components) {
  return components || {};
}

export const MDXProvider = ({ components, children }) => children;
