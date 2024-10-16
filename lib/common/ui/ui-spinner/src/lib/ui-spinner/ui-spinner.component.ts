import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatestWith, interval, map, of, take } from 'rxjs';

@Component({
  selector: 'ui-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-spinner.component.html',
  styleUrl: './ui-spinner.component.scss',
})
export class UiSpinnerComponent {
  readonly isVisible$ = of(false).pipe(
    combineLatestWith(interval(300).pipe(take(1))),
    map(() => true)
  );
}
