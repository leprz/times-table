import { Equation } from './exercise-generator';

export abstract class EquationGeneratorPort {
  abstract getOperationSign(): string;
  abstract generateEquation(
    multiplicand: number,
    multiplier: number
  ): Equation;
}