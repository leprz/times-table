import { AfterViewInit, Component, computed, input, OnDestroy, output, signal } from '@angular/core';

@Component({
  selector: 'feature-timer',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class FeatureTimerComponent implements AfterViewInit, OnDestroy {
  timer = input.required<number>(); // seconds
  delay = input<number>(0); // seconds
  elapsedTime = signal(0);
  remainingTime = computed(() => this.timer() - this.elapsedTime());
  timesUp = output<void>();
  interval: ReturnType<typeof setInterval> | null = null;

  ngOnDestroy(): void {
    this.stop();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.start();
    }, this.delay() * 1000);
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  reset(): void {
    this.elapsedTime.set(0);
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.start();
  }

  start(): void {
    const interval = setInterval(() => {
      this.elapsedTime.set(this.elapsedTime() + 1);
      if (this.remainingTime() === 0) {
        clearInterval(interval);
        this.timesUp.emit();
      }
    }, 1000);

    this.interval = interval;
  }
}
