export const tlLinks = {
  learn_numbers: '/learn/numbers',
  learn_numbers_painting: '/learn/numbers/painting',
  learn_summary: '/learn/summary',
  learn_colors: '/learn/colors',
  home: '/',
} as const;

export function tlLinkDefinition(link: keyof typeof tlLinks): string {
  return tlLinks[link].slice(1);
}
