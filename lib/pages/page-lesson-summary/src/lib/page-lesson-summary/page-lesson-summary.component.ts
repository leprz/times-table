import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseSummaryService, ExerciseTry, FormatHighScorePipe, HighScoreService } from '@org/feature-times-table';
import { Router, RouterLink } from '@angular/router';
import { CoinCollectorService } from '@org/feature-coins';
import { UiDialogComponent } from '@org/ui-dialog';
import { featurePrizeDataServiceProviders } from '@org/feature-prize';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { LessonSummaryCoinsListener } from './lesson-summary-coins.listener';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { featureRewardsDataServiceProviders } from '@org/feature-rewards';
import { UiPrizeComponent } from '@org/ui-prize';
import { ScoreCalculatedEvent } from '@org/common-events';
import { MessageBus } from '@org/message-bus';
import { OnInitComponent } from '@org/page-common';

@Component({
  standalone: true,
  imports: [CommonModule, FormatHighScorePipe, RouterLink, UiDialogComponent, OnInitComponent, FastSvgComponent, UiPrizeComponent],
  providers: [
    ...featureRewardsDataServiceProviders,
    ...featurePrizeDataServiceProviders,
    LessonSummaryCoinsListener
  ],
  templateUrl: './page-lesson-summary.component.html',
  styleUrl: './page-lesson-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLessonSummaryComponent implements OnDestroy {
  readonly bestScoreService = inject(HighScoreService);
  readonly coinCollectorService = inject(CoinCollectorService);
  readonly routerLink = inject(Router);
  private readonly summaryListener = inject(LessonSummaryCoinsListener);
  private readonly messageBus = inject(MessageBus);

  readonly score = signal<number | null>(null);
  readonly bestScore = signal<number>(this.bestScoreService.getHighScore());
  readonly coins = signal<number>(this.coinCollectorService.getCoins());
  readonly isNewBestScore = computed(() => {
    return (this.score() ?? 0) > this.bestScore();
  });
  readonly operationSign = signal<string>('?');
  readonly wrongAnswers = signal<ExerciseTry[]>([]);

  ngOnDestroy(): void {
    this.summaryService.reset();
  }

  constructor(
    private readonly summaryService: ExerciseSummaryService
  ) {
    this.summaryListener.convertPricesToRewards$.pipe(
      takeUntilDestroyed()
    ).subscribe();

    if (this.summaryService.isInitialized()) {
      this.wrongAnswers.set(this.summaryService.getWrongAnswers());
      const score = this.summaryService.calculateScore();
      this.messageBus.emit(new ScoreCalculatedEvent({
        exerciseTotalScore: score
      }));
      this.score.set(score);
      this.coins.set(this.coinCollectorService.getCoins());
      this.operationSign.set(this.summaryService.getOperationSign());
    } else {
      this.routerLink.navigate(['/']);
    }
  }
}
