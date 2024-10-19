import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { UiDialogComponent } from '@org/ui-dialog';
import { FormatHighScorePipe } from '@org/feature-times-table';
import { MessageBus } from '@org/message-bus';
import { CoinsCalculatedEvent, HighScoreCalculatedEvent } from '@org/common-events';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorageService } from '@org/local-storage';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, FastSvgComponent, UiDialogComponent, FormatHighScorePipe],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  coins = signal<number>(0);
  highScore = signal<number>(0);

  constructor(
    private readonly localStorageService: LocalStorageService,
    protected readonly messageBusService: MessageBus
  ) {

    this.highScore.set(this.getHighScore());

    this.messageBusService.on(HighScoreCalculatedEvent)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.highScore.set(this.getHighScore());
      });

    this.messageBusService.on(CoinsCalculatedEvent)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.coins.set(this.getCoins());
      });
  }

  protected getHighScore(): number {
    const highScore = this.localStorageService.getItem('highScore');
    if (highScore) {
      return parseInt(highScore);
    }
    return 0;
  }

  protected getCoins(): number {
    const coins = this.localStorageService.getItem('coins');
    if (coins) {
      return parseInt(coins);
    }
    return 0;
  }
}
