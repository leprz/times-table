import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HighScoreService {
  localStorageService = inject(LocalStorageService);
  getHighScore(): number {
    const highScore = this.localStorageService.getItem('highScore');
    return highScore ? parseInt(highScore) : 0;
  }

  setHighScore(score: number): void {
    if (score > this.getHighScore()) {
      this.localStorageService.setItem('highScore', score.toString());
    }
  }
}
