import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RewardsDataServicePort, UpdateOneRewardBodyParams, UpdateOneRewardPathParams } from '@org/contract-rewards';
import { MessageBus } from '@org/message-bus';
import { combineLatestWith, Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Clock } from '@org/utils-common';
import { RewardCollectedEvent } from '@org/common-events';
import { featureRewardsDataServiceProviders } from '../common/data-service/rewards.providers';

@Component({
  selector: 'feature-rewards-update',
  standalone: true,
  template: '<ng-content></ng-content>',
  providers: [
    ...featureRewardsDataServiceProviders
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureRewardsUpdateComponent {
  readonly params = input.required<UpdateOneRewardPathParams>();
  private readonly rewardsDataService = inject(RewardsDataServicePort);
  private readonly messageBus = inject(MessageBus);
  private readonly clock = inject(Clock);

  readonly collectSubject = new Subject<UpdateOneRewardBodyParams>();

  constructor() {
    this.updateReward$.subscribe();
  }

  readonly updateReward$ = toObservable(this.params).pipe(
    combineLatestWith(this.collectSubject.asObservable()),
    switchMap(([params, payload]) => this.rewardsDataService.updateOne(params, payload)),
    tap(() => this.messageBus.emit(new RewardCollectedEvent())),
    takeUntilDestroyed(),
  );

  collectReward(): void {
    this.collectSubject.next({
      collectedAt: this.clock.now().toISOString(),
    });
  }
}