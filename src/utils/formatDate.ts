import { parseISO, format } from 'date-fns';

export function formatDate(dateString: string): string {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, 'MMMM d, yyyy');
}
