import { Provider } from '@angular/core';
import { RewardsDataServicePort } from '@org/contract-rewards';
import { RewardsDataServiceIndexedDb } from './rewards.data-service.indexed-db';

export const featureRewardsDataServiceProviders: Array<Provider> = [
  {
    provide: RewardsDataServicePort,
    useClass: RewardsDataServiceIndexedDb,
  },
];
