import {
  CreateOnePrizeBodyParams,
  CreateOnePrizeResult,
  DeleteOnePrizePathParams,
  DeleteOnePrizeResult,
  GetManyAchievedPrizeBodyParams,
  GetManyAchievedPrizeResult,
  GetOneNextPrizeBodyParams,
  GetOneNextPrizeResult,
  ReadManyPrizesResult,
  ReadOnePrizePathParams,
  ReadOnePrizeResult,
  UpdateOnePrizeBodyParams,
  UpdateOnePrizePathParams,
  UpdateOnePrizeResult,
} from './contracts-prize';
import { Observable } from 'rxjs';

export abstract class PrizeDataServicePort {
  abstract transaction(callback: () => void): Promise<void>;

  abstract readMany(): Observable<ReadManyPrizesResult>;

  abstract deleteOne(
    pathParams: DeleteOnePrizePathParams,
  ): Observable<DeleteOnePrizeResult>;

  abstract readOneById(
    pathParams: ReadOnePrizePathParams,
  ): Observable<ReadOnePrizeResult>;

  abstract createOne(
    bodyParams: CreateOnePrizeBodyParams,
  ): Observable<CreateOnePrizeResult>;

  abstract updateOne(
    pathParams: UpdateOnePrizePathParams,
    bodyParams: UpdateOnePrizeBodyParams,
  ): Observable<UpdateOnePrizeResult>;

  abstract findManyAchievedPrizes(
    bodyParams: GetManyAchievedPrizeBodyParams,
  ): Observable<GetManyAchievedPrizeResult>;

  abstract findNextPrize(
    bodyParams: GetOneNextPrizeBodyParams,
  ): Observable<GetOneNextPrizeResult>;
}
