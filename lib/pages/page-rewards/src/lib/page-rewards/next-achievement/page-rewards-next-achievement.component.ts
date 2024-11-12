import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCoinsComponent } from '@org/feature-coins';
import { FeaturePrizeSearchComponent } from '@org/feature-prize';
import { LayoutModeService, OnInitComponent } from '@org/page-common';
import { UiProgressBarComponent } from '@org/ui-progress';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'page-rewards-next-achievement',
  standalone: true,
  imports: [CommonModule, FeatureCoinsComponent, FeaturePrizeSearchComponent, OnInitComponent, UiProgressBarComponent, FastSvgComponent, RouterLink],
  templateUrl: './page-rewards-next-achievement.component.html',
  styleUrl: './page-rewards-next-achievement.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageRewardsNextAchievementComponent {
  highestReward = input.required<number | null>();
  layoutModeService = inject(LayoutModeService);

  constructor() {
    this.layoutModeService.applyMode('distraction-free');
  }
}
