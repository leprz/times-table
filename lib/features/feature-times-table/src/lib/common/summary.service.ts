import { Injectable } from '@angular/core';
import { ExerciseScorePolicy } from './exercise-score.policy';

export interface ExerciseTry {
  operandA: number;
  operandB: number;
  answer: number | null;
  answerTime: number;
  isCorrect: boolean;
}

export class ExerciseTryUtil {
  static countCorrect(tries: ExerciseTry[]): number {
    return tries.reduce((count, try_) => count + (try_.isCorrect ? 1 : 0), 0);
  }

  static filterIncorrect(tries: ExerciseTry[]): ExerciseTry[] {
    return tries.filter((try_) => !try_.isCorrect);
  }

  static countTotalAnswerTime(tries: ExerciseTry[]): number {
    return tries.reduce((sum, try_) => sum + try_.answerTime, 0);
  }

  static countIncorrect(tries: ExerciseTry[]): number {
    return tries.reduce((count, try_) => count + (!try_.isCorrect ? 1 : 0), 0);
  }

  static countTotal(tries: ExerciseTry[]): number {
    return tries.length;
  }
}

export interface Exercise {
  multiplicand?: number;
  tries: ExerciseTry[];
}

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  static readonly TOTAL_SCORE = 1000;
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

  init(multiplicand?: number): void {
    this.exercise = {
      multiplicand,
      tries: []
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
    return ExerciseTryUtil.filterIncorrect(this.exercise?.tries ?? []);
  }

  calculateScore(): number {
    const exercise = this.exercise;
    if (!exercise) {
      throw new Error('Exercise is not initialized');
    }


    if (exercise.multiplicand !== undefined) {
      return this.exerciseScorePolicy.calculateScore({
        totalPoints: SummaryService.TOTAL_SCORE,
        totalTries: ExerciseTryUtil.countTotal(exercise.tries),
        correctTries: ExerciseTryUtil.countCorrect(exercise.tries)
      });
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
