import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-dialog-clear',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-dialog-clear.component.html',
  styleUrls: ['./ui-dialog-clear.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDialogClearComponent {
  private dialogElement =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialogElement');
  readonly hasStickyHeader = input<boolean>(false);
  isOpened = signal<boolean>(false);

  modalShowed = output<void>();
  modalClosed = output<void>();

  @HostListener('click', ['$event'])
  onDialogClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).nodeName === 'DIALOG') {
      this.close();
    }
  }

  showModal(): void {
    this.modalShowed.emit();
    this.isOpened.set(true);
    if (!this.dialogElement().nativeElement.open) {
      this.dialogElement().nativeElement.showModal();
    }
  }
  close(): void {
    this.isOpened.set(false);
    this.modalClosed.emit();
    this.dialogElement().nativeElement.close();
  }
}
