import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  Equation,
  MultiplicationGenerator,
  Randomizer,
} from '../exercise-generator/multiplication-generator';
import { SummaryService } from '../common/summary.service';

@Component({
  selector: 'feature-exercise',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class FeatureExerciseComponent {
  numberOfExercises = input<number | null>(null);
  minMultiplicand = input<number>(1);
  maxMultiplicand = input<number>(9);
  minMultiplier = input<number>(1);
  maxMultiplier = input<number>(9);
  generatedExercises = signal<Equation[]>([]);
  exercises = computed(() => {
    return [
      ...Randomizer.randomizeArray(
        MultiplicationGenerator.list(
          this.minMultiplicand(),
          this.maxMultiplicand(),
          this.minMultiplier(),
          this.maxMultiplier(),
          this.numberOfExercises() ?? 1
        )
      ),
      ...this.generatedExercises(),
    ];
  });

  currentExerciseIndex = signal(0);
  currentExercise = computed<Equation | null>(
    () => this.exercises()[this.currentExerciseIndex()] ?? null
  );
  correctAnswers = signal(0);
  incorrectAnswers = signal(0);
  outputDelay = input<number>(0);
  isAnswered = signal(false);
  isCorrect = signal<boolean | null>(null);

  answered = output();
  answeredDelayed = output();
  exerciseCompleted = output();
  exerciseCompletedDelayed = output();

  summaryService = inject(SummaryService);

  constructor() {
    this.summaryService.init();
  }

  private delayedAction(action: () => void): void {
    const interval = setTimeout(() => {
      action();
      clearTimeout(interval);
    }, this.outputDelay() * 1000);
  }

  answer(answer: string | null, time?: number): void {
    const exercise = this.currentExercise();
    this.answered.emit();
    this.isAnswered.set(true);

    if (exercise && answer === null) {
      // record no answer
      this.summaryService.recordTry({
        operandB: exercise.operandB,
        operandA: exercise.operandA,
        answer: null,
        answerTime: time ?? 0,
        isCorrect: false,
      });
      this.isCorrect.set(false);
    }

    if (exercise && answer) {
      if (exercise.product === parseInt(answer)) {
        // record correct answer
        this.summaryService.recordTry({
          operandB: exercise.operandB,
          operandA: exercise.operandA,
          answer: parseInt(answer),
          answerTime: time ?? 0,
          isCorrect: true,
        });
        this.isCorrect.set(true);

        this.correctAnswers.set(this.correctAnswers() + 1);
      } else {
        // record incorrect answer
        this.summaryService.recordTry({
          operandB: exercise.operandB,
          operandA: exercise.operandA,
          answer: parseInt(answer),
          answerTime: time ?? 0,
          isCorrect: false,
        });
        this.isCorrect.set(false);

        this.incorrectAnswers.set(this.incorrectAnswers() + 1);
      }
    }

    if (this.numberOfExercises() === null) {
      this.generatedExercises.set([
        ...this.generatedExercises(),
        ...MultiplicationGenerator.list(
          this.minMultiplicand(),
          this.maxMultiplicand(),
          this.minMultiplier(),
          this.maxMultiplier(),
          1
        ),
      ]);
    }

    this.delayedAction(() => {
      this.answeredDelayed.emit();
    });

    if (this.currentExerciseIndex() < this.exercises().length - 1) {
      this.delayedAction(() => {
        this.currentExerciseIndex.set(this.currentExerciseIndex() + 1);
        this.isAnswered.set(false);
      });
    } else {
      this.exerciseCompleted.emit();
      this.delayedAction(() => {
        this.exerciseCompletedDelayed.emit();
      });
    }
  }
}
