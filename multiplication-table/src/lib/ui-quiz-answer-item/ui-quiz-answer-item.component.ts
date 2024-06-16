import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface QuizAnswerItem {
  label: number;
  isCorrect: boolean;
}

@Component({
  selector: 'lib-ui-quiz-answer-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-quiz-answer-item.component.html',
  styleUrl: './ui-quiz-answer-item.component.css',
})
export class UiQuizAnswerItemComponent {
  answer = input.required<QuizAnswerItem>()
  isCorrect = input<boolean | null>(null)
  isAnswered = signal<boolean>(false);

  onAnswerClick() {
    this.isAnswered.set(true);
  }
}
