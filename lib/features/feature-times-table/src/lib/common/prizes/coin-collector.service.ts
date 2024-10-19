import { inject, Injectable } from '@angular/core';
import { CoinsCalculatedEvent, ScoreCalculatedEvent } from '@org/common-events';
import { MessageBus } from '@org/message-bus';
import { CoinPrizePolicy } from './coin-prize-policy.service';
import { LocalStorageService } from '@org/local-storage';
@Injectable({
  providedIn: 'root'
})
export class CoinCollectorService {
  localStorageService = inject(LocalStorageService);
  private readonly COINS_STORAGE_KEY = 'coins';

  constructor(
    private readonly messageBusService: MessageBus,
    private readonly coinPrizePolicy: CoinPrizePolicy,
  ) {
    this.messageBusService.on(ScoreCalculatedEvent).subscribe((event) => {
      if (event) {
        const coins = this.getCoins();
        this.setCoins(coins + this.coinPrizePolicy.countPrize(event.payload.exerciseTotalScore));
        this.messageBusService.emit(new CoinsCalculatedEvent({ totalCoins: this.getCoins() }));
      }
    });
  }

  getCoins(): number {
    const coins = this.localStorageService.getItem(this.COINS_STORAGE_KEY);
    return coins ? parseInt(coins) : 0;
  }

  setCoins(coins: number): void {
    this.localStorageService.setItem(this.COINS_STORAGE_KEY, coins.toString());
  }
}