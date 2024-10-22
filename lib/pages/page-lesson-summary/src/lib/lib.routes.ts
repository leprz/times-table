import { Route } from '@angular/router';
import { inject } from '@angular/core';
import { PageLessonSummaryComponent } from './page-lesson-summary/page-lesson-summary.component';
import { ExerciseSummaryService } from '@org/feature-times-table';

export const pageLessonSummaryRoutes: Route[] = [
  {
    path: '',
    component: PageLessonSummaryComponent,
    canActivate: [() => {
      const summaryService = inject(ExerciseSummaryService);
      if (!summaryService.isInitialized()) {
        return ['/'];
      }
      return true;
    }]
  }
];
