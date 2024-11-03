import { Pipe, PipeTransform } from '@angular/core';
import { Equation, Operation } from './exercise-generator';

@Pipe({
  name: 'formatEquation',
  standalone: true,
  pure: true,
})
export class FormatEquationPipe implements PipeTransform {
  transform(value: Equation | null, product: string): string {
    if (!value || product === null) {
      return '';
    }

    const sign = value.operation === Operation.Multiplication ? 'x' : '÷';

    return `${value.operandA} ${sign} ${value.operandB} = ${product}`;
  }
}
