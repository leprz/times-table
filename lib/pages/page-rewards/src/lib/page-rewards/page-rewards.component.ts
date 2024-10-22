import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FeatureRewardListComponent,
  FeatureRewardsUpdateComponent,
  RewardItemToUiMapperPipe
} from '@org/feature-rewards';
import { UiRewardItemComponent } from '@org/ui-reward';
import { UiDialogClearComponent } from '@org/ui-dialog';
import { UiPrizeComponent } from '@org/ui-prize';
import { OnInitComponent } from '@org/page-common';
import { FeaturePrizeSearchComponent } from '@org/feature-prize';
import { FeatureCoinsComponent } from '@org/feature-coins';
import { UiProgressBarComponent } from '@org/ui-progress';
import { PageRewardsNextAchievementComponent } from './next-achievement/page-rewards-next-achievement.component';

@Component({
  standalone: true,
  imports: [CommonModule, FeatureRewardListComponent, OnInitComponent, UiRewardItemComponent, RewardItemToUiMapperPipe, UiPrizeComponent, UiDialogClearComponent, FeatureRewardsUpdateComponent, FeaturePrizeSearchComponent, FeatureCoinsComponent, UiProgressBarComponent, PageRewardsNextAchievementComponent],
  templateUrl: './page-rewards.component.html',
  styleUrl: './page-rewards.component.scss',
})
export class PageRewardsComponent {}
