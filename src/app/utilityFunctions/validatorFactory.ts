import { AbstractControl } from '@angular/forms';

function createValidator(
  value: string,
  validationFunction: Function,
  errorKey: string,
  options?: any[]
) {
  return function validator(control: AbstractControl) {
    const controlValue = control.get(value);

    if (options && validationFunction(controlValue, ...options)) {
      return null;
    } else if (!options && validationFunction(controlValue)) {
      return null;
    } else {
      return { [errorKey]: true };
    }
  };
}

export { createValidator };
