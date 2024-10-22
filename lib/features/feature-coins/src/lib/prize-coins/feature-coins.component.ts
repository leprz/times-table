import { Component, signal } from '@angular/core';
import { MessageBus } from '@org/message-bus';
import { CoinsCalculatedEvent } from '@org/common-events';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CoinCollectorService } from './coin-collector.service';

@Component({
  standalone: true,
  template: `
    <ng-content></ng-content>`,
  selector: 'feature-coins'
})
export class FeatureCoinsComponent {
  readonly coins = signal<number | null>(null);

  constructor(
    private readonly messageBusService: MessageBus,
    private readonly coinCollectorService: CoinCollectorService
  ) {
    this.coins.set(this.coinCollectorService.getCoins());

    coinCollectorService.listen$.pipe(
      takeUntilDestroyed()
    ).subscribe();

    this.messageBusService
      .on(CoinsCalculatedEvent, 'update coins value in ui component')
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event) {
          this.coins.set(this.coinCollectorService.getCoins());
        }
      });
  }
}