// TODO use Equation interface to unify formatEquation pipe
export interface ExerciseTry {
  operandA: number;
  operandB: number;
  answer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
  answerTime: number;
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
