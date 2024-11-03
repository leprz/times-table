import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighScoreService } from '@org/feature-times-table';
import { MessageBus } from '@org/message-bus';
import { HighScoreCalculatedEvent } from '@org/common-events';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'feature-high-score',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
})
export class FeatureHighScoreComponent {
  readonly highScore = signal<number>(0);

  private readonly localStorageService = inject(HighScoreService);
  protected readonly messageBusService = inject(MessageBus);

  constructor() {
    this.highScore.set(this.getHighScore());

    this.messageBusService.on(HighScoreCalculatedEvent, 'update high score in ui component')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.highScore.set(this.getHighScore());
      });
  }

  protected getHighScore(): number {
    return this.localStorageService.getHighScore();
  }
}
