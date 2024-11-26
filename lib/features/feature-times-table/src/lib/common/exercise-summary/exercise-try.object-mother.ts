import { ExerciseTry } from './exercise-try.interface';

export class ExerciseTryObjectMother {
  static correct(): ExerciseTry {
    return {
      operation: '2 * 3',
      answerGiven: 6,
      answerCorrect: 6,
      isCorrect: true,
      answerTime: 0,
    };
  }

  static incorrect(): ExerciseTry {
    return {
      operation: '2 * 3',
      answerGiven: 5,
      answerCorrect: 6,
      isCorrect: false,
      answerTime: 0,
    };
  }
}
