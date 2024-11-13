import { Event } from '@org/message-bus';

export class CoinsCalculatedEvent extends Event<{ totalCoins: number }> {
  constructor(payload: { totalCoins: number }) {
    super(payload);
  }
}
