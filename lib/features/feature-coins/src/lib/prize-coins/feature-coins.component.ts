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
import { CoinCollectorService } from './coin-collector.service';

export interface PrizeSearch {
  searchNextPrize(collectedPoints: number): void;
}

@Component({
  standalone: true,
  template: ` <ng-content></ng-content>`,
  selector: 'feature-coins',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureCoinsComponent implements OnInit {
  readonly coins = signal<number>(0);
  readonly coinsUpdated = output<void>();
  constructor(
    private readonly messageBusService: MessageBus,
    private readonly coinCollectorService: CoinCollectorService,
  ) {
    this.coins.set(this.coinCollectorService.getCoins());

    coinCollectorService.listen$.pipe(takeUntilDestroyed()).subscribe();

    this.messageBusService
      .on(CoinsCalculatedEvent, 'update coins value in ui component')
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event) {
          this.coins.set(this.coinCollectorService.getCoins());
          this.coinsUpdated.emit();
        }
      });
  }

  ngOnInit(): void {
    this.coinsUpdated.emit();
  }

  loadNextPrize(prizeSearch: PrizeSearch): void {
    prizeSearch.searchNextPrize(this.coins());
  }
}
