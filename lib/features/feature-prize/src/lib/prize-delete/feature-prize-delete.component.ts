import { Component, inject, input } from '@angular/core';
import { combineLatestWith, Observable, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { DeleteOnePrizePathParams, PrizeDataServicePort } from '@org/contract-prize';
import { filterNill } from '@org/utils-data-service';
import { MessageBus } from '@org/message-bus';
import { PrizeDeletedEvent } from '../common/prize-deleted.event';
import { PrizeDataServiceIndexedDb } from '../data-service/prize-data-service.indexed-db';

@Component({
  selector: 'feature-prize-delete',
  standalone: true,
  providers: [{
    provide: PrizeDataServicePort,
    useClass: PrizeDataServiceIndexedDb
  }],
  template: `
    <ng-content></ng-content>
  `
})
export class FeaturePrizeDeleteComponent {
  readonly params = input.required<DeleteOnePrizePathParams>();

  readonly prizeDataService = inject(PrizeDataServicePort);

  readonly messageBus = inject(MessageBus);

  readonly deleteSubject = new Subject<void>();

  constructor() {
    this.deleteResult$.pipe(
      takeUntilDestroyed(),
    ).subscribe();
  }

  private readonly deleteResult$: Observable<void> =
    toObservable(this.params).pipe(
      filterNill(),
      combineLatestWith(this.deleteSubject.asObservable()),
      switchMap(([payload]) => this.prizeDataService.deleteOne(payload)),
      tap(() => this.messageBus.emit(new PrizeDeletedEvent()))
    );

  delete(): void {
    this.deleteSubject.next();
  }
}
