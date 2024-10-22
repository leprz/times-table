import { Component, inject, input } from '@angular/core';
import { combineLatestWith, Observable, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  PrizeDataServicePort,
  UpdateOnePrizeBodyParams,
  UpdateOnePrizePathParams,
  UpdateOnePrizeResult
} from '@org/contract-prize';
import { MessageBus } from '@org/message-bus';
import { PrizeDataServiceIndexedDb } from '../../data-service/prize-data-service.indexed-db';
import { PrizeUpdatedEvent } from '../../common/prize-updated.event';

@Component({
  selector: 'feature-prize-edit',
  standalone: true,
  providers: [{
    provide: PrizeDataServicePort,
    useClass: PrizeDataServiceIndexedDb,
  }],
  template: `
    <ng-content></ng-content>
  `
})
export class FeaturePrizeEditComponent {
  readonly params = input.required<UpdateOnePrizePathParams>();

  readonly updateSubject = new Subject<UpdateOnePrizeBodyParams>();
  readonly prizeDataService = inject(PrizeDataServicePort);
  readonly messageBus = inject(MessageBus);

  constructor() {
    this.updateResult$.pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.messageBus.emit(new PrizeUpdatedEvent())
    });
  }

  readonly updateResult$: Observable<UpdateOnePrizeResult>
    = toObservable(this.params).pipe(
      combineLatestWith(this.updateSubject.asObservable()),
      switchMap(([pathParams, bodyParams]) => this.prizeDataService.updateOne(pathParams, bodyParams))
    );

  update(payload: UpdateOnePrizeBodyParams): void {
    this.updateSubject.next(payload);
  }
}
