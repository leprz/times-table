import { Provider } from '@angular/core';
import { PrizeDataServiceIndexedDb } from './prize-data-service.indexed-db';
import { PrizeDataServicePort } from '@org/contract-prize';

export const featurePrizeDataServiceProviders: Array<Provider> = [
  {
    provide: PrizeDataServicePort,
    useClass: PrizeDataServiceIndexedDb,
  },
];
