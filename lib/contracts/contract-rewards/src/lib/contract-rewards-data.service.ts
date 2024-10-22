import { Observable } from 'rxjs';
import {
  CreateOneRewardBodyParams,
  CreateOneRewardResult,
  ReadManyRewardsResult,
  SearchManyRewardsBodyParams, UpdateOneRewardBodyParams, UpdateOneRewardPathParams, UpdateOneRewardResult
} from './contract-rewards';

export abstract class RewardsDataServicePort {
  abstract transaction(callback: () => void): void;

  abstract readMany(): Observable<ReadManyRewardsResult>;

  abstract searchMany(criteria: SearchManyRewardsBodyParams): Observable<ReadManyRewardsResult>;

  abstract createOne(bodyParams: CreateOneRewardBodyParams): Observable<CreateOneRewardResult>;

  abstract updateOne(pathParams: UpdateOneRewardPathParams, bodyParams: UpdateOneRewardBodyParams): Observable<UpdateOneRewardResult>;
}
