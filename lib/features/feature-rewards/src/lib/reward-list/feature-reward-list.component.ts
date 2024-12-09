import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReadManyRewardsResult,
  RewardsDataServicePort,
  SearchManyRewardsBodyParams,
} from '@org/contract-rewards';
import { combineLatestWith, map, Observable, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MessageBus } from '@org/message-bus';
import { RewardCollectedEvent, RewardCreatedEvent } from '@org/common-events';
import { featureRewardsDataServiceProviders } from '../common/data-service/rewards.providers';
import { filterNill } from '@org/utils-data-service';
import {
  CoinsSinceLastRewardCalculator,
  PointsToNextPrizeCalculator,
} from '@org/feature-common';

export interface RewardProgressPresenter {
  presentRewardProgress(progress: RewardProgress | null): void;
}

export interface RewardProgress {
  actual: number;
  target: number;
}

@Component({
  selector: 'feature-rewards-list',
  imports: [CommonModule],
  providers: [...featureRewardsDataServiceProviders],
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureRewardListComponent {
  readonly highestRewardLoaded = output<void>();
  private readonly rewardsDataService = inject(RewardsDataServicePort);
  private readonly messageBus = inject(MessageBus);
  private readonly loadSubject = new Subject<{
    searchBodyParams?: SearchManyRewardsBodyParams;
  }>();
  private readonly rewards$: Observable<ReadManyRewardsResult> =
    this.loadSubject.asObservable().pipe(
      combineLatestWith(
        this.messageBus.on(RewardCreatedEvent, 'update reward list in ui'),
        this.messageBus.on(RewardCollectedEvent, 'update reward list in ui'),
      ),
      switchMap(([payload]) => {
        const { searchBodyParams } = payload;
        if (searchBodyParams) {
          return this.rewardsDataService.searchMany(searchBodyParams);
        }

        return this.rewardsDataService.readMany();
      }),
      takeUntilDestroyed(),
    );

  readonly rewards = toSignal(this.rewards$);
  readonly rewardsCount = toSignal(
    this.rewards$.pipe(map((rewards) => rewards.count)),
  );

  private readonly highestReward$: Observable<number> = this.rewards$.pipe(
    filterNill(),
    map((rewards) => {
      return rewards.content.reduce((acc, reward) => {
        return reward.requiredPoints > acc ? reward.requiredPoints : acc;
      }, 0);
    }),
  );

  readonly highestReward = toSignal(this.highestReward$);

  constructor() {
    this.highestReward$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.highestRewardLoaded.emit();
    });
  }

  private calculateRewardActualPoints(
    coins: CoinsSinceLastRewardCalculator,
  ): number {
    if (this.highestReward() === undefined) {
      throw new Error('Highest reward should be loaded before calculating');
    }

    return coins.calculateAchievedPointsSinceLastReward(
      this.highestReward() ?? 0,
    );
  }

  private calculateRewardTargetPoints(
    prize: PointsToNextPrizeCalculator,
  ): number | null {
    return prize.calculatePointsToNextPrize(this.highestReward() ?? 0);
  }

  calculateRewardProgress(
    coins: CoinsSinceLastRewardCalculator,
    prize: PointsToNextPrizeCalculator,
    presenter: RewardProgressPresenter,
  ): void {
    const target = this.calculateRewardTargetPoints(prize);
    if (target === null) {
      presenter.presentRewardProgress(null);
    } else {
      presenter.presentRewardProgress({
        actual: this.calculateRewardActualPoints(coins),
        target,
      });
    }
  }

  loadAll(): void {
    this.loadSubject.next({});
  }

  loadNotCollectedYet(): void {
    this.loadSubject.next({
      searchBodyParams: {
        isCollected: false,
      },
    });
  }

  loadHighestReward(): void {
    this.loadAll();
  }
}
