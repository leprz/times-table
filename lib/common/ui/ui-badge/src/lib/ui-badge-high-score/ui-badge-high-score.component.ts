import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';

@Component({
  selector: 'ui-badge-high-score',
  imports: [CommonModule, FastSvgComponent],
  templateUrl: './ui-badge-high-score.component.html',
  styleUrl: './ui-badge-high-score.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiBadgeHighScoreComponent {
  readonly highScore = input.required<number>();
}
