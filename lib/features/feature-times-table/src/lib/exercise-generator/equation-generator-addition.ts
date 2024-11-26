import { EquationGeneratorPort } from './equation-generator.port';
import { Equation, OperationKey } from './exercise-generator';
import { inject, Injectable } from '@angular/core';
import { ExpressionBuilder } from '../complex-operation/complex-operation';

@Injectable({
  providedIn: 'root',
})
export class EquationGeneratorAddition extends EquationGeneratorPort {
  private readonly eb = inject(ExpressionBuilder);
  protected operationKey: OperationKey = OperationKey.Addition;

  generateEquation(addendA: number, addendB: number): Equation {
    const operation = this.eb.sumNum(addendA, addendB);
    return {
      operation,
      product: operation.evaluate(),
      operationKey: this.operationKey,
    };
  }
}
