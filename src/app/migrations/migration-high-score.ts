import { Migration } from '../service-worker-updater';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MigrationHighScore implements Migration {
  async migrate(): Promise<void> {
    const highScore = localStorage.getItem('highScore');
    const newHighScoreValue = localStorage.getItem('highScore-multiplication');
    if (highScore && !newHighScoreValue) {
      localStorage.setItem('highScore-multiplication', highScore);
    }
  }
}