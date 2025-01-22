import { Component, effect, inject, signal, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Card,
  CardPresenterUtils,
  CardUtils,
  MemoryCardComponent,
  MemoryMatcherComponent,
} from '@org/feature-memory';
import { FeatureTimerComponent } from '@org/feature-times-table';
import {
  LayoutModeService,
  OnInitComponent,
  PageCommonRouteParamsComponent,
} from '@org/page-common';
import { FeatureMemoryColorsDeckComponent } from '@org/feature-memory-colors';
import { Router } from '@angular/router';
import { tlLinks } from '@org/page-tl-common';
import { FeatureSoundComponent } from '@org/feature-sound';
import { UiAnimationFileComponent } from '@org/ui-animation';

@Component({
  imports: [
    CommonModule,
    MemoryCardComponent,
    FeatureTimerComponent,
    PageCommonRouteParamsComponent,
    OnInitComponent,
    FeatureMemoryColorsDeckComponent,
    FeatureSoundComponent,
    MemoryMatcherComponent,
    UiAnimationFileComponent,
  ],
  templateUrl: './page-learn-colors.component.html',
  styleUrl: './page-learn-colors.component.scss',
})
export class PageLearnColorsComponent {
  protected readonly cards = signal<Card[]>([]);
  protected readonly disabled = signal<boolean>(true);
  private readonly cardPresenters = viewChildren(MemoryCardComponent);
  private readonly layoutModeService = inject(LayoutModeService);
  private readonly router = inject(Router);

  navigateToSummary(): Promise<boolean> {
    return this.router.navigate([tlLinks.learn_summary]);
  }
  constructor() {
    effect(() => {
      if (this.cardPresenters().length > 0) {
        this.flipAllCards();
      }
    });
    this.layoutModeService.applyMode('tiny-learners-distraction-free');
  }

  present(deck: Card[]): void {
    this.cards.set(CardUtils.shuffle(deck));
  }

  disable(): void {
    this.disabled.set(true);
  }

  enable(): void {
    this.disabled.set(false);
  }

  isDisabled(): boolean {
    return this.disabled();
  }

  flipAllCards(): void {
    CardPresenterUtils.showAll(this.cardPresenters(), true);
    this.disabled.set(false);
  }

  protected readonly parseInt = parseInt;
}
