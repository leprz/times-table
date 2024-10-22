import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { UiDialogComponent } from '@org/ui-dialog';
import { FormatHighScorePipe, HighScoreService } from '@org/feature-times-table';
import { MessageBus } from '@org/message-bus';
import { HighScoreCalculatedEvent } from '@org/common-events';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageCommonPrizeListComponent } from './prize-list/page-common-prize-list.component';
import { FeatureCoinsComponent } from '@org/feature-coins';
import { FeaturePrizeCreateComponent } from '@org/feature-prize';
import { RouterLink } from '@angular/router';
import { links } from '../links';
import { OnInitComponent } from '../on-init/on-init.component';
import { FeatureRewardListComponent } from '@org/feature-rewards';

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
    OnInitComponent
  ],
  templateUrl: './page-common-top-bar.component.html',
  styleUrl: './page-common-top-bar.component.css'
})
export class PageCommonTopBarComponent {
  highScore = signal<number>(0);

  constructor(
    private readonly localStorageService: HighScoreService,
    protected readonly messageBusService: MessageBus
  ) {

    this.highScore.set(this.getHighScore());

    this.messageBusService.on(HighScoreCalculatedEvent, 'update high score in ui component')
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.highScore.set(this.getHighScore());
      });
  }

  protected getHighScore(): number {
    return this.localStorageService.getHighScore();
  }

  protected readonly links = links;
}
