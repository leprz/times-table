import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatHighScore',
  standalone: true,
  pure: true,
})
export class FormatHighScorePipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null) {
      return '';
    }

    return `⋆${value}⋆`;
  }
}
