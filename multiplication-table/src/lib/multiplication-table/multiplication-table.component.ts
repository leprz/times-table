import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseGenerator, MultiplicationExercise } from '../exercise-generator';
import { UiQuizAnswerItemComponent } from '../ui-quiz-answer-item/ui-quiz-answer-item.component';
import { distinctUntilChanged, interval, map, Observable, startWith, Subject, switchMap, take, takeUntil } from 'rxjs';
import { UiSpinnerComponent } from '../ui-spinner/ui-spinner.component';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SummaryService } from '../common/summary.service';

@Component({
  selector: 'lib-multiplication-table',
  standalone: true,
  imports: [CommonModule, UiQuizAnswerItemComponent, UiSpinnerComponent],
  providers: [ExerciseGenerator],
  templateUrl: './multiplication-table.component.html',
  styleUrl: './multiplication-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiplicationTableComponent {
  constructor(
    private exerciseGenerator: ExerciseGenerator,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly summaryService: SummaryService,
  ) {

    this.activatedRoute.paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const multiplicand = +(params.get('multiplicand') ?? 1);
      if (multiplicand) {
        this.summaryService.resetLastTries(multiplicand);
        this.currentExercise.set(this.exerciseGenerator.generateExerciseForMultiplicand(
          multiplicand,
          1
        ));
      }
    });

    this.timeForExercise$.pipe(takeUntilDestroyed()).subscribe((time) => {
      if (time === 0) {
        this.onExerciseAnswered(false, 0);
      }
    });
  }


  private readonly TIME_FOR_EXERCISE = 3;

  stopTimer$ = new Subject<void>();

  reset$ = new Subject<void>();

  timeForExercise$: Observable<number> = this.reset$.pipe(
    startWith(null),
    switchMap(() => this.setTimer()),
    distinctUntilChanged()
  );

  generatingExercise = signal(false);

  private setTimer(): Observable<number> {
    return interval(1000).pipe(
      startWith(0),
      take(this.TIME_FOR_EXERCISE + 2),
      map(value => this.TIME_FOR_EXERCISE - value),
      takeUntil(this.stopTimer$.asObservable())
    );
  }

  currentExercise =
    signal<MultiplicationExercise>(this.exerciseGenerator.generateExerciseForMultiplicand(1, 1));
  result = signal('?');
  isAnswered = signal(false);
  isCorrect = signal<boolean | null>(null);

  onExerciseAnswered(isCorrect: boolean, timeLeftForAnswer: number): void {
    this.summaryService.recordTry({
      multiplier: this.currentExercise().multiplier,
      multiplicand: this.currentExercise().multiplicand,
      time: this.TIME_FOR_EXERCISE - timeLeftForAnswer,
      isCorrect,
    });

    this.isCorrect.set(isCorrect);
    this.isAnswered.set(true);
    this.result.set(
      ExerciseGenerator.getCorrectAnswer(this.currentExercise()).label.toString()
    );
    this.stopTimer$.next();
    this.startGeneratingExercise();
  }

  private startGeneratingExercise() {
    this.generatingExercise.set(true);
    this.timeForExercise$ = this.setTimer();
    setTimeout(() => {
      this.generatingExercise.set(false);
      this.generateNewExercise();
    }, 800);
  }

  private generateNewExercise() {
    this.isAnswered.set(false);
    this.result.set('?');
    this.reset$.next();
    const nextMultiplier = this.currentExercise().multiplier + 1;

    if (nextMultiplier > 10) {
      this.router.navigate(['/summary']);
    }

    this.currentExercise.set(
      this.exerciseGenerator.generateExerciseForMultiplicand(
      this.currentExercise().multiplicand,
      nextMultiplier
    ));
  }
}
