import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseTry, FormatHighScorePipe, HighScoreService, SummaryService } from '@org/feature-times-table';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormatHighScorePipe, RouterLink],
  templateUrl: './page-lesson-summary.component.html',
  styleUrl: './page-lesson-summary.component.css',
})
export class PageLessonSummaryComponent implements OnDestroy {
  readonly bestScoreService = inject(HighScoreService);
  readonly routerLink = inject(Router);

  readonly currentMultiplicand = signal<number | null>(null);
  readonly score = signal<number | null>(null);
  readonly total = signal<number | null>(null);
  readonly bestScore = signal<number>(this.bestScoreService.getHighScore());
  readonly isNewBestScore = computed(() => {
    return (this.score() ?? 0) > this.bestScore();
  });

  wrongAnswers = signal<ExerciseTry[]>([]);

  ngOnDestroy(): void {
    this.summaryService.reset();
  }

  constructor(private readonly summaryService: SummaryService) {
    if (this.summaryService.isInitialized()) {
      this.currentMultiplicand.set(
        this.summaryService.getMultiplicand() ?? null
      );
      this.wrongAnswers.set(this.summaryService.getWrongAnswers());
      this.score.set(this.summaryService.calculateScore());

      if (this.summaryService.hasTotalScore()) {
        this.total.set(SummaryService.TOTAL_SCORE);
      } else {
        this.bestScoreService.setHighScore(this.score() ?? 0);
      }
    } else {
      this.routerLink.navigate(['/']);
    }
  }
}
