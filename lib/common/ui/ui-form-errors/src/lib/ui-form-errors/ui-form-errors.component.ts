import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { $localize } from '@angular/localize/init';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filterNill } from '@org/utils-data-service';

@Component({
  selector: 'ui-form-errors',
  imports: [],
  templateUrl: './ui-form-errors.component.html',
  styleUrls: ['./ui-form-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormErrorsComponent {
  readonly control = input.required<AbstractControl>();

  readonly customErrors =
    input<
      Record<string, ((params: ValidationErrors | null) => string) | undefined>
    >();

  readonly errors = signal<string[]>([]);

  readonly errorMessages = computed<
    Record<string, ((params: ValidationErrors | null) => string) | undefined>
  >(() => ({
    required: () => $localize`This field is required`,
    maxlength: (params) =>
      $localize`Maximum ${params ? params['requiredLength'] : ''} characters`,
    minlength: (params) =>
      $localize`Minimum ${params ? params['requiredLength'] : ''} characters`,
    pattern: () => $localize`Wrong format`,
    min: (params) =>
      $localize`Minimum amount should be ${params ? params['min'] : ''}`,
    whitespace: () => $localize`White spaces are not allowed`,
    ...this.customErrors(),
  }));

  readonly statusChanges = toObservable(this.control).pipe(
    filterNill(),
    tap(() => {
      this.errors.set(this.getErrorsListFromControl());
    }),
    switchMap((control) => {
      return control.statusChanges;
    }),
  );
  constructor() {
    this.statusChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.errors.set(this.getErrorsListFromControl());
    });
  }
  getErrorsListFromControl(): string[] {
    if (!this.control()) {
      return [];
    }

    const control = this.control();
    if (control.errors && (control.touched || control.dirty)) {
      const errors: string[] = [];
      Object.keys(control.errors).map((errorKey) => {
        if (control?.errors) {
          const errorMessageFn = this.errorMessages()[errorKey];
          if (errorMessageFn) {
            const messageParams = control?.errors
              ? control?.errors[errorKey]
              : null;
            const errorMessage = errorMessageFn(messageParams);
            errors.push(errorMessage);
          }
        }
      });

      return errors;
    } else {
      return [];
    }
  }
}
