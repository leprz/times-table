import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import {
  Equation,
  ExerciseGenerator,
  Randomizer,
} from '../exercise-generator/exercise-generator';
import { ExerciseSummaryService } from '../common/exercise-summary/exercise-summary.service';

@Component({
  selector: 'feature-exercise',
  standalone: true,
  providers: [ExerciseGenerator],
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureExerciseComponent implements OnDestroy {
  readonly exerciseGenerator = inject(ExerciseGenerator);
  readonly summaryService = inject(ExerciseSummaryService);

  readonly numberOfExercises = input<number | null>(null);
  readonly minOperand1 = input<number>(1);
  readonly maxOperand1 = input<number>(9);
  readonly minOperand2 = input<number>(1);
  readonly maxOperand2 = input<number>(9);
  readonly generatedExercises = signal<Equation[]>([]);
  readonly exercises = computed(() => {
    return [
      ...Randomizer.randomizeArray(
        this.exerciseGenerator.generateEquations(
          this.minOperand1(),
          this.maxOperand1(),
          this.minOperand2(),
          this.maxOperand2(),
          this.numberOfExercises() ?? 1,
        ),
      ),
      ...this.generatedExercises(),
    ];
  });

  readonly currentExerciseIndex = signal(0);
  readonly currentExercise = computed<Equation | null>(
    () => this.exercises()[this.currentExerciseIndex()] ?? null,
  );
  readonly correctAnswers = signal(0);
  readonly incorrectAnswers = signal(0);
  readonly outputDelay = input<number>(0);
  readonly isAnswered = signal(false);
  readonly isCorrect = signal<boolean | null>(null);

  readonly answered = output();
  readonly answeredDelayed = output();
  readonly exerciseCompleted = output();
  readonly exerciseCompletedDelayed = output();
  readonly wrongAnswerAdded = output<{
    correctAnswer: number;
  }>();
  readonly correctAnswerAdded = output<void>();

  interval: ReturnType<typeof setInterval>[] = [];

  constructor() {
    this.exerciseGenerator.initialize(this.summaryService);
  }

  ngOnDestroy(): void {
    if (this.interval.length > 0) {
      this.interval.forEach((i) => clearInterval(i));
    }
  }

  private delayedAction(action: () => void): void {
    const interval = setTimeout(() => {
      action();
      clearTimeout(interval);
    }, this.outputDelay() * 1000);
    this.interval.push(interval);
  }

  answer(answer: string | null, time?: number): void {
    const exercise = this.currentExercise();

    if (exercise && answer === null) {
      // record no answer
      this.summaryService.recordTry({
        operation: exercise.operation.toPrettyString(),
        answerCorrect: exercise.product,
        answerGiven: null,
        answerTime: time ?? 0,
        isCorrect: false,
      });
      this.isCorrect.set(false);
      this.incorrectAnswers.set(this.incorrectAnswers() + 1);
      this.wrongAnswerAdded.emit({ correctAnswer: exercise.product });
    }

    if (exercise && answer) {
      if (exercise.product === parseInt(answer)) {
        // record correct answer
        this.summaryService.recordTry({
          operation: exercise.operation.toPrettyString(),
          answerGiven: parseInt(answer),
          answerCorrect: exercise.product,
          answerTime: time ?? 0,
          isCorrect: true,
        });
        this.isCorrect.set(true);
        this.correctAnswers.set(this.correctAnswers() + 1);
        this.correctAnswerAdded.emit();
      } else {
        // record incorrect answer
        this.summaryService.recordTry({
          operation: exercise.operation.toPrettyString(),
          answerGiven: parseInt(answer),
          answerCorrect: exercise.product,
          answerTime: time ?? 0,
          isCorrect: false,
        });
        this.isCorrect.set(false);
        this.incorrectAnswers.set(this.incorrectAnswers() + 1);
        this.wrongAnswerAdded.emit({ correctAnswer: exercise.product });
      }
    }

    this.answered.emit();
    this.isAnswered.set(true);

    this.delayedAction(() => {
      this.answeredDelayed.emit();
    });
  }

  nextExercise(): void {
    this.isCorrect.set(null);
    if (this.numberOfExercises() === null) {
      this.generatedExercises.set([
        ...this.generatedExercises(),
        ...this.exerciseGenerator.generateEquations(
          this.minOperand1(),
          this.maxOperand1(),
          this.minOperand2(),
          this.maxOperand2(),
          1,
        ),
      ]);
    }

    if (this.currentExerciseIndex() < this.exercises().length - 1) {
      this.currentExerciseIndex.set(this.currentExerciseIndex() + 1);
      this.isAnswered.set(false);
    } else {
      this.exerciseCompleted.emit();
      this.exerciseCompletedDelayed.emit();
    }
  }
}
