import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryBoardComponent } from './memory-board.component';
import { Card, CardUtils } from './memory-card-math-operation-deck.component';

export interface CardPresenter {
  select(): void;

  isDisabled(): boolean;

  unselect(force?: boolean): void;

  showBack(force?: boolean): void;

  showFront(force?: boolean): void;

  shake(): void;

  hide(): void;
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
    board: MemoryBoardComponent,
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

  markSelectedCardsAreMatched(board: MemoryBoardComponent): void {
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

  unselectAllCards(board: MemoryBoardComponent): void {
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
