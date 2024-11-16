import { EquationGeneratorPort } from './equation-generator.port';
import { Equation, Operation } from './exercise-generator';

export class EquationGeneratorSubtraction extends EquationGeneratorPort {
  protected operation: Operation = Operation.Subtraction;
  protected operationSign = '-';

  generateEquation(operandA: number, operandB: number): Equation {
    return {
      operandA: operandA + operandB,
      operandB: operandB,
      product: operandA,
      operation: this.operation,
    };
  }
}

export class Randomizer {
  static randomizeArray<T>(array: T[]): T[] {
    return array.slice().sort(() => Math.random() - 0.5);
  }
}
