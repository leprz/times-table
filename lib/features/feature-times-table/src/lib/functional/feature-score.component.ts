import { Component, inject, output, signal } from '@angular/core';
import { HighScoreService } from '../common/high-score/high-score.service';
import { ExerciseSummaryService } from '../common/exercise-summary/exercise-summary.service';

@Component({
  selector: 'feature-score',
  standalone: true,
  template: `<ng-content></ng-content>`,
})
export class FeatureScoreComponent {
  highScoreService = inject(HighScoreService);
  summaryService = inject(ExerciseSummaryService);
  currentHighScore = signal(this.highScoreService.getHighScore());
  currentScore = signal(0);
  currentScoreRecalculated = output();

  recalculateCurrentScore(): void {
    this.currentScore.set(this.summaryService.calculateScore());
    this.currentScoreRecalculated.emit();
  }
}
