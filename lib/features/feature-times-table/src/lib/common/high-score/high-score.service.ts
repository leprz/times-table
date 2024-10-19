import { inject, Injectable } from '@angular/core';
import { MessageBus } from '@org/message-bus';
import { HighScoreCalculatedEvent, ScoreCalculatedEvent } from '@org/common-events';
import { LocalStorageService } from '@org/local-storage';

@Injectable({
  providedIn: 'root',
})
export class HighScoreService {
  localStorageService = inject(LocalStorageService);
  messageBusService = inject(MessageBus);

  constructor() {
    this.messageBusService.on(ScoreCalculatedEvent).subscribe((event) => {
      if (event && event.payload.exerciseTotalScore > this.getHighScore()) {
        this.setHighScore(event.payload.exerciseTotalScore);
        this.messageBusService.emit(new HighScoreCalculatedEvent({ highScore: this.getHighScore() }));
      }
    });
  }

  getHighScore(): number {
    const highScore = this.localStorageService.getItem('highScore');
    return highScore ? parseInt(highScore) : 0;
  }

  protected setHighScore(score: number): void {
    if (score > this.getHighScore()) {
      this.localStorageService.setItem('highScore', score.toString());
    }
  }
}
