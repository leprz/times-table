import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FeatureExerciseComponent,
  FeatureTimerComponent,
  FormatEquationPipe,
  RandomQuizAnswerListComponent
} from '@org/feature-times-table';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { links } from '@org/page-common';

@Component({
  standalone: true,
  imports: [CommonModule, RandomQuizAnswerListComponent, FeatureExerciseComponent, FeatureTimerComponent, FormatEquationPipe],
  templateUrl: './page-times-table-quiz.component.html',
  styleUrl: './page-times-table-quiz.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTimesTableQuizComponent {
  private readonly paramMap = toSignal(this.activatedRoute.paramMap);
  readonly multiplicand = computed(
    () => +(this.paramMap()?.get('multiplicand') ?? 1)
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  async navigateToSummary(): Promise<void> {
    await this.router.navigate([links.summary], {
      skipLocationChange: true,
    });
  }
}
