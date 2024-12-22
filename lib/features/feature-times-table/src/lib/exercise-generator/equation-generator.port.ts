import { Equation, OperationKey } from './exercise-generator';
import { ExerciseSummaryService } from '../common/exercise-summary/exercise-summary.service';
import { HighScoreInitializer } from '@org/feature-common';

export abstract class EquationGeneratorPort {
  protected abstract readonly operationKey: OperationKey;
  initialize(summaryService: ExerciseSummaryService): void {
    summaryService.init(this.operationKey);
  }

  initializeHighScoreKey(initializer: HighScoreInitializer): void {
    initializer.initializeHighScoreKey(this.operationKey);
  }

  abstract generateEquation(operand1: number, operand2: number): Equation;
}
