import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FeatureRewardListComponent,
  FeatureRewardsUpdateComponent,
  RewardItemToUiMapperPipe,
} from '@org/feature-rewards';
import { UiRewardItemComponent } from '@org/ui-reward';
import { UiDialogClearComponent } from '@org/ui-dialog';
import { UiPrizeComponent } from '@org/ui-prize';
import { LayoutModeService, links, OnInitComponent } from '@org/page-common';
import { PageRewardsNextAchievementComponent } from './next-achievement/page-rewards-next-achievement.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FeatureRewardListComponent,
    OnInitComponent,
    UiRewardItemComponent,
    RewardItemToUiMapperPipe,
    UiPrizeComponent,
    UiDialogClearComponent,
    FeatureRewardsUpdateComponent,
    PageRewardsNextAchievementComponent,
  ],
  templateUrl: './page-rewards.component.html',
  styleUrl: './page-rewards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageRewardsComponent {
  private readonly layoutModeService = inject(LayoutModeService);

  constructor() {
    this.layoutModeService.applyMode('normal');
  }

  protected readonly links = links;
}
