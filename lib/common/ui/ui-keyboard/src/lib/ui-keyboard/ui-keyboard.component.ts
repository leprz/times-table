import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-keyboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-keyboard.component.html',
  styleUrl: './ui-keyboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiKeyboardComponent {
  isDisabled = input(false);
  inputValue = signal('');
  maxAllowedInputValue = input(9999);
  submitted = output<void>();
  numberClick = output<number>();
  submittedNonEmpty = output<void>();
  notAllowedValueEntered = output<void>();

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    const key = event.key;
    if (!isNaN(Number(key))) {
      this.onNumberClick(Number(key));
    } else if (key === 'Backspace') {
      this.onBackspaceClick();
    } else if (key === 'Enter') {
      this.onSubmitClick();
    }
  }

  reset(): void {
    this.inputValue.set('');
  }

  onNumberClick(number: number): void {
    if (this.isDisabled()) {
      return;
    }

    if (parseInt(this.inputValue()) > this.maxAllowedInputValue()) {
      this.notAllowedValueEntered.emit();
      return;
    }

    this.numberClick.emit(number);
    this.inputValue.set(this.inputValue() + number);
  }

  onBackspaceClick() {
    if (this.isDisabled()) {
      return;
    }

    this.inputValue.set(this.inputValue().slice(0, -1));
  }

  onSubmitClick() {
    if (this.isDisabled()) {
      return;
    }

    this.submitted.emit();

    if (this.inputValue() !== '') {
      this.submittedNonEmpty.emit();
    }
  }
}
