import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LayoutModeService, links } from '@org/page-common';
import {
  FeatureExerciseComponent,
  FeatureScoreComponent,
  FeatureTimerComponent,
  FormatEquationPipe,
  FormatHighScorePipe,
} from '@org/feature-times-table';
import { UiKeyboardComponent } from '@org/ui-keyboard';
import { FeatureHighScoreComponent } from '@org/feature-high-score';
import { UiTeleportToDirective } from '@org/ui-teleport';
import { UiBadgeHighScoreComponent } from '@org/ui-badge';
import { FeatureSoundComponent } from '@org/feature-sound';
import { shakeOnEnter } from '@org/ui-animation';

@Component({
  imports: [
    CommonModule,
    UiKeyboardComponent,
    FeatureTimerComponent,
    FeatureExerciseComponent,
    FeatureScoreComponent,
    FormatEquationPipe,
    FormatHighScorePipe,
    FeatureExerciseComponent,
    FormatEquationPipe,
    FormatHighScorePipe,
    FeatureScoreComponent,
    FeatureTimerComponent,
    FeatureHighScoreComponent,
    UiTeleportToDirective,
    UiBadgeHighScoreComponent,
    FeatureSoundComponent,
  ],
  templateUrl: './page-times-table-guesser.component.html',
  styleUrl: './page-times-table-guesser.component.scss',
  animations: [shakeOnEnter],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTimesTableGuesserComponent {
  private readonly router = inject(Router);
  private readonly layoutModeService = inject(LayoutModeService);

  constructor() {
    this.layoutModeService.applyMode('distraction-free');
  }

  async navigateToSummary(): Promise<void> {
    await this.router.navigate([links.summary]);
  }
}
