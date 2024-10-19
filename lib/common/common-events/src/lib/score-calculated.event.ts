import { Event } from '@org/message-bus';

export class ScoreCalculatedEvent extends Event<{ exerciseTotalScore: number }> {
  constructor(payload: { exerciseTotalScore: number }) {
    super(payload);
  }
}