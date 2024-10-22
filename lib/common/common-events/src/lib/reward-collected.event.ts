import { Event } from '@org/message-bus';

export class RewardCollectedEvent extends Event<void> {
  constructor() {
    super();
  }
}