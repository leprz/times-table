import { Component, computed, input, output, signal } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'ngx-lottie/lib/symbols';

@Component({
  selector: 'ui-animation-file',
  imports: [LottieComponent],
  styles: [
    `
      :host {
        line-height: 0;
      }
    `,
  ],
  template: `
    <ng-lottie
      [options]="options()"
      [width]="width()"
      (animationCreated)="onAnimationCreated($event)"
      (complete)="animationDone.emit()"
    />
  `,
})
export class UiAnimationFileComponent {
  public readonly autoplay = input(false);
  public readonly loop = input(false);
  public readonly width = input('2em');
  public readonly animationName = input.required<string>();
  public readonly animationDone = output();
  protected readonly options = computed<AnimationOptions>(() => ({
    path: `assets/animations/${this.animationName()}.json`,
    autoplay: this.autoplay(),
    loop: this.loop(),
  }));
  protected readonly animationItem = signal<AnimationItem | null>(null);
  protected readonly animationItemScheduledToPlay = signal(false);

  public replay() {
    if (this.animationItem()) {
      this.animationItem()?.goToAndPlay(0);
    } else {
      this.animationItemScheduledToPlay.set(true);
    }
  }

  public play() {
    const animationItem = this.animationItem();
    if (
      animationItem &&
      animationItem.currentFrame === animationItem.totalFrames - 1
    ) {
      this.replay();
    }
  }

  protected onAnimationCreated(animationItem: AnimationItem) {
    this.animationItem.set(animationItem);
    if (this.animationItemScheduledToPlay()) {
      this.animationItem()?.play();
    }
  }
}
