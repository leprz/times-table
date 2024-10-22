import { Event } from '@org/message-bus';

export class PrizeUpdatedEvent extends Event<void> {
  constructor() {
    super();
  }
}