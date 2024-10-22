import { Component, input, OnDestroy, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';

export interface UiPrize {
  requiredPoints: number;
  prizeName: string;
}

@Component({
  selector: 'ui-prize',
  standalone: true,
  imports: [CommonModule, FastSvgComponent],
  templateUrl: './ui-prize.component.html',
  styleUrl: './ui-prize.component.scss',
})
export class UiPrizeComponent implements OnDestroy {
  readonly prize = input.required<UiPrize>();

  readonly isActive = signal(false);

  interval: ReturnType<typeof setInterval> | null = null;

  animationEnd = output<void>();

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  animate(): void {
    const interval = setInterval(() => {
      this.isActive.set(true);
      this.animationEnd.emit();
      clearInterval(interval);
    }, 500);
    this.interval = interval;
  }
}
