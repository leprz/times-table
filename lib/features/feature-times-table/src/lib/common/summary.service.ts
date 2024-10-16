import { Injectable } from '@angular/core';

export interface ExerciseTry {
  operandA: number;
  operandB: number;
  answer: number | null;
  answerTime: number;
  isCorrect: boolean;
}

export interface Exercise {
  multiplicand?: number;
  tries: ExerciseTry[];
}

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  static readonly TOTAL_SCORE = 1000;
  private exercise: Exercise | null = null;

  recordTry(try_: ExerciseTry): void {
    if (!this.exercise) {
      throw new Error('Exercise is not initialized');
    }

    this.exercise?.tries.push(try_);
  }

  init(multiplicand?: number): void {
    this.exercise = {
      multiplicand,
      tries: [],
    };
  }

  isInitialized(): boolean {
    return this.exercise !== null;
  }

  hasTotalScore(): boolean {
    return this.exercise?.multiplicand !== undefined;
  }

  getMultiplicand(): number {
    return this.exercise?.multiplicand ?? 0;
  }

  getWrongAnswers(): ExerciseTry[] {
    return this.exercise
      ? this.exercise.tries.filter((try_) => !try_.isCorrect)
      : [];
  }

  calculateScore(): number {
    const exercise = this.exercise;
    if (!exercise) {
      throw new Error('Exercise is not initialized');
    }

    if (exercise?.multiplicand === undefined) {
      // means we use time based calculation
      const score = exercise.tries.reduce(
        (score, try_) => score + (try_.isCorrect ? 1 : 0) * 100,
        0
      );

      return Math.round(score);
    }

    const score = exercise.tries.reduce(
      (score, try_) =>
        score +
        ((try_.isCorrect ? 1 : 0) *
          (SummaryService.TOTAL_SCORE / exercise.tries.length)) /
          (try_.answerTime + 1),
      0
    );

    return Math.round(score);
  }
}
