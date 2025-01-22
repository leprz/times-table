import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Card,
  CardUtils,
} from './feature-memory-card-math-operation-deck.component';

export interface CardBoard {
  isDisabled(): boolean;
  disable(): void;
  enable(): void;
}

export interface CardPresenter {
  select(): void;

  unselect(force?: boolean): void;

  showBack(force?: boolean): void;

  showFront(force?: boolean): void;

  shake(): void;

  hide(): void;
}

export class CardPresenterUtils {
  static showAll(cards: readonly CardPresenter[], force = false): void {
    cards.forEach((card) => card.showFront(force));
  }
}

export interface SelectedCard {
  card: Card;
  cardPresenter: CardPresenter;
}

class SelectedCardsUtils {
  static isCardSelected(
    selectedCards: Array<SelectedCard>,
    card: Card,
  ): boolean {
    return selectedCards
      .map((selectedCard) => selectedCard.card)
      .includes(card);
  }

  static isSameCardTypeSelected(
    selectedCards: Array<SelectedCard>,
    card: Card,
  ): boolean {
    return (
      selectedCards.length > 0 &&
      selectedCards[0].card.isAnswer === card.isAnswer
    );
  }

  static removeFromSelectedCards(
    selectedCards: Array<SelectedCard>,
    card: Card,
  ): Array<SelectedCard> {
    return selectedCards.filter((selectedCard) => selectedCard.card !== card);
  }

  static addToSelectedCards(
    selectedCards: Array<SelectedCard>,
    selectedCard: SelectedCard,
  ): Array<SelectedCard> {
    return [...selectedCards, selectedCard];
  }
}

@Component({
  imports: [CommonModule],
  selector: 'feature-memory-matcher',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryMatcherComponent {
  selectedCards = signal<Array<SelectedCard>>([]);

  allElementsSelected = output();
  selectionCommited = output();
  beforeResultChecked = output();
  answerCorrect = output();
  answerIncorrect = output();
  selectedCardsMatched = output<{
    firstCard: Card;
    secondCard: Card;
  }>();
  selectedCardsMismatched = output<{
    firstCard: Card;
    secondCard: Card;
  }>();

  select(
    currentlySelectedElement: Card,
    cardPresenter: CardPresenter,
    board: CardBoard,
  ): void {
    if (board.isDisabled()) {
      return;
    }

    if (
      SelectedCardsUtils.isCardSelected(
        this.selectedCards(),
        currentlySelectedElement,
      )
    ) {
      this.removeFromSelectedCards({
        card: currentlySelectedElement,
        cardPresenter,
      });
      return;
    } else if (
      SelectedCardsUtils.isSameCardTypeSelected(
        this.selectedCards(),
        currentlySelectedElement,
      )
    ) {
      this.removeFromSelectedCards(this.selectedCards()[0]);
    }

    this.addToSelectedCards({
      card: currentlySelectedElement,
      cardPresenter,
    });
    if (this.selectedCards().length === 2) {
      board.disable();
      this.allElementsSelected.emit();
    }
  }

  commitSelection(): void {
    if (this.selectedCards().length === 2) {
      this.selectionCommited.emit();
    }
  }

  submitResult(): void {
    this.beforeResultChecked.emit();
    const [firstElement, secondElement] = this.selectedCards();
    if (!firstElement || !secondElement) {
      return;
    }

    if (CardUtils.isMatching(firstElement.card, secondElement.card)) {
      this.answerCorrect.emit();
    } else {
      this.answerIncorrect.emit();
    }
  }

  markSelectedCardsAreMatched(board: CardBoard): void {
    const [firstElement, secondElement] = this.selectedCards();
    if (!firstElement || !secondElement) {
      return;
    }

    [firstElement.cardPresenter, secondElement.cardPresenter].forEach(
      (presenter) => presenter.hide(),
    );

    board.enable();
    this.selectedCards.set([]);
    this.selectedCardsMatched.emit({
      firstCard: firstElement.card,
      secondCard: secondElement.card,
    });
  }

  markSelectedCardsAreMismatched(): void {
    this.selectedCards().forEach((selectedCard) => {
      selectedCard.cardPresenter.shake();
    });

    const [firstElement, secondElement] = this.selectedCards();

    if (!firstElement || !secondElement) {
      return;
    }

    this.selectedCardsMismatched.emit({
      firstCard: firstElement.card,
      secondCard: secondElement.card,
    });
  }

  unselectAllCards(board: CardBoard): void {
    const [firstElement, secondElement] = this.selectedCards();
    if (!firstElement || !secondElement) {
      return;
    }

    [firstElement.cardPresenter, secondElement.cardPresenter].forEach(
      (presenter) => presenter.unselect(true),
    );
    board.enable();
    this.selectedCards.set([]);
  }

  private removeFromSelectedCards(selectedCard: SelectedCard): void {
    this.selectedCards.set(
      SelectedCardsUtils.removeFromSelectedCards(
        this.selectedCards(),
        selectedCard.card,
      ),
    );
    selectedCard.cardPresenter.unselect();
  }

  private addToSelectedCards(selectedCard: SelectedCard): void {
    selectedCard.cardPresenter.select();
    this.selectedCards.set(
      SelectedCardsUtils.addToSelectedCards(this.selectedCards(), {
        card: selectedCard.card,
        cardPresenter: selectedCard.cardPresenter,
      }),
    );
  }
}
