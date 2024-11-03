import { Injectable } from '@angular/core';
import { ExerciseScorePolicy } from '../exercise-score.policy';
import { ExerciseTry, ExerciseTryUtil } from './exercise-try.interface';

export interface Exercise {
  tries: ExerciseTry[];
  operationSign: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExerciseSummaryService {

  private exercise: Exercise | null = null;

  constructor(
    private readonly exerciseScorePolicy: ExerciseScorePolicy,
  ) {
  }

  recordTry(try_: ExerciseTry): void {
    if (!this.exercise) {
      throw new Error('Exercise is not initialized');
    }

    this.exercise?.tries.push(try_);
  }

  init(operationSign: string): void {
    this.exercise = {
      tries: [],
      operationSign
    };
  }

  getOperationSign(): string {
    return this.exercise?.operationSign ?? '';
  }

  isInitialized(): boolean {
    return this.exercise !== null;
  }

  getWrongAnswers(): ExerciseTry[] {
    return ExerciseTryUtil.filterIncorrect(this.exercise?.tries ?? []);
  }

  calculateScore(): number {
    const exercise = this.exercise;
    if (!exercise) {
      throw new Error('Exercise is not initialized');
    }

    return this.exerciseScorePolicy.calculateScore({
      totalTries: ExerciseTryUtil.countTotal(exercise.tries),
      correctTries: ExerciseTryUtil.countCorrect(exercise.tries)
    });
  }

  reset(): void {
    this.exercise = null;
  }
}
