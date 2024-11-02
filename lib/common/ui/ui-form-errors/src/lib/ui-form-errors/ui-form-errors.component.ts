import { ChangeDetectionStrategy, Component, Input, OnDestroy, signal } from '@angular/core';

import { AbstractControl, AbstractControlDirective, ValidationErrors } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { $localize } from '@angular/localize/init';

@Component({
  selector: 'ui-form-errors',
  standalone: true,
  imports: [],
  templateUrl: './ui-form-errors.component.html',
  styleUrls: ['./ui-form-errors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFormErrorsComponent implements OnDestroy {
  @Input({required: true}) set control(control: AbstractControl) {

    this._control = control;
    this.destroyed$.next();
    this._control.statusChanges?.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.listErrors();
    });
    this.listErrors();
  }

  @Input() set customErrors(customErrors: Record<string, ((params: ValidationErrors | null) => string) | undefined>) {
    this.errorMessages = {
      ...this.errorMessages,
      ...customErrors
    };
  }

  errorMessages: Record<string, ((params: ValidationErrors | null) => string) | undefined> = {
    'required'  : ()  => $localize`This field is required`,
    'maxlength' : (params)  => $localize`Maximum ${params ? params['requiredLength'] : ''} characters`,
    'minlength' : (params)  => $localize`Minimum ${ params ? params['requiredLength'] : ''} characters`,
    'pattern'   : ()  => $localize`Wrong format`,
    'min'       : (params)  => $localize`Minimum amount should be ${params ? params['min'] : ''}`,
    'whitespace': ()   => $localize`White spaces are not allowed`,
  };

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

  private destroyed$ = new Subject<void>();

  private _control: AbstractControl | AbstractControlDirective | null = null

  readonly _errors = signal<string[]>([]);
  readonly errors = this._errors.asReadonly();


  listErrors(): void {
    if (!this._control) {
      this._errors.set([]);
      return;
    }


    if (this._control.errors && (this._control.touched || this._control.dirty)) {
      const errors: string[] = [];
      Object.keys(this._control.errors).map((errorKey) => {
        if (this._control?.errors) {

          const errorMessageFn = this.errorMessages[errorKey];
          if (errorMessageFn) {
            const messageParams = this._control?.errors ? this._control?.errors[errorKey] : null;
            const errorMessage = errorMessageFn(messageParams);
            errors.push(errorMessage);
          }
        }
      });

      this._errors.set(errors);
    } else {
      this._errors.set([]);
    }
  }
}
