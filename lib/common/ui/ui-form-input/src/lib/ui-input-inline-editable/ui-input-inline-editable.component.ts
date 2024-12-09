import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EditableComponent,
  EditableFocusDirective,
  EditableOnEnterDirective,
  EditableOnEscapeDirective,
  EditModeDirective,
  ViewModeDirective,
} from '@ngneat/edit-in-place';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UiFormErrorsComponent } from '@org/ui-form-errors';

@Component({
  selector: 'ui-form-input-inline-editable',
  imports: [
    CommonModule,
    EditModeDirective,
    EditableComponent,
    EditableFocusDirective,
    EditableOnEnterDirective,
    EditableOnEscapeDirective,
    ReactiveFormsModule,
    UiFormErrorsComponent,
    ViewModeDirective,
  ],
  templateUrl: './ui-input-inline-editable.component.html',
  styleUrl: './ui-input-inline-editable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputInlineEditableComponent {
  changeDetectionRef = inject(ChangeDetectorRef);

  isEnabled = input<boolean>(true);
  initialValue = input.required<string>();
  control = input.required<FormControl>();

  saved = output<void>();
  canceled = output<void>();
  modeChanged = output<void>();

  constructor() {
    effect(() => {
      this.changeDetectionRef.detectChanges();
    });
  }

  onSave(): void {
    if (this.control().invalid) {
      this.control().setValue(this.initialValue());
    } else {
      this.saved.emit();
    }
  }

  onCancel(): void {
    if (this.control().invalid) {
      this.control().setValue(this.initialValue());
    }

    this.canceled.emit();
  }

  onModeChange(): void {
    this.modeChanged.emit();
  }
}
