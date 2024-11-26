import { EquationGeneratorPort } from './equation-generator.port';
import { Equation, OperationKey } from './exercise-generator';
import { inject } from '@angular/core';
import { ExpressionBuilder } from '../complex-operation/complex-operation';

export class EquationGeneratorDivision extends EquationGeneratorPort {
  private readonly eb = inject(ExpressionBuilder);
  protected operationKey: OperationKey = OperationKey.Division;

  generateEquation(dividend: number, divisor: number): Equation {
    const operation = this.eb.divNum(dividend * divisor, divisor);
    return {
      operation,
      product: operation.evaluate(),
      operationKey: OperationKey.Division,
    };
  }
}
