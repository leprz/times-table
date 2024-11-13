import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import { ExerciseSummaryService } from '../common/exercise-summary/exercise-summary.service';

@Component({
  selector: 'feature-score',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureScoreComponent {
  summaryService = inject(ExerciseSummaryService);
  currentScore = signal(0);
  currentScoreRecalculated = output();

  recalculateCurrentScore(): void {
    this.currentScore.set(this.summaryService.calculateScore());
    this.currentScoreRecalculated.emit();
  }
}
