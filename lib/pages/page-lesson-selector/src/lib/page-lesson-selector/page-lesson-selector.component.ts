import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LayoutModeService, links } from '@org/page-common';
import { FeatureHighScoreComponent } from '@org/feature-high-score';
import { UiBadgeHighScoreComponent } from '@org/ui-badge';
import { OperationKey } from '@org/feature-times-table';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FeatureHighScoreComponent,
    UiBadgeHighScoreComponent,
  ],
  templateUrl: './page-lesson-selector.component.html',
  styleUrl: './page-lesson-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLessonSelectorComponent {
  protected readonly links = links;
  protected readonly Operation = OperationKey;
  private readonly layoutModeService = inject(LayoutModeService);

  constructor() {
    this.layoutModeService.applyMode('normal');
  }
}
