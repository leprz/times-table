import { Component, computed, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UuidGen } from '@org/utils-data-service';
import { Card, CardUtils, DeckPresenter } from '@org/feature-memory';

@Component({
  selector: 'feature-memory-numbers-deck',
  imports: [CommonModule],
  template: ``,
})
export class FeatureMemoryNumbersDeckComponent {
  readonly correctTryRecorded = output();
  readonly wrongTryRecorded = output();
  readonly deckGenerated = output();
  readonly allElementsMatched = output();
  readonly elementsMatchedCount = signal<number>(0);
  readonly generatedNumbers = signal<number[]>([]);
  readonly generatedNumbersCount = computed(
    () => this.generatedNumbers().length,
  );

  constructor(private readonly uuidGen: UuidGen) {}

  generate(
    deckPresenter: DeckPresenter,
    minNum: number,
    maxNumber: number,
  ): void {
    const numbers = Array.from(
      { length: maxNumber - minNum + 1 },
      (_, i) => i + minNum,
    );
    this.elementsMatchedCount.set(0);
    this.generatedNumbers.set(numbers);

    deckPresenter.present([
      ...numbers.map((number) => ({
        id: this.uuidGen.generate(),
        key: number.toString(),
        label: number.toString(),
        soundName: this.mapNumberToSoundName(number),
        isAnswer: false,
      })),
      ...numbers.map((number) => ({
        id: this.uuidGen.generate(),
        key: number.toString(),
        label: number.toString(),
        soundName: this.mapNumberToSoundName(number),
        isAnswer: true,
      })),
    ]);

    this.deckGenerated.emit();
  }

  recordTry(cards: Card[], isCorrect: boolean): void {
    const questionCard = CardUtils.findQuestion(cards);
    const answerCard = CardUtils.findAnswer(cards);

    if (!questionCard || !answerCard) {
      if (isCorrect) {
        throw new Error('Invalid cards');
      }
      return;
    }
  }

  recordCorrectTry(cards: Card[]): void {
    this.recordTry(cards, true);
    this.elementsMatchedCount.set(this.elementsMatchedCount() + 1);
    if (this.elementsMatchedCount() === this.generatedNumbers().length) {
      this.allElementsMatched.emit();
    }
    this.correctTryRecorded.emit();
  }

  recordWrongTry(cards: Card[]): void {
    this.recordTry(cards, false);
    this.wrongTryRecorded.emit();
  }

  private mapNumberToSoundName(number: number): string {
    return `number-pl-${number}`;
  }

  private mapNumberToLabel(number: number): string {
    switch (number) {
      case 1:
        return 'jeden';
      case 2:
        return 'dwa';
      case 3:
        return 'trzy';
      case 4:
        return 'cztery';
      case 5:
        return 'pięć';
      case 6:
        return 'sześć';
      case 7:
        return 'siedem';
      case 8:
        return 'osiem';
      case 9:
        return 'dziewięć';
      case 10:
        return 'dziesięć';
      default:
        throw new Error('Invalid number');
    }
  }
}
