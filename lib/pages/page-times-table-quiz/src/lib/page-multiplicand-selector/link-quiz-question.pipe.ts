import { Pipe, PipeTransform } from '@angular/core';

import { links } from '@org/page-common';

@Pipe({
  pure: true,
  standalone: true,
  name: 'pageCreateLinkQuizQuestionPipe',
})
export class PageCreateLinkQuizQuestionPipePipe implements PipeTransform {
  transform(value: number): string {
    return links.multiplication_quiz__$multiplicand.replace(':multiplicand', value.toString());
  }
}
