import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { UiDialogComponent } from '@org/ui-dialog';
import { FormatHighScorePipe } from '@org/feature-times-table';
import { PageCommonPrizeListComponent } from './prize-list/page-common-prize-list.component';
import { FeatureCoinsComponent } from '@org/feature-coins';
import { FeaturePrizeCreateComponent } from '@org/feature-prize';
import { RouterLink } from '@angular/router';
import { links } from '../links';
import { OnInitComponent } from '../on-init/on-init.component';
import { FeatureRewardListComponent } from '@org/feature-rewards';
import { FeatureHighScoreComponent } from '@org/feature-high-score';
import { UiBadgeHighScoreComponent } from '@org/ui-badge';

@Component({
  selector: 'page-common-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    FastSvgComponent,
    UiDialogComponent,
    FormatHighScorePipe,
    PageCommonPrizeListComponent,
    FeatureCoinsComponent,
    FeaturePrizeCreateComponent,
    RouterLink,
    FeatureRewardListComponent,
    OnInitComponent,
    FeatureHighScoreComponent,
    UiBadgeHighScoreComponent
  ],
  templateUrl: './page-common-top-bar.component.html',
  styleUrl: './page-common-top-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageCommonTopBarComponent {
  protected readonly links = links;
}
