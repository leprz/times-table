export const links = {
  quiz: '/quiz',
  quiz__$multiplicand: '/quiz/:multiplicand',
  summary: '/summary',
  count: '/count',
  rewards: '/rewards'
} as const;

export function linkDefinition(link: keyof typeof links): string {
  return links[link].slice(1);
}
