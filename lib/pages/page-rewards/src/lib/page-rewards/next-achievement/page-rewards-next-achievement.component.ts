import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCoinsComponent } from '@org/feature-coins';
import { FeaturePrizeSearchComponent } from '@org/feature-prize';
import { OnInitComponent } from '@org/page-common';
import { UiProgressBarComponent } from '@org/ui-progress';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';

@Component({
  selector: 'page-rewards-next-achievement',
  standalone: true,
  imports: [CommonModule, FeatureCoinsComponent, FeaturePrizeSearchComponent, OnInitComponent, UiProgressBarComponent, FastSvgComponent],
  templateUrl: './page-rewards-next-achievement.component.html',
  styleUrl: './page-rewards-next-achievement.component.scss',
})
export class PageRewardsNextAchievementComponent {}
