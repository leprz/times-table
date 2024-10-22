import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FeaturePrizeFormControlsBuilder {
  private readonly fb = inject(FormBuilder);

  readonly keys = {
    id: 'id',
    name: 'name',
    requiredCoins: 'requiredCoins'
  } as const;

  readonly controls: () => { [key: string]: FormControl } = () => ({
    [this.keys.id]: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true
    }),
    [this.keys.name]: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true
    }),
    [this.keys.requiredCoins]: this.fb.control(0, {
      validators: [Validators.required, Validators.pattern(/^\d+$/)],
      nonNullable: true
    })
  } as const);
}
