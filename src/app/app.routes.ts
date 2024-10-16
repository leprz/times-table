import { Route } from '@angular/router';

import { linkDefinition } from '@org/page-common';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@org/page-lesson-selector').then(
        (m) => m.PageLessonSelectorComponent
      ),
  },
  {
    path: linkDefinition('quiz'),
    pathMatch: 'full',
    loadComponent: () =>
      import('@org/page-times-table-quiz').then(
        (m) => m.PageMultiplicandSelectorComponent
      ),
  },
  {
    path: linkDefinition('quiz__$multiplicand'),
    loadComponent: () =>
      import('@org/page-times-table-quiz').then(
        (m) => m.PageTimesTableQuizComponent
      ),
  },
  {
    path: linkDefinition('summary'),
    loadChildren: () =>
      import('@org/page-lesson-summary').then((m) => m.pageLessonSummaryRoutes),
  },
  {
    path: linkDefinition('count'),
    loadChildren: () =>
      import('@org/page-times-table-guesser').then((m) => m.pageTimesTableGuesserRoutes),
  },
];
