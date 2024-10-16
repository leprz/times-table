import { Component, inject, output, signal } from '@angular/core';
import { HighScoreService } from '../common/high-score/high-score.service';
import { SummaryService } from '../common/summary.service';

@Component({
  selector: 'feature-score',
  standalone: true,
  template: `<ng-content></ng-content>`,
})
export class FeatureScoreComponent {
  highScoreService = inject(HighScoreService);
  summaryService = inject(SummaryService);
  currentHighScore = signal(this.highScoreService.getHighScore());
  currentScore = signal(0);
  currentScoreRecalculated = output();

  recalculateCurrentScore(): void {
    this.currentScore.set(this.summaryService.calculateScore());
    this.currentScoreRecalculated.emit();
  }
}
