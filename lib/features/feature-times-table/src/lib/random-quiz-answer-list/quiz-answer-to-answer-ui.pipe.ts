import { Pipe, PipeTransform } from '@angular/core';
import { UiAnswer } from './random-quiz-answer-list.component';
import { QuizAnswerItem } from '@org/ui-quiz-answer-item';

@Pipe({
  name: 'mapQuizAnswerToAnswerUi',
  pure: true,
  standalone: true,
})
export class QuizAnswerToAnswerUiPipe implements PipeTransform {
  transform(value: UiAnswer, correctAnswer: number): QuizAnswerItem {
    return {
      label: parseInt(value.label),
      isCorrect: parseInt(value.value) === correctAnswer,
    };
  }
}
