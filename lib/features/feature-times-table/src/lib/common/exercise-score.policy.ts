import { Injectable } from '@angular/core';

export interface ExerciseScorePolicyData {
  totalTries: number;
  correctTries: number;
  incorrectTries?: number;
  totalPoints?: number;
  totalAnswerTimeInSec?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseScorePolicy {
  calculateScore(data: ExerciseScorePolicyData): number {
    if (data.totalAnswerTimeInSec === undefined) {
      data.totalAnswerTimeInSec = 0;
    }

    if (data.totalPoints) {
      return (data.correctTries / data.totalTries) * data.totalPoints;
    }

    return data.correctTries * 100;
  }
}
