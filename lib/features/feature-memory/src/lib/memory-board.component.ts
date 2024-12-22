import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
  viewChildren,
} from '@angular/core';
import {
  CardPresenter,
  MemoryMatcherComponent,
} from './memory-matcher.component';
import { FeatureTimerComponent } from '@org/feature-times-table';
import { MemoryCardComponent } from './memnory-card.component';
import {
  Card,
  CardUtils,
  DeckPresenter,
} from './memory-card-math-operation-deck.component';
import { first, forkJoin } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'feature-memory-board-component',
  template: `
    <div class="memory-board">
      @for (card of cards(); track card.id) {
        <div>
          <feature-memory-card
            class="memory-board__card"
            #cardComponent
            [label]="card.name"
            [disabled]="isBoardDisabled()"
            (mousedown)="matcher.select(card, cardComponent, this)"
            (shakeEnd)="incorrectAnswerTimer.start()"
            (cardHideAnimationDone)="calculateProgress()"
          />
        </div>
      }
    </div>

    <feature-timer
      #incorrectAnswerTimer
      [startOnLoad]="false"
      [timer]="1"
      (timesUp)="incorrectAnswerTimer.reset()"
      (timerReset)="matcher.unselectAllCards(this)"
    />

    <feature-memory-matcher
      #matcher
      (allElementsSelected)="matcher.submitResult()"
      (answerCorrect)="matcher.markSelectedCardsAreMatched(this)"
      (answerIncorrect)="matcher.markSelectedCardsAreMismatched()"
      (selectedCardsMatched)="
        this.correctAnswerGiven.emit([$event.firstCard, $event.secondCard])
      "
      (selectedCardsMismatched)="
        this.wrongAnswerGiven.emit([$event.firstCard, $event.secondCard])
      "
    />
  `,
  styleUrl: 'memory-board.component.scss',
  imports: [MemoryMatcherComponent, FeatureTimerComponent, MemoryCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryBoardComponent implements DeckPresenter {
  readonly roundEnded = output();
  readonly gameEnded = output();
  readonly gameStarted = output();
  readonly correctAnswerGiven = output<Card[]>();
  readonly wrongAnswerGiven = output<Card[]>();
  protected readonly cards = signal<Card[]>([]);
  protected readonly isBoardDisabled = signal(true);
  protected readonly matchedCardsCount = signal(0);
  private readonly isStarted = signal(false);
  private readonly cardPresenters = viewChildren(MemoryCardComponent);
  private readonly cardPresenters$ = toObservable(this.cardPresenters);

  constructor() {
    this.cardPresenters$
      .pipe(takeUntilDestroyed())
      .subscribe((cardComponents) => {
        if (this.isStarted()) {
          this.showAllCards(cardComponents);
        }
      });
  }

  isDisabled(): boolean {
    return this.isBoardDisabled();
  }

  disable(): void {
    this.isBoardDisabled.set(true);
  }

  enable(): void {
    this.isBoardDisabled.set(false);
  }

  startGame(): void {
    this.isBoardDisabled.set(false);

    const animationEvents = this.cardPresenters().map((cardComponent) => {
      return cardComponent.frontShownAnimationDone;
    });

    this.cardPresenters().forEach((cardComponent) => {
      cardComponent.showFront(true);
    });

    forkJoin([animationEvents])
      .pipe(first())
      .subscribe(() => {
        this.isStarted.set(true);
        this.gameStarted.emit();
      });
  }

  present(deck: Card[]): void {
    this.cards.set(CardUtils.shuffle(deck));
    this.matchedCardsCount.set(0);
  }

  protected calculateProgress(): void {
    this.matchedCardsCount.set(this.matchedCardsCount() + 1);
    if (this.matchedCardsCount() === this.cards().length) {
      this.roundEnded.emit();
    }
  }

  private showAllCards(cardPresenters: readonly CardPresenter[]): void {
    cardPresenters.forEach((cardComponent) => {
      cardComponent.showFront();
    });
  }

  async endGame(): Promise<void> {
    this.isStarted.set(false);
    this.isBoardDisabled.set(true);
    this.gameEnded.emit();
  }
}
