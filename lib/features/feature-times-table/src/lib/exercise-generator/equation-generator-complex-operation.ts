import { EquationGeneratorPort } from './equation-generator.port';
import { Equation, OperationKey } from './exercise-generator';
import {
  ExpressionBuilder,
  OperatorComposite,
} from '../complex-operation/complex-operation';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EquationGeneratorComplexOperation extends EquationGeneratorPort {
  private readonly eb = inject(ExpressionBuilder);
  protected operationKey: OperationKey = OperationKey.ComplexOperation;

  generateEquation(): Equation {
    const operands = Array.from(
      { length: 3 },
      () => Math.floor(Math.random() * 10) + 1,
    );
    const operations: OperatorComposite[] = [];

    for (let i = 0; i < operands.length - 1; i++) {
      const operand1 = operands[i];

      let operand2: number | null;
      if (i === 0) {
        operand2 = null; // make it little bit easier
      } else {
        operand2 = operands[i + 1];
      }
      operations.push(
        this.generateRandomOperation(operand1, operand2, [
          OperationKey.Addition,
          OperationKey.Subtraction,
          OperationKey.Multiplication,
          OperationKey.Division,
        ]),
      );
    }

    const operation: OperatorComposite = OperatorComposite.combine(operations);

    const result: number = operation.evaluate();

    if (result < 0 || result > 100 || !Number.isInteger(result)) {
      return this.generateEquation(); // Retry if the result is out of bounds
    }

    return {
      operation,
      product: operation.evaluate(),
      operationKey: this.operationKey,
    };
  }

  private getRandomOperationKey(keys: OperationKey[]): OperationKey {
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex] as OperationKey;
  }

  private generateRandomOperation(
    operand1: number,
    operand2: number | null,
    allowedOperations: OperationKey[],
  ): OperatorComposite {
    const operationKey = this.getRandomOperationKey(allowedOperations);
    switch (operationKey) {
      default:
      case OperationKey.Addition:
        return this.eb.sumNum(...this.filterNulls([operand1, operand2]));
      case OperationKey.Subtraction:
        return this.eb.subNum(
          ...this.filterNulls([operand1 + (operand2 ?? 0), operand2]),
        );
      case OperationKey.Multiplication:
        return this.eb.mulNum(...this.filterNulls([operand1, operand2]));
      case OperationKey.Division:
        return this.eb.divNum(
          ...this.filterNulls([operand1 * (operand2 ?? 1), operand2]),
        );
    }
  }

  // TODO move to utils
  private filterNulls<T>(array: (T | null)[]): T[] {
    return array.filter((item): item is T => item !== null);
  }
}
