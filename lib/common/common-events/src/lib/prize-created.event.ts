import { Event } from '@org/message-bus';

export class PrizeCreatedEvent extends Event<{
  name: string;
  requiredPoints: number;
}> {
  constructor(payload: { name: string; requiredPoints: number }) {
    super(payload);
  }
}
