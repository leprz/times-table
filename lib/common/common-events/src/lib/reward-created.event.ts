import { Event } from '@org/message-bus';

export class RewardCreatedEvent extends Event<void> {
  constructor() {
    super();
  }
}
