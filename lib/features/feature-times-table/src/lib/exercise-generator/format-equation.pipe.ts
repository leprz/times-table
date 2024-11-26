import { Pipe, PipeTransform } from '@angular/core';
import { OperatorComposite } from '../complex-operation/complex-operation';

@Pipe({
  name: 'formatEquation',
  standalone: true,
  pure: true,
})
export class FormatEquationPipe implements PipeTransform {
  transform(
    value: OperatorComposite | null | undefined,
    product: string,
  ): string {
    if (!value) {
      return '';
    }

    return `${value.toPrettyString()} = ${product}`;
  }
}
