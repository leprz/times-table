import { TestBed } from '@angular/core/testing';
import {
  ExerciseSummary,
  ExerciseSummaryService,
  SummaryPresenter,
} from './exercise-summary.service';
import { OperationKey } from '../../exercise-generator/exercise-generator';
import { ExerciseTryObjectMother } from './exercise-try.object-mother';
import {
  ExerciseScorePolicy,
  ExerciseScorePolicyData,
} from '../exercise-score.policy';

describe('ExerciseSummaryService', () => {
  let sut: ExerciseSummaryService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ExerciseSummaryService],
    })
      .overrideProvider(ExerciseScorePolicy, {
        useValue: {
          calculateScore(data: ExerciseScorePolicyData): number {
            return data.correctTries * 100;
          },
        } satisfies ExerciseScorePolicy,
      })
      .compileComponents();

    sut = TestBed.inject(ExerciseSummaryService);
  });

  it('should throw error when exercise is not initialized', () => {
    expect(() => sut.calculateScore()).toThrow('Exercise is not initialized');
  });

  it('should present exercise summary', () => {
    sut.init(OperationKey.Multiplication);
    sut.recordTry(ExerciseTryObjectMother.correct());
    sut.recordTry(ExerciseTryObjectMother.incorrect());
    sut.recordTry(ExerciseTryObjectMother.correct());
    const summaryPresenterMock: SummaryPresenter = {
      showExerciseSummary(summary: ExerciseSummary) {
        expect(summary).toEqual({
          wrongAnswers: [ExerciseTryObjectMother.incorrect()],
          score: 200,
          highScoreKey: OperationKey.Multiplication,
        } satisfies ExerciseSummary);
      },
    };
    sut.finishExercise(summaryPresenterMock);
  });
});
