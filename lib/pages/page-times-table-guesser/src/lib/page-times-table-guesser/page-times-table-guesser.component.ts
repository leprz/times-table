import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { links } from '@org/page-common';
import {
  FeatureExerciseComponent,
  FormatEquationPipe,
  FormatHighScorePipe,
  FeatureScoreComponent,
  FeatureTimerComponent
} from '@org/feature-times-table';
import { UiKeyboardComponent } from '@org/ui-keyboard';

@Component({
  standalone: true,
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
  ],
  templateUrl: './page-times-table-guesser.component.html',
  styleUrl: './page-times-table-guesser.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTimesTableGuesserComponent {
  private readonly router = inject(Router);

  async navigateToSummary(): Promise<void> {
    await this.router.navigate([links.summary]);
  }
}
