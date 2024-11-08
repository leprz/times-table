export const links = {
  multiplication_quiz: '/multiplication/quiz',
  multiplication_quiz__$multiplicand: '/multiplication/quiz/:multiplicand',
  multiplication_calculation: '/multiplication/calculation',
  division_calculation: '/division/calculation',
  summary: '/summary',
  rewards: '/rewards',
  home: '/',
} as const;

export function linkDefinition(link: keyof typeof links): string {
  return links[link].slice(1);
}
