import { Route } from '@angular/router';
import { PageTimesTableGuesserComponent } from './page-times-table-guesser/page-times-table-guesser.component';
import { equationGeneratorDivisionProviders, equationGeneratorMultiplicationProviders } from '@org/feature-times-table';

export const pageTimesTableGuesserMultiplicationRoutes: Route[] = [
  {
    path: '',
    component: PageTimesTableGuesserComponent,
    providers: [
      ...equationGeneratorMultiplicationProviders,
    ]
  }
];

export const pageTimesTableGuesserDivisionRoutes: Route[] = [
  {
    path: '',
    component: PageTimesTableGuesserComponent,
    providers: [
      ...equationGeneratorDivisionProviders,
    ]
  }
];