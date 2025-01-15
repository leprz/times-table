import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CardPresenter } from './memory-matcher.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { shakeOnBooleanChange } from '@org/ui-animation';
import { UiCardComponent } from '@org/ui-card';

@Component({
  selector: 'feature-memory-card',
  standalone: true,
  template: ` <ui-card
    class="feature-memory-card"
    (mousedown)="onMouseDown()"
    [name]="label()"
    [disabled]="isDisabled()"
    [hidden]="isHidden()"
    [selected]="isSelected()"
    [@shake]="shaken()"
    (@shake.done)="onShakeEnd()"
    [@flipAnimation]="cardPosition()"
    [@fadeAnimation]="isHidden() ? 'hidden' : 'visible'"
    (@fadeAnimation.done)="onCardFadeAnimationEnd()"
    (@flipAnimation.done)="onFlipEnd()"
  />`,
  styles: [
    `
      .feature-memory-card {
        display: block;
        transform-style: preserve-3d;
        transform: rotateY(180deg);
      }
    `,
  ],
  imports: [UiCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flipAnimation', [
      state('front', style({ transform: 'rotateY(0)' })),
      state('back', style({ transform: 'rotateY(180deg)' })),
      transition('front <=> back', animate('500ms ease')),
    ]),
    trigger('fadeAnimation', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('500ms 500ms ease')),
    ]),
    shakeOnBooleanChange,
  ],
})
export class MemoryCardComponent implements CardPresenter {
  readonly label = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly frontShown = output();
  readonly frontShownAnimationDone = output();
  readonly cardHideAnimationDone = output();
  readonly cardSelected = output();
  readonly shakeEnd = output();
  readonly selected = output();
  protected readonly cardPosition = signal<'back' | 'front'>('back');
  protected readonly isHidden = signal(false);
  readonly isSelected = signal(false);
  protected readonly isDisabled = computed(
    () => this.disabled() || this.isHidden(),
  );
  protected readonly shaken = signal(false);

  showFront(force: boolean | undefined = false): void {
    if (
      force === false &&
      (this.isDisabled() || this.cardPosition() === 'front')
    ) {
      return;
    }
    this.frontShown.emit();
    this.cardPosition.set('front');
  }

  showBack(force: boolean | undefined = false): void {
    if (
      (force === false && this.isDisabled()) ||
      this.cardPosition() === 'back'
    ) {
      return;
    }
    this.cardPosition.set('back');
  }

  hide(): void {
    this.isHidden.set(true);
  }

  shake(): void {
    return this.shaken.set(!this.shaken());
  }

  select(): void {
    if (this.isDisabled()) {
      return;
    }
    this.isSelected.set(true);
    this.cardSelected.emit();
  }

  unselect(force?: boolean): void {
    if (force === false && this.isDisabled()) {
      return;
    }
    this.isSelected.set(false);
  }

  protected onFlipEnd() {
    if (this.cardPosition() === 'front') {
      this.frontShownAnimationDone.emit();
    }
  }

  protected onCardFadeAnimationEnd(): void {
    if (this.isHidden()) {
      this.cardHideAnimationDone.emit();
    }
  }

  protected onShakeEnd(): void {
    if (this.isSelected()) {
      this.shaken.set(false);
      this.shakeEnd.emit();
    }
  }

  protected onMouseDown(): void {
    if (this.isDisabled()) {
      return;
    }
    this.selected.emit();
  }
}
