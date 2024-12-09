import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComplexOperationComponent } from '@org/feature-times-table';
import { OnInitComponent } from '@org/page-common';
import { UiOperation, UiOperationComponent } from '@org/ui-operation';
import { UiKeyboardComponent } from '@org/ui-keyboard';

@Component({
  imports: [
    CommonModule,
    FeatureComplexOperationComponent,
    OnInitComponent,
    UiOperationComponent,
    UiKeyboardComponent,
  ],
  templateUrl: './page-complex-operation.component.html',
  styleUrl: './page-complex-operation.component.css',
})
export class PageComplexOperationComponent {
  readonly uiOperation = signal<UiOperation>({
    operationSign: '+',
    operators: [1, 2, 3],
    result: 6,
  });

  onSubmitted(value: string): void {
    if (value === this.uiOperation().result.toString()) {
      this.uiOperation.set({
        ...this.uiOperation(),
        operators: [Number(value)],
      });
    }
  }
}
