import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTextPaintingComponent } from '@org/ui-text-painting';
import { FeatureSoundComponent } from '@org/feature-sound';
import { LayoutModeService, OnInitComponent } from '@org/page-common';
import { tlLinks } from '@org/page-tl-common';
import { Router } from '@angular/router';
import { UiAnimationFileComponent } from '@org/ui-animation';

@Component({
  selector: 'lib-page-learn-by-coloring',
  imports: [
    CommonModule,
    UiTextPaintingComponent,
    FeatureSoundComponent,
    OnInitComponent,
    UiAnimationFileComponent,
  ],
  templateUrl: './page-learn-by-coloring.component.html',
  styleUrl: './page-learn-by-coloring.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLearnByColoringComponent {
  readonly MAX_NUMBER = 3;
  readonly number = signal(1);
  readonly numberSoundDynamicName = computed(
    () => `number-pl-${this.number()}`,
  );
  private readonly router = inject(Router);
  private readonly layoutModeService = inject(LayoutModeService);

  constructor() {
    this.layoutModeService.applyMode('tiny-learners-distraction-free');
  }
  navigateToSummary(): Promise<boolean> {
    return this.router.navigate([tlLinks.learn_summary]);
  }
  async onDrawingFinished(sound: FeatureSoundComponent) {
    this.number.set(this.number() + 1);
    await sound.playSound();
  }

  async onSoundFinished(textPainting: UiTextPaintingComponent) {
    textPainting.print(this.number().toString());
    if (this.number() > this.MAX_NUMBER) {
      await this.navigateToSummary();
      return;
    }
  }
}
