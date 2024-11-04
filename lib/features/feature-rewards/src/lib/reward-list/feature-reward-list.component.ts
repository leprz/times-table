import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadManyRewardsResult, RewardsDataServicePort, SearchManyRewardsBodyParams } from '@org/contract-rewards';
import { combineLatestWith, map, Observable, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageBus } from '@org/message-bus';
import { RewardCollectedEvent, RewardCreatedEvent } from '@org/common-events';
import { featureRewardsDataServiceProviders } from '../common/data-service/rewards.providers';
import { filterNill } from '@org/utils-data-service';

@Component({
  selector: 'feature-rewards-list',
  standalone: true,
  imports: [CommonModule],
  providers: [
    ...featureRewardsDataServiceProviders
  ],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureRewardListComponent {
    private readonly rewardsDataService = inject(RewardsDataServicePort);
    private readonly messageBus = inject(MessageBus);

  readonly loadSubject = new Subject<{
    searchBodyParams?: SearchManyRewardsBodyParams;
  }>();

  readonly rewards$: Observable<ReadManyRewardsResult> = this.loadSubject.asObservable().pipe(
    combineLatestWith(
      this.messageBus.on(RewardCreatedEvent, 'update reward list in ui'),
      this.messageBus.on(RewardCollectedEvent, 'update reward list in ui'),
    ),
    switchMap(([payload]) => {
      const { searchBodyParams } = payload
      if (searchBodyParams) {
        return this.rewardsDataService.searchMany(searchBodyParams);
      }

      return this.rewardsDataService.readMany();
    }),
    takeUntilDestroyed(),
  );

  readonly highestReward$: Observable<number> = this.rewards$.pipe(
    filterNill(),
    map(rewards => {
      return rewards.content.reduce((acc, reward) => {
        return reward.requiredPoints > acc ? reward.requiredPoints : acc;
      }, 0);
    })
  );

  loadAll(): void {
    this.loadSubject.next({});
  }

  loadNotCollectedYet(): void {
    this.loadSubject.next({
      searchBodyParams: {
        isCollected: false
      }
    });
  }
}
