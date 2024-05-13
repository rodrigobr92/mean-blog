import { Directive, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPasswordDirective,
      multi: true,
    },
  ],
})
export class MatchPasswordDirective implements Validator {
  @Input('password') password: string = '';
  @Input('confirmPassword') confirmPassword: string = '';

  MatchPassword(password: string, confirmPassword: string) {
    return (
      formGroup: FormGroup
    ): ValidationErrors | null => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl =
        formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (
        passwordControl.value !==
        confirmPasswordControl.value
      ) {
        confirmPasswordControl.setErrors({
          passwordMismatch: true,
        });
      } else {
        confirmPasswordControl.setErrors(null);
      }
      return formGroup.errors;
    };
  }

  validate(formGroup: FormGroup): ValidationErrors | null {
    return this.MatchPassword(
      this.password,
      this.confirmPassword
    )(formGroup);
  }
}
