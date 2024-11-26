import {
  Component,
  ElementRef,
  HostListener,
  input,
  output,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiOperation } from '../ui-operation.interface';
import {
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'ui-operation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-operation.component.html',
  styleUrl: './ui-operation.component.css',
})
export class UiOperationComponent {
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.hidePopover();
      this.popoverDismissed.emit();
    }
  }

  readonly formGroup = new FormGroup({
    result: new FormControl('', Validators.required),
  });

  form = viewChild(NgForm);

  readonly operation = input.required<UiOperation>();

  readonly submitted = output<string>();
  readonly popoverClosed = output<void>();
  readonly popoverDismissed = output<void>();
  readonly popover = viewChild<ElementRef>('popoverElement');
  readonly inputValue = input<string>('');

  onPopoverBeforeToggle($event: Event, inputValue: string): void {
    const event = $event as ToggleEvent;
    if (event.newState === 'closed') {
      this.popoverClosed.emit();
    }
  }

  hidePopover(): void {
    this.popover()?.nativeElement.hidePopover();
    this.popoverClosed.emit();
  }

  submit(): void {
    this.submitted.emit(this.formGroup.get('result')?.value ?? '');
    this.hidePopover();
  }
}
