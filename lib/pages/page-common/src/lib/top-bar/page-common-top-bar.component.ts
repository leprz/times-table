import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
import { LayoutMode, WithLayoutMode } from '../layout-mode/page-common-layout-mode.component';
import { UiTeleportOutletDirective } from '@org/ui-teleport';
import { ShareAppComponent } from '../share-app/share-app.component';
import { RouteManagerComponent } from '../route-manager.component';

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
    UiTeleportOutletDirective,
    ShareAppComponent,
    RouteManagerComponent
  ],
  templateUrl: './page-common-top-bar.component.html',
  styleUrl: './page-common-top-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageCommonTopBarComponent implements WithLayoutMode {
  protected readonly links = links;
  readonly isSettingsButtonVisible = signal(false);
  readonly isBackButtonVisible = signal(false);
  readonly isShareButtonVisible = signal(false);

  onLayoutModeChange(mode: LayoutMode): void {
    switch (mode) {
      default:
      case 'normal':
        this.isSettingsButtonVisible.set(true);
        this.isBackButtonVisible.set(false);
        this.isShareButtonVisible.set(true);
        break;
      case 'distraction-free':
        this.isSettingsButtonVisible.set(false);
        this.isBackButtonVisible.set(true);
        this.isShareButtonVisible.set(false);
        break;
    }
  }

  protected readonly console = console;
}
