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
    path: linkDefinition('multiplication_memory'),
    loadChildren: () =>
      import('@org/page-times-table-memory').then(
        (r) => r.pageTimesTableMemoryMultiplicationRoutes,
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
    path: linkDefinition('division_memory'),
    loadChildren: () =>
      import('@org/page-times-table-memory').then(
        (r) => r.pageTimesTableMemoryDivisionRoutes,
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
    path: linkDefinition('subtraction_memory'),
    loadChildren: () =>
      import('@org/page-times-table-memory').then(
        (r) => r.pageTimesTableMemorySubtractionRoutes,
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
    path: linkDefinition('addition_memory'),
    loadChildren: () =>
      import('@org/page-times-table-memory').then(
        (r) => r.pageTimesTableMemoryAdditionRoutes,
      ),
  },
  {
    path: linkDefinition('complex_operation_calculation'),
    loadChildren: () =>
      import('@org/page-times-table-guesser').then(
        (m) => m.pageTimesTableGuesserComplexOperationRoutes,
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
    path: linkDefinition('complex_operation'),
    loadChildren: () =>
      import('@org/page-complex-operation').then(
        (m) => m.pageComplexOperationRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
