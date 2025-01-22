import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'ui-card',
  template: `
    <div
      [class]="{
        card: true,
        'card--disabled': disabled(),
        'card--selected': selected(),
        'card--selection-outline': selectionOutline(),
      }"
      [hidden]="isHidden()"
      [style.background-color]="
        selectionColorHex() ? selectionColorHex() : false
      "
    >
      <span>
        {{ name() }}
      </span>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--card__backround-color, var(--color-purple));
        border-radius: 0.5rem;
      }

      .card {
        color: var(--color-tertiary);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--card__backround-color, var(--color-purple));
        border-radius: 0.5rem;
        padding: 0.5rem;
        text-align: center;
        aspect-ratio: var(--card__aspect-ratio, 9/10);
        position: relative;
        z-index: 1;
        cursor: pointer;
        backface-visibility: hidden;

        &[hidden],
        &.card--disabled {
          cursor: default;
          user-select: none;
          pointer-events: none;
          touch-action: none;
        }
      }

      span {
        user-select: none;
      }

      .card--selection-outline.card--selected {
        border: 0.5rem solid var(--card__selected-color, var(--color-primary));
      }

      .card--selected {
        background-color: var(--card__selected-color, var(--color-secondary));
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCardComponent {
  readonly name = input.required<string>();
  readonly selectionColorHex = input<string>();
  readonly disabled = input<boolean>(false);
  readonly selected = input<boolean>(false);
  readonly selectionOutline = input<boolean>(false);
  protected readonly isHidden = signal(false);
}
