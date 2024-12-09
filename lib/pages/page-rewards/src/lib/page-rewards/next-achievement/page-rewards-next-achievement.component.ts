import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCoinsComponent } from '@org/feature-coins';
import { FeaturePrizeSearchComponent } from '@org/feature-prize';
import { LayoutModeService, OnInitComponent } from '@org/page-common';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { RouterLink } from '@angular/router';
import { PageRewardsNextAchievementProgressBarComponent } from './next-achievement-progress-bar/next-achievement-progress-bar.component';
import { FeatureRewardListComponent } from '@org/feature-rewards';

@Component({
  selector: 'page-rewards-next-achievement',
  imports: [
    CommonModule,
    FeatureCoinsComponent,
    FeaturePrizeSearchComponent,
    FastSvgComponent,
    RouterLink,
    PageRewardsNextAchievementProgressBarComponent,
    FeatureRewardListComponent,
    OnInitComponent,
  ],
  templateUrl: './page-rewards-next-achievement.component.html',
  styleUrl: './page-rewards-next-achievement.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageRewardsNextAchievementComponent {
  layoutModeService = inject(LayoutModeService);

  constructor() {
    this.layoutModeService.applyMode('distraction-free');
  }
}
