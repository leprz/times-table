import { Route } from '@angular/router';
import { tlLinkDefinition } from '@org/page-tl-common';

export const tinyLearnersAppRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./tiny-learners-lesson-selector.component').then(
        (m) => m.TinyLearnersLessonSelectorComponent,
      ),
  },
  {
    path: tlLinkDefinition('learn_numbers'),
    loadComponent: () =>
      import('@org/page-learn-numbers').then(
        (m) => m.PageLearnNumbersComponent,
      ),
  },
  {
    path: tlLinkDefinition('learn_colors'),
    loadComponent: () =>
      import('@org/page-learn-colors').then((m) => m.PageLearnColorsComponent),
  },
  {
    path: tlLinkDefinition('learn_summary'),
    loadComponent: () =>
      import('@org/page-learn-summary').then(
        (m) => m.PageLearnSummaryComponent,
      ),
  },
  {
    path: '**',
    redirectTo: tlLinkDefinition('learn_numbers'),
  },
];
