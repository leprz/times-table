import { API } from 'rest-contracts';

export interface PrizeResponseItem {
  id: string;
  name: string;
  requiredPoints: number;
  isAchieved: boolean;
}

const ReadManyPrizesContract = API.Get.Path('/prizes').Returns<{
  content: PrizeResponseItem[];
}>();
export type ReadManyPrizesResult = typeof ReadManyPrizesContract.result;

const ReadOnePrizeContract = API.Get.Path('/prizes/:id')
  .PathParameters<Pick<PrizeResponseItem, 'id'>>()
  .Returns<PrizeResponseItem>();

export type ReadOnePrizePathParams = typeof ReadOnePrizeContract.pathParams;
export type ReadOnePrizeResult = typeof ReadOnePrizeContract.result;
const CreateOnePrizeContract = API.Post.Path('/prizes')
  .Body<PrizeResponseItem & { isAchieved: false | undefined }>()
  .Returns<void>();

export type CreateOnePrizeBodyParams = typeof CreateOnePrizeContract.bodyParams;
export type CreateOnePrizeResult = typeof CreateOnePrizeContract.result;

const UpdateOnePrizeContract = API.Put.Path('/prizes/:id')
  .PathParameters<Pick<PrizeResponseItem, 'id'>>()
  .Body<Partial<Omit<PrizeResponseItem, 'id'>>>()
  .Returns<void>();

export type UpdateOnePrizePathParams = typeof UpdateOnePrizeContract.pathParams;
export type UpdateOnePrizeBodyParams = typeof UpdateOnePrizeContract.bodyParams;
export type UpdateOnePrizeResult = typeof UpdateOnePrizeContract.result;

const DeleteOnePrizeContract = API.Delete.Path('/prizes/:id')
  .PathParameters<Pick<PrizeResponseItem, 'id'>>()
  .Returns<void>();

export type DeleteOnePrizePathParams = typeof DeleteOnePrizeContract.pathParams;
export type DeleteOnePrizeResult = typeof DeleteOnePrizeContract.result;

const GetManyAchievedPrizeContract = API.Post.Path('/prizes/achieved')
  .Body<{ collectedPoints: number }>()
  .Returns<PrizeResponseItem[]>();

export type GetManyAchievedPrizeBodyParams =
  typeof GetManyAchievedPrizeContract.bodyParams;
export type GetManyAchievedPrizeResult =
  typeof GetManyAchievedPrizeContract.result;

const GetOneNextPrizeContract = API.Post.Path('/prizes/next-available')
  .Body<{
    collectedPoints: number;
  }>()
  .Returns<PrizeResponseItem | null>();

export type GetOneNextPrizeBodyParams =
  typeof GetOneNextPrizeContract.bodyParams;
export type GetOneNextPrizeResult = typeof GetOneNextPrizeContract.result;
