import { format } from 'date-fns';

export function formatDate(
  date: string | Date,
  formatStr: string = 'MMMM dd, yyyy'
) {
  return format(new Date(date), formatStr);
}

export function isRecentDate(date: string | Date, daysThreshold: number = 60) {
  const postDate = new Date(date);
  const diffTime = new Date().getTime() - postDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays < daysThreshold;
}
