import { inject, Injectable } from '@angular/core';
import { EquationGeneratorPort } from './equation-generator.port';
import { ExerciseSummaryService } from '../common/exercise-summary/exercise-summary.service';

export enum Operation {
  Multiplication = 'multiplication',
  Division = 'division',
}

export interface Equation {
  operandA: number;
  operandB: number;
  product: number;
  operation: Operation;
}

@Injectable()
export class ExerciseGenerator {
  private readonly equationGenerator = inject(EquationGeneratorPort);
  initialize(summaryService: ExerciseSummaryService): void {
    this.equationGenerator.initialize(summaryService);
  }

  generateEquations(
    minMultiplicand: number,
    maxMultiplicand: number,
    minMultiplier: number,
    maxMultiplier: number,
    count: number,
  ): Equation[] {
    return Array.from({ length: count }, (_, index) => {
      if (minMultiplicand === maxMultiplicand) {
        return this.equationGenerator.generateEquation(
          minMultiplicand,
          minMultiplier + index,
        );
      }

      if (minMultiplier === maxMultiplier) {
        return this.equationGenerator.generateEquation(
          minMultiplicand + index,
          minMultiplier,
        );
      }

      const multiplicand =
        Math.floor(Math.random() * (maxMultiplicand - minMultiplicand + 1)) +
        minMultiplicand;
      const multiplier =
        Math.floor(Math.random() * (maxMultiplier - minMultiplier + 1)) +
        minMultiplier;
      return this.equationGenerator.generateEquation(multiplicand, multiplier);
    });
  }
}
