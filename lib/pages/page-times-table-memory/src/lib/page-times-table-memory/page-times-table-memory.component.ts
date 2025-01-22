import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FeatureMemoryBoardComponent,
  FeatureMemoryCardMathOperationDeckComponent,
} from '@org/feature-memory';
import { LayoutModeService, links, OnInitComponent } from '@org/page-common';
import {
  FeatureScoreComponent,
  FeatureTimerComponent,
  FormatHighScorePipe,
  OperationKey,
} from '@org/feature-times-table';
import { Router } from '@angular/router';
import { FeatureHighScoreComponent } from '@org/feature-high-score';
import { UiBadgeHighScoreComponent } from '@org/ui-badge';
import { UiTeleportToDirective } from '@org/ui-teleport';
import { FeatureSoundComponent } from '@org/feature-sound';

@Component({
  imports: [
    CommonModule,
    FeatureMemoryBoardComponent,
    OnInitComponent,
    FeatureMemoryCardMathOperationDeckComponent,
    FeatureTimerComponent,
    FeatureScoreComponent,
    FeatureHighScoreComponent,
    FormatHighScorePipe,
    UiBadgeHighScoreComponent,
    UiTeleportToDirective,
    FeatureSoundComponent,
  ],
  templateUrl: './page-times-table-memory.component.html',
  styleUrl: './page-times-table-memory.component.css',
})
export class PageTimesTableMemoryComponent {
  private readonly router = inject(Router);
  private readonly layoutMode = inject(LayoutModeService);
  protected readonly boardSize = signal(12);
  constructor() {
    this.layoutMode.applyMode('distraction-free');
  }

  async navigateToSummary(): Promise<void> {
    await this.router.navigate([links.summary]);
  }

  protected readonly OperationKey = OperationKey;
}
