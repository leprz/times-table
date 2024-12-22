export const links = {
  multiplication_quiz: '/multiplication/quiz',
  multiplication_quiz__$multiplicand: '/multiplication/quiz/:multiplicand',
  multiplication_calculation: '/multiplication/calculation',
  multiplication_memory: '/multiplication/memory',
  division_calculation: '/division/calculation',
  division_memory: '/division/memory',
  subtraction_calculation: '/subtraction/calculation',
  subtraction_memory: '/subtraction/memory',
  addition_calculation: '/addition/calculation',
  addition_memory: '/addition/memory',
  complex_operation: '/complex-operation/test',
  complex_operation_calculation: '/complex-operation/calculation',
  summary: '/summary',
  rewards: '/rewards',
  rewards__settings: '/rewards#settings',
  home: '/',
  home__settings: '/#settings',
} as const;

export function linkDefinition(link: keyof typeof links): string {
  return links[link].slice(1);
}
