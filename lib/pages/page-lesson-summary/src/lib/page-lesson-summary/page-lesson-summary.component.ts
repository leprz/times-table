import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ExerciseSummary,
  ExerciseSummaryService,
  ExerciseTry,
  FormatHighScorePipe,
  HighScoreService,
  SummaryPresenter,
} from '@org/feature-times-table';
import { Router, RouterLink } from '@angular/router';
import { featurePrizeDataServiceProviders } from '@org/feature-prize';
import { LessonSummaryCoinsListener } from './lesson-summary-coins.listener';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { featureRewardsDataServiceProviders } from '@org/feature-rewards';

@Component({
  imports: [CommonModule, FormatHighScorePipe, RouterLink],
  providers: [
    ...featureRewardsDataServiceProviders,
    ...featurePrizeDataServiceProviders,
    LessonSummaryCoinsListener,
  ],
  templateUrl: './page-lesson-summary.component.html',
  styleUrl: './page-lesson-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLessonSummaryComponent implements OnDestroy, SummaryPresenter {
  readonly bestScoreService = inject(HighScoreService);
  readonly routerLink = inject(Router);
  private readonly summaryListener = inject(LessonSummaryCoinsListener);

  readonly currentExerciseScore = signal<number | null>(null);
  readonly previousHighScore = signal<number>(0);
  readonly isNewHighScore = computed(() => {
    return (this.currentExerciseScore() ?? 0) > this.previousHighScore();
  });
  readonly wrongAnswers = signal<ExerciseTry[]>([]);

  ngOnDestroy(): void {
    this.summaryService.reset();
  }

  constructor(private readonly summaryService: ExerciseSummaryService) {
    this.summaryListener.convertPricesToRewards$
      .pipe(takeUntilDestroyed())
      .subscribe();

    if (this.summaryService.isInitialized()) {
      this.summaryService.finishExercise(this);
    } else {
      this.routerLink.navigate(['/']);
    }
  }

  showExerciseSummary(summary: ExerciseSummary): void {
    this.previousHighScore.set(
      this.bestScoreService.getHighScore(summary.highScoreKey),
    );
    this.wrongAnswers.set(summary.wrongAnswers);
    this.currentExerciseScore.set(summary.score);
  }
}
