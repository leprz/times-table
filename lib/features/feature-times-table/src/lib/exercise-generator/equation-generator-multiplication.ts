import { EquationGeneratorPort } from './equation-generator.port';
import { Equation, Operation } from './exercise-generator';

export class EquationGeneratorMultiplication extends EquationGeneratorPort {
  protected operation: Operation = Operation.Multiplication;
  protected operationSign = 'x';

  generateEquation(multiplicand: number, multiplier: number): Equation {
    return {
      operandA: multiplicand,
      operandB: multiplier,
      product: multiplicand * multiplier,
      operation: Operation.Multiplication,
    };
  }
}

export class Randomizer {
  static randomizeArray<T>(array: T[]): T[] {
    return array.slice().sort(() => Math.random() - 0.5);
  }
}
