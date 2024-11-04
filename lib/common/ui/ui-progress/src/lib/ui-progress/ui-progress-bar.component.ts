import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-progress-bar.component.html',
  styleUrl: './ui-progress-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiProgressBarComponent {
  current = input.required<number>();
  max = input.required<number>();
}
