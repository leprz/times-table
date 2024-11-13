import { EquationGeneratorPort } from './equation-generator.port';
import { Equation, Operation } from './exercise-generator';

export class EquationGeneratorDivision extends EquationGeneratorPort {
  protected operation: Operation = Operation.Division;
  protected operationSign = ':';

  generateEquation(multiplicand: number, multiplier: number): Equation {
    return {
      operandA: multiplicand * multiplier,
      operandB: multiplier,
      product: multiplicand,
      operation: Operation.Division,
    };
  }
}
