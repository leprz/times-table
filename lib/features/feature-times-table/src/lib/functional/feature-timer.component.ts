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
  startOnLoad = input<boolean>(true);
  isRunning = signal(false);
  timesUp = output<void>();
  timerStarted = output<void>();
  timerReset = output<void>();
  timerRestarted = output<void>();
  interval: ReturnType<typeof setInterval> | null = null;
  delayInterval: ReturnType<typeof setTimeout> | null = null;

  ngOnDestroy(): void {
    this.stop();
    if (this.delayInterval) {
      clearTimeout(this.delayInterval);
    }
  }

  ngAfterViewInit(): void {
    if (this.startOnLoad()) {
      const interval= setTimeout(() => {
        clearInterval(interval);
        this.start();
      }, this.delay() * 1000);
      this.delayInterval = interval;
    }
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.isRunning.set(false);
  }

  reset(): void {
    this.stop();
    this.elapsedTime.set(0);
    this.timerReset.emit();
  }

  restart(): void {
    this.reset();
    this.start();
    this.timerRestarted.emit();
  }

  start(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.isRunning.set(true);
    const interval = setInterval(() => {
      this.elapsedTime.set(this.elapsedTime() + 1);
      if (this.remainingTime() === 0) {
        clearInterval(interval);
        this.timesUp.emit();
      }
    }, 1000);

    this.interval = interval;
    this.timerStarted.emit();
  }
}
