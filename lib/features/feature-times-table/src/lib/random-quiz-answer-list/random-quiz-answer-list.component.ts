import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizAnswerToAnswerUiPipe } from './quiz-answer-to-answer-ui.pipe';
import { v4 as uuidv4 } from 'uuid';
import { UiQuizAnswerItemComponent } from '@org/ui-quiz-answer-item';

export interface UiAnswer {
  id: string;
  label: string;
  value: string;
}

@Component({
  selector: 'feature-random-quiz-answer-list',
  standalone: true,
  imports: [CommonModule, QuizAnswerToAnswerUiPipe, UiQuizAnswerItemComponent],
  templateUrl: 'random-quiz-answer-list.component.html',
  styleUrl: 'random-quiz-answer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomQuizAnswerListComponent {
  isAnswered = input<boolean>(false);
  correctValue = input.required<number | undefined>();
  answersNumber = input<number>(3);
  answers = computed<UiAnswer[]>(() => {
    const correctAnswer = this.correctValue();
    if (correctAnswer === undefined) {
      return [];
    }
    const wrongAnswers: number[] = Array.from(
      { length: this.answersNumber() - 1 },
      () => correctAnswer,
    ).reduce<number[]>((acc, correctValue, currentIndex) => {
      const randomizer = this.answersNumber() / 2 > currentIndex ? -1 : 1;
      return [...acc, correctValue + currentIndex + 3 * randomizer];
    }, []);

    const answers = [correctAnswer, ...wrongAnswers].sort(
      () => Math.random() - 0.5,
    );
    return answers.map((label) => {
      return {
        id: uuidv4(),
        label: label.toString(),
        value: label.toString(),
      };
    });
  });

  answered = output<string>();
  onAnswerClick(value: string): void {
    if (!this.isAnswered()) {
      this.answered.emit(value);
    }
  }
}
