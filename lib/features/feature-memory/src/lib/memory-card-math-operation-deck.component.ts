import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import {
  Equation,
  ExerciseGenerator,
  ExerciseSummaryService,
} from '@org/feature-times-table';
import { UuidGen } from '@org/utils-data-service';
import { HighScoreInitializer } from '@org/feature-common';

export interface Card {
  id: string;
  key: string;
  name: string;
  isAnswer: boolean;
}

export class CardUtils {
  static shuffle(deck: Card[]): Card[] {
    return deck.sort(() => Math.random() - 0.5);
  }

  static isMatching(firstCard: Card, secondCard: Card): boolean {
    return (
      firstCard.isAnswer !== secondCard.isAnswer &&
      firstCard.key === secondCard.key
    );
  }

  static findAnswer(cards: Card[]): Card | undefined {
    return cards.find((card) => card.isAnswer);
  }

  static findOperation(cards: Card[]): Card | undefined {
    return cards.find((card) => !card.isAnswer);
  }
}

export interface DeckPresenter {
  present(deck: Card[]): void;

  isDisabled(): boolean;
}

@Component({
  selector: 'feature-memory-operation-deck',
  template: ``,
  imports: [],
  providers: [ExerciseGenerator],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryCardMathOperationDeckComponent
  implements HighScoreInitializer
{
  private equations: Equation[] = [];
  readonly correctTryRecorded = output();
  readonly wrongTryRecorded = output();
  readonly highScoreKey = signal<string | null>(null);

  constructor(
    private readonly exerciseGenerator: ExerciseGenerator,
    private readonly summaryService: ExerciseSummaryService,
    private readonly uuidGen: UuidGen,
  ) {
    this.exerciseGenerator.initialize(this.summaryService);
    this.exerciseGenerator.initializeHighScoreKey(this);
  }

  initializeHighScoreKey(key: string): void {
    this.highScoreKey.set(key);
  }

  present(deckPresenter: DeckPresenter, size?: number): void {
    if (size && size % 2) {
      throw new Error('Size must be an even number');
    }

    const boardSize = size ? size / 2 : undefined;

    this.equations = this.generateEquations(boardSize);

    deckPresenter.present([
      ...this.equations.map((equation) => ({
        id: this.uuidGen.generate(),
        key: equation.product.toString(),
        name: equation.operation.toPrettyString(),
        isAnswer: false,
      })),
      ...this.equations.map((equation) => ({
        id: this.uuidGen.generate(),
        key: equation.product.toString(),
        name: equation.product.toString(),
        isAnswer: true,
      })),
    ]);
  }

  recordTry(cards: Card[], isCorrect: boolean): void {
    const operationCard = CardUtils.findOperation(cards);
    const answerCard = CardUtils.findAnswer(cards);

    if (!operationCard || !answerCard) {
      if (isCorrect) {
        throw new Error('Invalid cards');
      }
      return;
    }

    this.summaryService.recordTry({
      operation: operationCard.name,
      isCorrect: isCorrect,
      answerCorrect: parseInt(operationCard.key),
      answerGiven: parseInt(answerCard.key),
      answerTime: 0,
    });
  }

  recordCorrectTry(cards: Card[]): void {
    this.recordTry(cards, true);
    this.correctTryRecorded.emit();
  }

  recordWrongTry(cards: Card[]): void {
    this.recordTry(cards, false);
    this.wrongTryRecorded.emit();
  }

  private generateEquations(size = 4): Equation[] {
    return this.exerciseGenerator.generateEquations(1, 10, 1, 10, size);
  }
}
