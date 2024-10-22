import {
  CreateOneRewardBodyParams,
  CreateOneRewardResult,
  ReadManyRewardsResult,
  RewardsDataServicePort,
  SearchManyRewardsBodyParams,
  UpdateOneRewardBodyParams,
  UpdateOneRewardPathParams,
  UpdateOneRewardResult
} from '@org/contract-rewards';
import { from, map, Observable } from 'rxjs';
import { RewardsDb } from './rewards.indexed-db';
import { Injectable } from '@angular/core';
import { reduceUndefined } from '@org/utils-common';

@Injectable({
  providedIn: 'root'
})
export class RewardsDataServiceIndexedDb implements RewardsDataServicePort {
  constructor(private readonly db: RewardsDb) {
  }

  transaction(callback: () => void): void {
    this.db.transaction('rw', this.db.rewards, () => {
      callback();
    });
  }

  readMany(): Observable<ReadManyRewardsResult> {
    return from(this.db.rewards.orderBy('requiredPoints').reverse().toArray()).pipe(map(
      content => ({
        content,
        count: content.length
      }))
    );
  }

  searchMany(criteria: SearchManyRewardsBodyParams): Observable<ReadManyRewardsResult> {
    const query = this.db.rewards.orderBy('requiredPoints').reverse();

    const { isAchieved } = criteria;
    if (isAchieved !== undefined) {
      query.and((reward) => {
        if (!isAchieved) {
          return reward.achievedAt === null;
        }

        return true;
      });
    }

    const { isCollected } = criteria;
    if (isCollected !== undefined) {
      query.and((reward) => {
        if (!isCollected) {
          return reward.collectedAt === null;
        }

        return true;
      });
    }

    const { requiredPoints } = criteria;
    if (requiredPoints !== undefined) {
      const { min, max } = requiredPoints;
      if (min !== undefined) {
        query.and((reward) => reward.requiredPoints >= min);
      }

      if (max !== undefined) {
        query.and((reward) => reward.requiredPoints <= max);
      }
    }

    if (criteria.limit !== undefined) {
      query.limit(criteria.limit);
    }

    return from(query.toArray()).pipe(
      map(content => ({
        content,
        count: content.length
      }))
    );
  }

  createOne(bodyParams: CreateOneRewardBodyParams): Observable<CreateOneRewardResult> {
    return from(this.db.rewards.add({
      requiredPoints: bodyParams.requiredPoints,
      name: bodyParams.name,
      id: bodyParams.id,
      achievedAt: bodyParams.achievedAt,
      collectedAt: null
    })).pipe(map(() => undefined));
  }

  updateOne(pathParams: UpdateOneRewardPathParams, bodyParams: UpdateOneRewardBodyParams): Observable<UpdateOneRewardResult> {
    return from(this.db.rewards.where({ id: pathParams.id }).modify(reduceUndefined(bodyParams))).pipe(map(() => undefined));
  }
}