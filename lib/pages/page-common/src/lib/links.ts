export const links = {
  quiz: '/quiz',
  quiz__$multiplicand: '/quiz/:multiplicand',
  summary: '/summary',
  count: '/count'
} as const;

export function linkDefinition(link: keyof typeof links): string {
  return links[link].slice(1);
}
