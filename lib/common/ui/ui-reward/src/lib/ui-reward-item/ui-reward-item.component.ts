import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { LocaleDatePipe } from '@org/ui-common';

export interface UiRewardItem {
  name: string;
  requiredPoints: number;
  achievedAt: Date | null;
  isCollected: boolean;
}

@Component({
  selector: 'ui-reward-item',
  standalone: true,
  imports: [CommonModule, FastSvgComponent, LocaleDatePipe],
  templateUrl: './ui-reward-item.component.html',
  styleUrl: './ui-reward-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiRewardItemComponent {
  data = input.required<UiRewardItem>();
}
