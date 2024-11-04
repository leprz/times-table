import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { CreateOnePrizeBodyParams, CreateOnePrizeResult, PrizeDataServicePort } from '@org/contract-prize';
import { PrizeDataServiceIndexedDb } from '../../data-service/prize-data-service.indexed-db';
import { filterNill, UuidGen } from '@org/utils-data-service';
import { MessageBus } from '@org/message-bus';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PrizeCreatedEvent } from '@org/common-events';
import { $localize } from '@angular/localize/init';

@Component({
  selector: 'feature-prize-create',
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
export class FeaturePrizeCreateComponent {
  readonly prizeDataService = inject(PrizeDataServicePort);

  readonly createSubject = new Subject<CreateOnePrizeBodyParams>();
  readonly messageBus = inject(MessageBus);
  readonly uuidGen = inject(UuidGen);

  readonly initialPrizeName = $localize`New Prize`;

  constructor() {
    this.createResult$.pipe(
      takeUntilDestroyed()
    ).subscribe();
  }

  private readonly createResult$: Observable<CreateOnePrizeResult> = this.createSubject.asObservable().pipe(
    filterNill(),
    switchMap((params) => this.prizeDataService.createOne(params).pipe(
      tap(
        () => this.messageBus.emit(
          new PrizeCreatedEvent({
            name: params.name,
            requiredPoints: params.requiredPoints
          })
        )
      ),
    )),
  );

  create(payload: Omit<CreateOnePrizeBodyParams, 'id'>): void {
    this.createSubject.next({
      ...payload,
      id: this.uuidGen.generate()
    });
  }

  createNewPrize(collectedPoints: number): void {
    this.create({
      name: this.initialPrizeName,
      isAchieved: false,
      requiredPoints: collectedPoints + 500,
    });
  }
}
