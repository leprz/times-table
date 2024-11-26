import { Equation, OperationKey } from './exercise-generator';
import { ExerciseSummaryService } from '../common/exercise-summary/exercise-summary.service';

export abstract class EquationGeneratorPort {
  protected abstract operationKey: OperationKey;
  initialize(summaryService: ExerciseSummaryService): void {
    summaryService.init(this.operationKey);
  }

  abstract generateEquation(operand1: number, operand2: number): Equation;
}
