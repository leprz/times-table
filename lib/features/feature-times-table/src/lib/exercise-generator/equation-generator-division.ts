import { EquationGeneratorPort } from './equation-generator.port';
import { Equation, Operation } from './exercise-generator';

export class EquationGeneratorDivision implements EquationGeneratorPort{
  getOperationSign(): string {
    return ':';
  }
  generateEquation(
    multiplicand: number,
    multiplier: number
  ): Equation {
    return {
      operandA: multiplicand * multiplier,
      operandB: multiplier,
      product: multiplicand,
      operation: Operation.Division
    };
  }
}
