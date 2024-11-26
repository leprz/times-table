import { inject, Injectable } from '@angular/core';
import { EquationGeneratorPort } from './equation-generator.port';
import { ExerciseSummaryService } from '../common/exercise-summary/exercise-summary.service';
import { OperatorComposite } from '../complex-operation/complex-operation';

export enum OperationKey {
  Multiplication = 'multiplication',
  Division = 'division',
  Subtraction = 'subtraction',
  Addition = 'addition',
  ComplexOperation = 'complex-operation',
}

export interface Equation {
  product: number;
  operation: OperatorComposite;
  operationKey: OperationKey;
}

@Injectable()
export class ExerciseGenerator {
  private readonly equationGenerator = inject(EquationGeneratorPort);
  initialize(summaryService: ExerciseSummaryService): void {
    this.equationGenerator.initialize(summaryService);
  }

  generateEquations(
    minOperand1: number,
    maxOperand1: number,
    minOperand2: number,
    maxOperand2: number,
    count: number,
  ): Equation[] {
    return Array.from({ length: count }, (_, index) => {
      if (minOperand1 === maxOperand1) {
        return this.equationGenerator.generateEquation(
          minOperand1,
          minOperand2 + index,
        );
      }

      if (minOperand2 === maxOperand2) {
        return this.equationGenerator.generateEquation(
          minOperand1 + index,
          minOperand2,
        );
      }

      const operand1 =
        Math.floor(Math.random() * (maxOperand1 - minOperand1 + 1)) +
        minOperand1;
      const operand2 =
        Math.floor(Math.random() * (maxOperand2 - minOperand2 + 1)) +
        minOperand2;
      return this.equationGenerator.generateEquation(operand1, operand2);
    });
  }
}

export class Randomizer {
  static randomizeArray<T>(array: T[]): T[] {
    return array.slice().sort(() => Math.random() - 0.5);
  }
}
