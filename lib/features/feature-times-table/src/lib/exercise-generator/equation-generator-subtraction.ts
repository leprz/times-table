import { EquationGeneratorPort } from './equation-generator.port';
import { Equation, OperationKey } from './exercise-generator';
import { inject } from '@angular/core';
import { ExpressionBuilder } from '../complex-operation/complex-operation';

export class EquationGeneratorSubtraction extends EquationGeneratorPort {
  private readonly eb = inject(ExpressionBuilder);
  protected operationKey: OperationKey = OperationKey.Subtraction;

  generateEquation(minuend: number, subtrahend: number): Equation {
    const operation = this.eb.subNum(minuend + subtrahend, subtrahend);
    return {
      operation,
      product: operation.evaluate(),
      operationKey: this.operationKey,
    };
  }
}
