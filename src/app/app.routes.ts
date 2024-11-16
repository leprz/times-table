import { Route } from '@angular/router';

import { linkDefinition } from '@org/page-common';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@org/page-lesson-selector').then(
        (m) => m.PageLessonSelectorComponent,
      ),
  },
  {
    path: linkDefinition('multiplication_quiz'),
    pathMatch: 'full',
    loadComponent: () =>
      import('@org/page-times-table-quiz').then(
        (c) => c.PageMultiplicandSelectorComponent,
      ),
  },
  {
    path: linkDefinition('multiplication_quiz__$multiplicand'),
    loadChildren: () =>
      import('@org/page-times-table-quiz').then(
        (r) => r.pageTimesTableQuizMultiplicationRoutes,
      ),
  },
  {
    path: linkDefinition('multiplication_calculation'),
    loadChildren: () =>
      import('@org/page-times-table-guesser').then(
        (m) => m.pageTimesTableGuesserMultiplicationRoutes,
      ),
  },
  {
    path: linkDefinition('division_calculation'),
    loadChildren: () =>
      import('@org/page-times-table-guesser').then(
        (m) => m.pageTimesTableGuesserDivisionRoutes,
      ),
  },
  {
    path: linkDefinition('subtraction_calculation'),
    loadChildren: () =>
      import('@org/page-times-table-guesser').then(
        (m) => m.pageTimesTableGuesserSubtractionRoutes,
      ),
  },
  {
    path: linkDefinition('addition_calculation'),
    loadChildren: () =>
      import('@org/page-times-table-guesser').then(
        (m) => m.pageTimesTableGuesserAdditionRoutes,
      ),
  },
  {
    path: linkDefinition('summary'),
    loadChildren: () =>
      import('@org/page-lesson-summary').then((m) => m.pageLessonSummaryRoutes),
  },
  {
    path: linkDefinition('rewards'),
    loadChildren: () =>
      import('@org/page-rewards').then((m) => m.pageRewardsRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
