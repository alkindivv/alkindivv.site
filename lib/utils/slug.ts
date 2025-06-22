export function slugify(str: string): string {
  return str
    .toString()
    .normalize('NFKD') // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^\w\s-]/g, '') // remove non-word chars
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/--+/g, '-') // collapse dashes
    .replace(/^-+|-+$/g, ''); // trim dashes
}
