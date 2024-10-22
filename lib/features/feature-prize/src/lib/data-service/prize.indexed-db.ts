import { Injectable } from '@angular/core';
import { Dexie, Table } from 'dexie';

export interface PrizeItemEntity {
  id: string;
  name: string;
  requiredPoints: number;
  isAchieved: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PrizeDb extends Dexie{
  readonly prizeItems!: Table<PrizeItemEntity, number>;
  constructor() {
    super('prizes');
    this.version(1).stores({
      prizeItems: '++primaryId, id, name, isAchieved, requiredPoints'
    });
  }
}

