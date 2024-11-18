import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MessageBus } from '@org/message-bus';
import { CoinsCalculatedEvent } from '@org/common-events';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CoinCollectorService, CoinPresenter } from './coin-collector.service';

import { CoinsSinceLastRewardCalculator } from '@org/feature-common';

export interface PrizeSearch {
  searchNextPrize(collectedPoints: number): void;
}

@Component({
  standalone: true,
  template: ` <ng-content></ng-content>`,
  selector: 'feature-coins',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCoinsComponent
  implements OnInit, CoinPresenter, CoinsSinceLastRewardCalculator
{
  readonly coins = signal<number>(0);
  readonly coinsUpdated = output<void>();
  constructor(
    private readonly messageBusService: MessageBus,
    readonly coinCollectorService: CoinCollectorService,
  ) {
    coinCollectorService.presentCoins(this);

    coinCollectorService.listen$.pipe(takeUntilDestroyed()).subscribe();

    this.messageBusService
      .on(CoinsCalculatedEvent, 'update coins value in ui component')
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event) {
          this.coins.set(event.payload.totalCoins);
          this.coinsUpdated.emit();
        }
      });
  }

  presentCoins(coins: number): void {
    this.coins.set(coins);
  }

  ngOnInit(): void {
    this.coinsUpdated.emit();
  }

  loadNextPrize(prizeSearch: PrizeSearch): void {
    prizeSearch.searchNextPrize(this.coins());
  }

  calculateAchievedPointsSinceLastReward(highestReward: number): number {
    if (this.coins() < highestReward) {
      throw new Error(
        'Coins cannot be less than the highest reward. This means user should not have this reward',
      );
    }

    return this.coins() - highestReward;
  }
}
