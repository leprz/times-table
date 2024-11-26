import { inject, Injectable } from '@angular/core';
import { ExerciseScorePolicy } from '../exercise-score.policy';
import { ExerciseTry, ExerciseTryUtil } from './exercise-try.interface';
import { OperationKey } from '../../exercise-generator/exercise-generator';
import { ExerciseFinishedEvent } from '@org/common-events';
import { MessageBus } from '@org/message-bus';

export interface ExerciseSummary {
  wrongAnswers: ExerciseTry[];
  score: number;
  highScoreKey?: string;
}

export interface SummaryPresenter {
  showExerciseSummary(summary: ExerciseSummary): void;
}

export interface Exercise {
  tries: ExerciseTry[];
  operation: OperationKey;
}

@Injectable({
  providedIn: 'root',
})
export class ExerciseSummaryService {
  messageBus = inject(MessageBus);

  private exercise: Exercise | null = null;

  constructor(private readonly exerciseScorePolicy: ExerciseScorePolicy) {}

  init(operation: OperationKey): void {
    this.exercise = {
      tries: [],
      operation,
    };
  }

  recordTry(exerciseTry: ExerciseTry): void {
    if (!this.exercise) {
      throw new Error('Exercise is not initialized');
    }

    this.exercise?.tries.push(exerciseTry);
  }

  isInitialized(): boolean {
    return this.exercise !== null;
  }

  calculateScore(): number {
    const exercise = this.exercise;
    if (!exercise) {
      throw new Error('Exercise is not initialized');
    }

    return this.exerciseScorePolicy.calculateScore({
      totalTries: ExerciseTryUtil.countTotal(exercise.tries),
      correctTries: ExerciseTryUtil.countCorrect(exercise.tries),
    });
  }

  finishExercise(summary: SummaryPresenter): void {
    const score = this.calculateScore();
    summary.showExerciseSummary({
      score,
      wrongAnswers: this.getWrongAnswers(),
      highScoreKey: this.exercise?.operation,
    });

    this.messageBus.emit(
      new ExerciseFinishedEvent({
        totalScore: score,
        exerciseKey: this.exercise?.operation.toString(),
      }),
    );

    this.reset();
  }

  reset(): void {
    this.exercise = null;
  }

  private getWrongAnswers(): ExerciseTry[] {
    return ExerciseTryUtil.filterIncorrect(this.exercise?.tries ?? []);
  }
}
