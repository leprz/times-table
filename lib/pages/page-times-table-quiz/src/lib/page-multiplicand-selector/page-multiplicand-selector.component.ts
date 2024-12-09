import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageCreateLinkQuizQuestionPipePipe } from './link-quiz-question.pipe';
import { LayoutModeService, links } from '@org/page-common';

@Component({
  imports: [CommonModule, RouterLink, PageCreateLinkQuizQuestionPipePipe],
  templateUrl: './page-multiplicand-selector.component.html',
  styleUrl: './page-multiplicand-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageMultiplicandSelectorComponent {
  multiplicands = Array.from({ length: 9 }, (_, i) => i + 1);
  protected readonly links = links;
  private readonly layoutModeService = inject(LayoutModeService);
  constructor() {
    this.layoutModeService.applyMode('distraction-free');
  }
}
