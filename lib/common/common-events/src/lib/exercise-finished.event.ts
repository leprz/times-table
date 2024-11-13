import { Event } from '@org/message-bus';

export class ExerciseFinishedEvent<
  T extends { totalScore: number; exerciseKey?: string },
> extends Event<T> {}
