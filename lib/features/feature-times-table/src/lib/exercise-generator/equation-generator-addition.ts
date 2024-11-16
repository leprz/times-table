import { EquationGeneratorPort } from './equation-generator.port';
import { Equation, Operation } from './exercise-generator';

export class EquationGeneratorAddition extends EquationGeneratorPort {
  protected operation: Operation = Operation.Addition;
  protected operationSign = '+';

  generateEquation(operandA: number, operandB: number): Equation {
    return {
      operandA: operandA,
      operandB: operandB,
      product: operandA + operandB,
      operation: this.operation,
    };
  }
}

export class Randomizer {
  static randomizeArray<T>(array: T[]): T[] {
    return array.slice().sort(() => Math.random() - 0.5);
  }
}
