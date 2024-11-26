import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  computed,
} from '@angular/core';
import {
  ExpressionComponent,
  RandomOperationBuilder,
} from '../complex-operation/complex-operation';

@Component({
  selector: 'feature-complex-operation-component',
  standalone: true,
  template: ` <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureComplexOperationComponent {
  readonly equation = signal<ExpressionComponent | null>(null);
  readonly equationResult = computed(() => this.equation()?.evaluate());

  private readonly randomOperationBuilder = inject(RandomOperationBuilder);
  generateRandomEquation(): void {
    this.equation.set(this.randomOperationBuilder.generate());
  }
}
