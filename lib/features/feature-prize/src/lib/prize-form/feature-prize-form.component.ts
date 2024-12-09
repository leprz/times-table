import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { UpdateOnePrizeBodyParams } from '@org/contract-prize';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FeaturePrizeFormControlsBuilder } from './feature-prize-form-controls-builder.service';

export type TodoEditFormData = Partial<UpdateOnePrizeBodyParams>;

@Component({
  imports: [ReactiveFormsModule],
  selector: 'feature-prize-form',
  template: ` <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturePrizeFormComponent {
  readonly id = input.required<string>();
  readonly params = input<TodoEditFormData>({});

  readonly formSubmittedSuccessfully = output<TodoEditFormData>();

  private readonly fb = inject(FormBuilder);
  private readonly fcb = inject(FeaturePrizeFormControlsBuilder);

  private readonly controls = this.fcb.controls();

  readonly keys = this.fcb.keys;
  readonly formGroup = this.fb.group({
    [this.keys.name]: this.controls[this.keys.name],
    [this.keys.requiredCoins]: this.controls[this.keys.requiredCoins],
  });

  submit(key?: keyof typeof this.keys): void {
    this.formGroup.markAllAsTouched();
    this.formGroup.controls[this.keys.name].updateValueAndValidity();
    this.formGroup.controls[this.keys.requiredCoins].updateValueAndValidity();
    if (this.formGroup.valid) {
      this.formSubmittedSuccessfully.emit({
        name:
          key === undefined || key === this.keys.name
            ? this.formGroup.controls[this.keys.name].value
            : undefined,
        requiredPoints:
          key === undefined || key === this.keys.requiredCoins
            ? +this.formGroup.controls[this.keys.requiredCoins].value
            : undefined,
      });
    }
  }

  constructor() {
    effect(() => {
      this.formGroup.controls[this.keys.name].setValue(this.params().name);
      this.formGroup.controls[this.keys.requiredCoins].setValue(
        this.params().requiredPoints,
      );
    });
  }
}
