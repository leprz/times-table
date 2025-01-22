import { Component, effect, inject, signal, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Card,
  CardBoard,
  CardPresenterUtils,
  CardUtils,
  DeckPresenter,
  MemoryCardComponent,
  MemoryMatcherComponent,
} from '@org/feature-memory';
import { FeatureSoundComponent } from '@org/feature-sound';
import { FeatureTimerComponent } from '@org/feature-times-table';
import { FeatureMemoryNumbersDeckComponent } from '@org/feature-memory-numbers';
import {
  LayoutModeService,
  OnInitComponent,
  PageCommonRouteParamsComponent,
} from '@org/page-common';
import { Router } from '@angular/router';
import { tlLinks } from '@org/page-tl-common';
import { UiAnimationFileComponent } from '@org/ui-animation';

@Component({
  imports: [
    CommonModule,
    FeatureSoundComponent,
    MemoryCardComponent,
    MemoryMatcherComponent,
    FeatureTimerComponent,
    FeatureMemoryNumbersDeckComponent,
    OnInitComponent,
    PageCommonRouteParamsComponent,
    UiAnimationFileComponent,
  ],
  templateUrl: './page-learn-numbers.component.html',
  styleUrl: './page-learn-numbers.component.scss',
})
export class PageLearnNumbersComponent implements DeckPresenter, CardBoard {
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
