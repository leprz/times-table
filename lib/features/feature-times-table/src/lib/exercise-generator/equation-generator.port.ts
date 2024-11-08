import { Equation, Operation } from './exercise-generator';
import { ExerciseSummaryService } from '../common/exercise-summary/exercise-summary.service';

export abstract class EquationGeneratorPort {
  protected abstract operationSign: string;
  protected abstract operation: Operation;
  initialize(summaryService: ExerciseSummaryService): void {
    summaryService.init(this.operationSign, this.operation);
  }

  abstract generateEquation(
    multiplicand: number,
    multiplier: number
  ): Equation;
}