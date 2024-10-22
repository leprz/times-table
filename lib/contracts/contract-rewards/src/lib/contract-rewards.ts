import { API } from 'rest-contracts';

export interface RewardResponseItem {
  id: string;
  name: string;
  requiredPoints: number;
  achievedAt: string | null;
  collectedAt: string | null;
}

const readManyRewardsContract = API.Get.Path('/rewards').Returns<{
  content: RewardResponseItem[];
  count: number;
}>();

export type ReadManyRewardsResult = typeof readManyRewardsContract.result;

const searchManyRewardsContract =
  API
    .Post
    .Path('/rewards/search')
    .Body<{
      isAchieved?: boolean;
      isCollected?: boolean;
      requiredPoints?: {
        min?: number;
        max?: number
      };
      limit?: number;
    }>()
    .Returns<{
      content: RewardResponseItem[];
      count: number;
    }>();

export type SearchManyRewardsResult = typeof searchManyRewardsContract.result;
export type SearchManyRewardsBodyParams = typeof searchManyRewardsContract.bodyParams;


const createOneRewardContract =
  API
    .Post
    .Path('/rewards')
    .Body<{
      id: string;
      name: string;
      requiredPoints: number;
      achievedAt: string;
    }>()
    .Returns<void>();

export type CreateOneRewardResult = typeof createOneRewardContract.result;
export type CreateOneRewardBodyParams = typeof createOneRewardContract.bodyParams;

const updateOneRewardContract =
  API
    .Put
    .Path('/rewards/{id}')
    .PathParameters<{
      id: string;
    }>()
    .Body<{
      collectedAt?: string | null;
    }>()
    .Returns<void>();

export type UpdateOneRewardResult = typeof updateOneRewardContract.result;
export type UpdateOneRewardBodyParams = typeof updateOneRewardContract.bodyParams;
export type UpdateOneRewardPathParams = typeof updateOneRewardContract.pathParams;