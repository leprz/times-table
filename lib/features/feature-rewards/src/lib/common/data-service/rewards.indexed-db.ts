import { Injectable } from '@angular/core';
import { Dexie, Table } from 'dexie';
import { RewardResponseItem } from '@org/contract-rewards';

@Injectable({
  providedIn: 'root',
})
export class RewardsDb extends Dexie {
  readonly rewards!: Table<RewardResponseItem, number>;
  constructor() {
    super('rewards');
    this.version(1).stores({
      rewards: '++primaryId, id, name, achievedAt, collectedAt, requiredPoints',
    });
  }
}
