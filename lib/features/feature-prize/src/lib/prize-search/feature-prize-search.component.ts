import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  BehaviorSubject,
  combineLatestWith,
  Observable,
  switchMap,
} from 'rxjs';
import {
  GetOneNextPrizeBodyParams,
  GetOneNextPrizeResult,
  PrizeDataServicePort,
} from '@org/contract-prize';
import { PrizeDataServiceIndexedDb } from '../data-service/prize-data-service.indexed-db';
import { MessageBus } from '@org/message-bus';
import { PrizeDeletedEvent } from '../common/prize-deleted.event';
import { PrizeCreatedEvent, RewardCreatedEvent } from '@org/common-events';
import { PrizeUpdatedEvent } from '../common/prize-updated.event';
import { PrizeSearch } from '@org/feature-coins';
import { filterNill } from '@org/utils-data-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { PointsToNextPrizeCalculator } from '@org/feature-common';

@Component({
  selector: 'feature-prize-search',
  standalone: true,
  providers: [
    {
      provide: PrizeDataServicePort,
      useClass: PrizeDataServiceIndexedDb,
    },
  ],
  template: ` <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturePrizeSearchComponent
  implements PrizeSearch, PointsToNextPrizeCalculator
{
  readonly prizeDataService = inject(PrizeDataServicePort);

  readonly loadAction = new BehaviorSubject<GetOneNextPrizeBodyParams | null>(
    null,
  );
  private readonly messageBus = inject(MessageBus);

  private readonly nextPrize$: Observable<GetOneNextPrizeResult> =
    this.loadAction.asObservable().pipe(
      filterNill(),
      combineLatestWith(
        this.messageBus.on(PrizeCreatedEvent, 'reload prize list'),
        this.messageBus.on(PrizeDeletedEvent, 'reload prize list'),
        this.messageBus.on(PrizeUpdatedEvent, 'reload prize list'),
        this.messageBus.on(RewardCreatedEvent, 'reload prize list'),
      ),
      switchMap(([bodyParams]) =>
        this.prizeDataService.findNextPrize(bodyParams),
      ),
    );

  readonly nextPrize = toSignal(this.nextPrize$);

  private search(bodyParams: GetOneNextPrizeBodyParams): void {
    this.loadAction.next(bodyParams);
  }

  searchNextPrize(collectedPoints: number): void {
    this.search({
      collectedPoints,
    });
  }

  calculatePointsToNextPrize(highestReward: number): number | null {
    const nextPrize = this.nextPrize();
    if (!nextPrize) {
      return null; // no next prize
    }

    if (nextPrize.requiredPoints <= highestReward) {
      return 0; // already achieved
    }

    return nextPrize.requiredPoints - highestReward;
  }
}
