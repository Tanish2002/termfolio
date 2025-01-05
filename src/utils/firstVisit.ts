// utils/firstVisit.ts
export function isFirstVisit(): boolean {
  if (typeof window === 'undefined') return false;
  return !localStorage.getItem('has-visited');
}

export function markAsVisited(): void {
  localStorage.setItem('has-visited', 'true');
}
