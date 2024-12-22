import { Route } from '@angular/router';
import {
  equationGeneratorAdditionProviders,
  equationGeneratorDivisionProviders,
  equationGeneratorMultiplicationProviders,
  equationGeneratorSubtractionProviders,
} from '@org/feature-times-table';
import { PageTimesTableMemoryComponent } from './page-times-table-memory/page-times-table-memory.component';

export const pageTimesTableMemoryMultiplicationRoutes: Route[] = [
  {
    path: '',
    component: PageTimesTableMemoryComponent,
    providers: [...equationGeneratorMultiplicationProviders],
  },
];

export const pageTimesTableMemoryDivisionRoutes: Route[] = [
  {
    path: '',
    component: PageTimesTableMemoryComponent,
    providers: [...equationGeneratorDivisionProviders],
  },
];

export const pageTimesTableMemorySubtractionRoutes: Route[] = [
  {
    path: '',
    component: PageTimesTableMemoryComponent,
    providers: [...equationGeneratorSubtractionProviders],
  },
];

export const pageTimesTableMemoryAdditionRoutes: Route[] = [
  {
    path: '',
    component: PageTimesTableMemoryComponent,
    providers: [...equationGeneratorAdditionProviders],
  },
];
