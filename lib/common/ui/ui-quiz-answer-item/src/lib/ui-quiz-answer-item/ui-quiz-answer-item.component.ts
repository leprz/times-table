import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface QuizAnswerItem {
  label: number;
  isCorrect: boolean;
}

@Component({
  selector: 'ui-quiz-answer-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-quiz-answer-item.component.html',
  styleUrl: './ui-quiz-answer-item.component.css',
})
export class UiQuizAnswerItemComponent {
  answer = input.required<QuizAnswerItem>();
  isDisabled = input<boolean>(false);
  isCorrect = input<boolean | null>(null);
  isAnswered = signal<boolean>(false);

  onAnswerClick(): void {
    if (!this.isDisabled()) {
      this.isAnswered.set(true);
    }
  }
}
