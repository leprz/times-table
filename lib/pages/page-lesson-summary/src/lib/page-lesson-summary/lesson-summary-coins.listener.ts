import { inject, Injectable } from '@angular/core';
import { MessageBus } from '@org/message-bus';
import { RewardsDataServicePort } from '@org/contract-rewards';
import { PrizeDataServicePort } from '@org/contract-prize';
import { UuidGen } from '@org/utils-data-service';
import { Clock } from '@org/utils-common';
import { CoinsCalculatedEvent, RewardCreatedEvent } from '@org/common-events';
import { combineLatest, filter, switchMap, tap } from 'rxjs';

@Injectable()
export class LessonSummaryCoinsListener {
  private readonly messageBus = inject(MessageBus);
  private readonly rewardsDataService = inject(RewardsDataServicePort);
  private readonly prizeDataService = inject(PrizeDataServicePort);
  private readonly uuidGen = inject(UuidGen);
  private readonly clock = inject(Clock);


  readonly convertPricesToRewards$ =
    this.messageBus.on(CoinsCalculatedEvent, 'update rewards list').pipe(
      filter(event => event !== null),
      switchMap((event) => this.prizeDataService.findManyAchievedPrizes({
        collectedPoints: event.payload.totalCoins,
      })),
      switchMap((achievedPrizes) => {
        return combineLatest(achievedPrizes.map(
          (achievedPrize) => combineLatest([
            this.rewardsDataService.createOne({
              id: this.uuidGen.generate(),
              name: achievedPrize.name,
              requiredPoints: achievedPrize.requiredPoints,
              achievedAt: this.clock.today().toISOString(),
            }),
            this.prizeDataService.updateOne({
              id: achievedPrize.id,
            }, {
              isAchieved: true
            })
          ])
        ));
      }),
      tap(() => this.messageBus.emit(new RewardCreatedEvent())),
    );
}