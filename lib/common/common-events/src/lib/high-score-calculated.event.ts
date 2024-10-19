import { Event } from '@org/message-bus';

export class HighScoreCalculatedEvent extends Event<{ highScore: number }> {
  constructor(payload: { highScore: number }) {
    super(payload);
  }
}