import { Routes } from '@angular/router';
import { PageTimesTableQuizComponent } from './page-times-table-quiz/page-times-table-quiz.component';
import { equationGeneratorMultiplicationProviders } from '@org/feature-times-table';

export const pageTimesTableQuizMultiplicationRoutes: Routes = [
  {
    path: '',
    component: PageTimesTableQuizComponent,
    providers: [
      ...equationGeneratorMultiplicationProviders,
    ]
  }
];