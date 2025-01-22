import { Component, computed, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UuidGen } from '@org/utils-data-service';
import { Card, CardUtils, DeckPresenter } from '@org/feature-memory';
type Color = 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'orange';
@Component({
  selector: 'feature-memory-colors-deck',
  imports: [CommonModule],
  template: ``,
})
export class FeatureMemoryColorsDeckComponent {
  readonly correctTryRecorded = output();
  readonly wrongTryRecorded = output();
  readonly deckGenerated = output();
  readonly allElementsMatched = output();
  readonly elementsMatchedCount = signal<number>(0);
  readonly generatedColors = signal<Color[]>([]);
  readonly generatedColorsCount = computed(() => this.generatedColors().length);

  constructor(private readonly uuidGen: UuidGen) {}

  generate(deckPresenter: DeckPresenter): void {
    const colors: Color[] = [
      'red',
      'green',
      'blue',
      'yellow',
      'purple',
      'orange',
    ];
    this.elementsMatchedCount.set(0);
    this.generatedColors.set(colors);

    deckPresenter.present([
      ...colors.map((color) => ({
        id: this.uuidGen.generate(),
        key: color,
        label: '',
        soundName: this.mapColorToSoundName(color),
        colorHex: this.mapColorToHex(color),
        isAnswer: false,
      })),
      ...colors.map((color) => ({
        id: this.uuidGen.generate(),
        key: color,
        label: '',
        soundName: this.mapColorToSoundName(color),
        colorHex: this.mapColorToHex(color),
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
    if (this.elementsMatchedCount() === this.generatedColors().length) {
      this.allElementsMatched.emit();
    }
    this.correctTryRecorded.emit();
  }

  recordWrongTry(cards: Card[]): void {
    this.recordTry(cards, false);
    this.wrongTryRecorded.emit();
  }

  private mapColorToSoundName(color: Color): string {
    return 'color-pl-' + color;
  }

  private mapColorToHex(color: Color): string {
    switch (color) {
      case 'red':
        return '#ef2215'; // Soft Red
      case 'green':
        return '#6cb900'; // Soft Green
      case 'blue':
        return '#2f2fef'; // Soft Blue
      case 'yellow':
        return '#FFD700'; // Soft Yellow
      case 'purple':
        return '#9f4890'; // Soft Purple
      case 'orange':
        return '#ff8b00'; // Soft Orange
    }
  }
}
