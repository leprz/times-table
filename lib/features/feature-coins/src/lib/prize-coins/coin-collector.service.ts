import { inject, Injectable } from '@angular/core';
import { CoinsCalculatedEvent, ExerciseFinishedEvent } from '@org/common-events';
import { MessageBus } from '@org/message-bus';
import { CoinPrizePolicy } from './coin-prize-policy.service';
import { LocalStorageService } from '@org/local-storage';
import { shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinCollectorService {
  localStorageService = inject(LocalStorageService);
  private readonly COINS_STORAGE_KEY = 'coins';

  constructor(
    private readonly messageBusService: MessageBus,
    private readonly coinPrizePolicy: CoinPrizePolicy
  ) {
  }

  listen$ = this.messageBusService
    .on(ExerciseFinishedEvent, 'recalculate coins for new score')
    .pipe(
      tap((event) => {
        if (event) {
          const currentCoinsValue = this.getCoins();
          const earnedCoins = this.coinPrizePolicy.countPrize(event.payload.totalScore);
          this.setCoins(currentCoinsValue + earnedCoins);
          this.messageBusService.emit(new CoinsCalculatedEvent({ totalCoins: this.getCoins() }));
        }
      }),
      shareReplay(1)
    );

  getCoins(): number {
    const coins = this.localStorageService.getItem(this.COINS_STORAGE_KEY);
    return coins ? parseInt(coins) : 0;
  }

  private setCoins(coins: number): void {
    this.localStorageService.setItem(this.COINS_STORAGE_KEY, coins.toString());
  }
}