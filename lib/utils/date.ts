import { format } from 'date-fns';

export function formatDate(
  date: string | Date,
  formatStr: string = 'MMMM dd, yyyy'
) {
  return format(new Date(date), formatStr);
}
