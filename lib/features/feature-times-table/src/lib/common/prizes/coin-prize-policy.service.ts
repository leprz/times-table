import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoinPrizePolicy {
  countPrize(exerciseScore: number): number {
    return Math.floor(exerciseScore / 100);
  }
}