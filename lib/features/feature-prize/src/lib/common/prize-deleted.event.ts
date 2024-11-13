import { Event } from '@org/message-bus';

export class PrizeDeletedEvent extends Event<void> {
  constructor() {
    super();
  }
}
