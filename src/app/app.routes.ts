import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@org/multiplication-table').then(m => m.StartComponent),
  },
  {
    path: 'quiz/:multiplicand',
    loadComponent: () => import('@org/multiplication-table').then(m => m.MultiplicationTableComponent),
  },
  {
    path: 'summary',
    loadComponent: () => import('@org/multiplication-table').then(m => m.SummaryComponent),
  }
];
