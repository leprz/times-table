import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageCreateLinkQuizQuestionPipePipe } from './link-quiz-question.pipe';
import { links } from '@org/page-common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, PageCreateLinkQuizQuestionPipePipe],
  templateUrl: './page-multiplicand-selector.component.html',
  styleUrl: './page-multiplicand-selector.component.scss',
})
export class PageMultiplicandSelectorComponent {
  multiplicands = Array.from({ length: 9 }, (_, i) => i + 1);
  protected readonly links = links;
}
