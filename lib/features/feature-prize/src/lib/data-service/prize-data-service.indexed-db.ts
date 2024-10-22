import { from, map, Observable } from 'rxjs';
import { PrizeDb } from './prize.indexed-db';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Injectable } from '@angular/core';
import {
  CreateOnePrizeBodyParams,
  CreateOnePrizeResult,
  DeleteOnePrizePathParams,
  DeleteOnePrizeResult,
  GetManyAchievedPrizeBodyParams,
  GetManyAchievedPrizeResult,
  GetOneNextPrizeBodyParams,
  GetOneNextPrizeResult,
  PrizeDataServicePort,
  ReadManyPrizesResult,
  ReadOnePrizePathParams,
  ReadOnePrizeResult,
  UpdateOnePrizeBodyParams,
  UpdateOnePrizePathParams,
  UpdateOnePrizeResult
} from '@org/contract-prize';
import { reduceUndefined } from '@org/utils-common';


@Injectable({
  providedIn: 'root'
})
export class PrizeDataServiceIndexedDb implements PrizeDataServicePort {
  constructor(private readonly db: PrizeDb) {
  }

  async transaction(callback: () => void): Promise<void> {
    await this.db.transaction('rw', this.db.prizeItems, () => {
      callback();
    });
  }

  createOne(bodyParams: CreateOnePrizeBodyParams): Observable<CreateOnePrizeResult> {
    return fromPromise(this.db.prizeItems.add(bodyParams)).pipe(map(() => undefined));
  }

  deleteOne(pathParams: DeleteOnePrizePathParams): Observable<DeleteOnePrizeResult> {
    return fromPromise(this.db.prizeItems.where(
      { id: pathParams.id }
    ).delete()).pipe(map((deleteCount) => {
      if (deleteCount === 0) {
        throw new Error('Not found');
      }
      return undefined;
    }));
  }

  readMany(): Observable<ReadManyPrizesResult> {
    return from(this.db.prizeItems.orderBy('primaryId').reverse().toArray()).pipe(map(content => ({ content })));
  }

  readOneById(pathParams: ReadOnePrizePathParams): Observable<ReadOnePrizeResult> {
    return from(this.db.prizeItems
      .where({ id: pathParams.id })
      .first()
    ).pipe(
      map(result => {
        if (result) {
          return result;
        }
        throw new Error('Not found');
      })
    );
  }

  updateOne(pathParams: UpdateOnePrizePathParams, bodyParams: UpdateOnePrizeBodyParams): Observable<UpdateOnePrizeResult> {
    return from(
      this.db.prizeItems.where({ id: pathParams.id }).modify(reduceUndefined(bodyParams))
    ).pipe(map((updateCount) => {
        if (updateCount === 0) {
          throw new Error('Not found');
        }
        return undefined;
      })
    );
  }

  findManyAchievedPrizes(
    bodyParams: GetManyAchievedPrizeBodyParams
  ): Observable<GetManyAchievedPrizeResult> {
    return from(this.db.prizeItems
      .where('requiredPoints')
      .belowOrEqual(bodyParams.collectedPoints)
      .reverse()
      .and(item => !item.isAchieved)
      .sortBy('requiredPoints')
    ).pipe(
      map(result => {
        return result;
      })
    );
  }

  findNextPrize(bodyParams: GetOneNextPrizeBodyParams): Observable<GetOneNextPrizeResult> {
    return from(
      this.db.prizeItems.where('requiredPoints').above(bodyParams.collectedPoints).limit(1).first()
    ).pipe(
      map(result => {
        return result ?? null;
      })
    );
  }
}
