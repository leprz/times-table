import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadManyRewardsResult, RewardsDataServicePort, SearchManyRewardsBodyParams } from '@org/contract-rewards';
import { combineLatestWith, Observable, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageBus } from '@org/message-bus';
import { RewardCollectedEvent, RewardCreatedEvent } from '@org/common-events';
import { featureRewardsDataServiceProviders } from '../common/data-service/rewards.providers';

@Component({
  selector: 'feature-rewards-list',
  standalone: true,
  imports: [CommonModule],
  providers: [
    ...featureRewardsDataServiceProviders
  ],
  template: `<ng-content></ng-content>`,
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
