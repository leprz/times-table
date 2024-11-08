import { inject, Injectable } from '@angular/core';
import { MessageBus } from '@org/message-bus';
import { HighScoreCalculatedEvent, ExerciseFinishedEvent } from '@org/common-events';
import { LocalStorageService } from '@org/local-storage';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class HighScoreService {
  localStorageService = inject(LocalStorageService);
  messageBusService = inject(MessageBus);

  constructor() {
    this.messageBusService
      .on(ExerciseFinishedEvent, 'update high score in local storage')
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event && event.payload.totalScore > this.getHighScore(event.payload.exerciseKey)) {
          this.setHighScore(event.payload.totalScore, event.payload.exerciseKey);
          this.messageBusService.emit(
            new HighScoreCalculatedEvent({
              highScore: this.getHighScore(),
              exerciseKey: event.payload.exerciseKey
            })
          );
        }
      });
  }

  getHighScore(key?: string): number {
    const highScore = this.localStorageService.getItem(this.buildLocalStorageKey(key));
    return highScore ? parseInt(highScore) : 0;
  }

  protected setHighScore(score: number, key?: string): void {
    if (score > this.getHighScore(key)) {
      this.localStorageService.setItem(this.buildLocalStorageKey(key), score.toString());
    }
  }

  private buildLocalStorageKey(key?: string): string {
    return ['highScore', key].filter((i => i !== undefined)).join('-');
  }
}
