import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CoinCollectorService,
  ExerciseTry,
  FormatHighScorePipe,
  HighScoreService,
  SummaryService
} from '@org/feature-times-table';
import { Router, RouterLink } from '@angular/router';
import { MessageBus } from '@org/message-bus';
import { ScoreCalculatedEvent } from '@org/common-events';

@Component({
  standalone: true,
  imports: [CommonModule, FormatHighScorePipe, RouterLink],
  templateUrl: './page-lesson-summary.component.html',
  styleUrl: './page-lesson-summary.component.css',
})
export class PageLessonSummaryComponent implements OnDestroy {
  readonly bestScoreService = inject(HighScoreService);
  readonly coinCollectorService = inject(CoinCollectorService);
  readonly routerLink = inject(Router);

  readonly currentMultiplicand = signal<number | null>(null);
  readonly score = signal<number | null>(null);
  readonly total = signal<number | null>(null);
  readonly bestScore = signal<number>(this.bestScoreService.getHighScore());
  readonly coins = signal<number>(this.coinCollectorService.getCoins());
  readonly isNewBestScore = computed(() => {
    return (this.score() ?? 0) > this.bestScore();
  });

  wrongAnswers = signal<ExerciseTry[]>([]);

  ngOnDestroy(): void {
    this.summaryService.reset();
  }

  constructor(
    private readonly summaryService: SummaryService,
    private readonly messageBus: MessageBus
  ) {
    if (this.summaryService.isInitialized()) {
      this.currentMultiplicand.set(
        this.summaryService.getMultiplicand() ?? null
      );
      this.wrongAnswers.set(this.summaryService.getWrongAnswers());
      const score = this.summaryService.calculateScore();
      this.score.set(score);
      this.coins.set(this.coinCollectorService.getCoins());

      this.messageBus.emit(new ScoreCalculatedEvent({
        exerciseTotalScore: score
      }));

      if (this.summaryService.hasTotalScore()) {
        this.total.set(SummaryService.TOTAL_SCORE);
      }
    } else {
      this.routerLink.navigate(['/']);
    }
  }
}
