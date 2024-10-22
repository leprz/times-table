import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'ui-pin',
  templateUrl: './pin.component.html',
  styleUrl: './pin.component.scss',
  imports: [
    ReactiveFormsModule
  ]
})
export class PinComponent {
  readonly isPinCorrect = signal<boolean>(false);
  private readonly fb = inject(FormBuilder);
  readonly formGroup = this.fb.nonNullable.group({
    pinField1: this.fb.nonNullable.control('', [Validators.minLength(1), Validators.min(1), Validators.max(9)]),
    pinField2: this.fb.nonNullable.control('', [Validators.minLength(1), Validators.min(1), Validators.max(9)]),
    pinField3: this.fb.nonNullable.control('', [Validators.minLength(1), Validators.min(1), Validators.max(9)]),
    pinField4: this.fb.nonNullable.control('', [Validators.minLength(1), Validators.min(1), Validators.max(9)]),
  });
  protected readonly console = console;

  pinSubmitted = output<string>();

  onPinFormChanged(): void {
    const pin = '' +
      this.formGroup.controls.pinField1.value +
      this.formGroup.value.pinField2 +
      this.formGroup.value.pinField3 +
      this.formGroup.value.pinField4;

    if (pin.length === 4) {
      this.formGroup.reset();
      this.isPinCorrect.set(true);
      this.pinSubmitted.emit(pin);
    }
  }

  onKeyUp(event: KeyboardEvent, currentInput: HTMLInputElement, prevInput: HTMLInputElement | null, nextInput: HTMLInputElement | null): void {
    if (event.key === 'Backspace') {
      if (prevInput) {
        prevInput.focus();
      }

      return;
    }

    if (nextInput) {
      nextInput.value = '';
      nextInput.focus();
    } else {
      currentInput.blur();
    }
  }
}