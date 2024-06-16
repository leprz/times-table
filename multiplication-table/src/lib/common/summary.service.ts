import { Injectable } from '@angular/core';

export interface ExerciseTry {
  multiplicand: number;
  multiplier: number;
  time: number;
  isCorrect: boolean;
}

export interface Exercise {
  multiplicand: number;
  tries: ExerciseTry[];
}

export interface Summary {
  multiplicand: number;
  multiplier: number;
  lastTryTime: number;
  tries: number;
}

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  static readonly TOTAL_SCORE = 1000;
  exercise: Exercise | null = null;

  recordTry(try_: ExerciseTry): void {
    this.exercise?.tries.push(try_);
  }

  resetLastTries(multiplicand: number): void {
    this.exercise = {
      multiplicand,
      tries: []
    };
  }

  static generateSummaryForMultiplicand(Exercise: Exercise): Summary {
    const { multiplicand, tries } = Exercise;
    const filteredTries = tries.filter((try_) => try_.multiplicand === multiplicand);
    const lastTry = filteredTries[filteredTries.length - 1];
    return {
      multiplicand,
      multiplier: lastTry.multiplier,
      lastTryTime: lastTry.time,
      tries: filteredTries.length
    };
  }

  static calculateScore(exercise: Exercise): number {
    const score = exercise.tries.reduce(
      (score, try_) =>
        score + (try_.isCorrect ? 1 : 0) * (this.TOTAL_SCORE / exercise.tries.length) / (try_.time + 1)
      , 0
    );

    return Math.round(score);
  }
}