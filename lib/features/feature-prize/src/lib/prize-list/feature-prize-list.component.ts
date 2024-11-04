import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { combineLatest, combineLatestWith, Observable, Subject, switchMap } from 'rxjs';
import { PrizeDataServicePort, ReadManyPrizesResult, GetOneNextPrizeBodyParams } from '@org/contract-prize';
import { PrizeDataServiceIndexedDb } from '../data-service/prize-data-service.indexed-db';
import { MessageBus } from '@org/message-bus';
import { PrizeDeletedEvent } from '../common/prize-deleted.event';
import { PrizeCreatedEvent, RewardCreatedEvent } from '@org/common-events';

@Component({
  selector: 'feature-prize-list',
  standalone: true,
  providers: [{
    provide: PrizeDataServicePort,
    useClass: PrizeDataServiceIndexedDb
  }],
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturePrizeListComponent {
  readonly prizeDataService = inject(PrizeDataServicePort);

  readonly loadAction = new Subject<GetOneNextPrizeBodyParams | null>();
  readonly messageBus = inject(MessageBus);

  readonly prizeList$: Observable<ReadManyPrizesResult> =
    this.loadAction.asObservable().pipe(
      combineLatestWith(combineLatest([
        this.messageBus.on(PrizeCreatedEvent, 'reload prize list'),
        this.messageBus.on(PrizeDeletedEvent, 'reload prize list'),
        this.messageBus.on(RewardCreatedEvent, 'reload prize list'),
      ])),
      switchMap(() => this.prizeDataService.readMany()),
    );

  load(): void {
    this.loadAction.next(null);
  }

  search(bodyParams: GetOneNextPrizeBodyParams): void {
    this.loadAction.next(bodyParams);
  }
}
