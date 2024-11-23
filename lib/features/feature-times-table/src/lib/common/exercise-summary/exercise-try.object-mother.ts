import { ExerciseTry } from './exercise-try.interface';

export class ExerciseTryObjectMother {
  static correct(): ExerciseTry {
    return {
      operandA: 2,
      operandB: 3,
      answer: 6,
      correctAnswer: 6,
      isCorrect: true,
      answerTime: 0,
    };
  }

  static incorrect(): ExerciseTry {
    return {
      operandA: 2,
      operandB: 3,
      answer: 5,
      correctAnswer: 6,
      isCorrect: false,
      answerTime: 0,
    };
  }
}
