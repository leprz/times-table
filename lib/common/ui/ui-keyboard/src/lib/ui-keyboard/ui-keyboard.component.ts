import { Component, HostListener, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-keyboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-keyboard.component.html',
  styleUrl: './ui-keyboard.component.css',
})
export class UiKeyboardComponent {
  inputValue = signal('');
  submitted = output<void>();
  submittedNonEmpty = output<void>();

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
    this.inputValue.set(this.inputValue() + number);
  }

  onBackspaceClick() {
    this.inputValue.set(this.inputValue().slice(0, -1));
  }

  onSubmitClick() {
    this.submitted.emit();

    if (this.inputValue() !== '') {
      this.submittedNonEmpty.emit();
    }
  }
}
