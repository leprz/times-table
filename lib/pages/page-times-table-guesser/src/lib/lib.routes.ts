import { Route } from '@angular/router';
import { PageTimesTableGuesserComponent } from './page-times-table-guesser/page-times-table-guesser.component';
import {
  equationGeneratorAdditionProviders,
  equationGeneratorComplexOperationProviders,
  equationGeneratorDivisionProviders,
  equationGeneratorMultiplicationProviders,
  equationGeneratorSubtractionProviders,
} from '@org/feature-times-table';

export const pageTimesTableGuesserMultiplicationRoutes: Route[] = [
  {
    path: '',
    component: PageTimesTableGuesserComponent,
    providers: [...equationGeneratorMultiplicationProviders],
  },
];

export const pageTimesTableGuesserDivisionRoutes: Route[] = [
  {
    path: '',
    component: PageTimesTableGuesserComponent,
    providers: [...equationGeneratorDivisionProviders],
  },
];

export const pageTimesTableGuesserSubtractionRoutes: Route[] = [
  {
    path: '',
    component: PageTimesTableGuesserComponent,
    providers: [...equationGeneratorSubtractionProviders],
  },
];

export const pageTimesTableGuesserAdditionRoutes: Route[] = [
  {
    path: '',
    component: PageTimesTableGuesserComponent,
    providers: [...equationGeneratorAdditionProviders],
  },
];

export const pageTimesTableGuesserComplexOperationRoutes: Route[] = [
  {
    path: '',
    component: PageTimesTableGuesserComponent,
    providers: [...equationGeneratorComplexOperationProviders],
  },
];
