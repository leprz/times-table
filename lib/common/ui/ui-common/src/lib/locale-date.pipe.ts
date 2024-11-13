import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeDate',
  standalone: true,
  // pure: true
})
export class LocaleDatePipe implements PipeTransform {
  transform(value: Date | null): string {
    return value ? value.toLocaleDateString() : '';
  }
}
