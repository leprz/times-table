import { EquationGeneratorPort } from './equation-generator.port';
import { Equation, OperationKey } from './exercise-generator';
import { ExpressionBuilder } from '../complex-operation/complex-operation';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EquationGeneratorMultiplication extends EquationGeneratorPort {
  private readonly eb = inject(ExpressionBuilder);
  protected operationKey: OperationKey = OperationKey.Multiplication;

  generateEquation(multiplicand: number, multiplier: number): Equation {
    const operation = this.eb.mulNum(multiplicand, multiplier);
    return {
      operation,
      product: operation.evaluate(),
      operationKey: OperationKey.Multiplication,
    };
  }
}
