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
      }"
      [hidden]="isHidden()"
    >
      <span>
        {{ name() }}
      </span>
    </div>
  `,
  styles: [
    `
      :host {
        background-color: var(--color-purple);
        border-radius: 0.5rem;
      }

      .card {
        color: var(--color-tertiary);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-purple);
        border-radius: 0.5rem;
        padding: 0.5em;
        text-align: center;
        aspect-ratio: 9/10;
        position: relative;
        z-index: 1;
        cursor: pointer;
        backface-visibility: hidden;

        &[hidden],
        &.card--disabled {
          cursor: default;
        }
      }

      span {
        user-select: none;
      }

      .card--selected {
        background-color: var(--color-secondary);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCardComponent {
  readonly name = input.required<string>();
  readonly disabled = input<boolean>(false);
  readonly selected = input<boolean>(false);
  protected readonly isHidden = signal(false);
}
