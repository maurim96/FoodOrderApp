import { AbstractControl } from '@angular/forms';

export function ValidateLength(control: AbstractControl) {
    let input = control.value;
    var valid = false;
    if (input.length <= 5 && input.length > 0) {
        valid = true;
    }
    return valid ? null : { 'validLength': true };
}
