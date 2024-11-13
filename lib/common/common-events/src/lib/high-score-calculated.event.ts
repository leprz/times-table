import { Event } from '@org/message-bus';

export class HighScoreCalculatedEvent<
  T extends { highScore: number; exerciseKey?: string },
> extends Event<T> {}
