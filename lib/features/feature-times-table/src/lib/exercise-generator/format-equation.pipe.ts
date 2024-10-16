import { Pipe, PipeTransform } from '@angular/core';
import { Equation } from './multiplication-generator';

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

    return `${value.operandA} x ${value.operandB} = ${product}`;
  }
}
