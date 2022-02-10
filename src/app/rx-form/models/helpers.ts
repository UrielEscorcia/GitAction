import { IAbstractControl } from '@rxweb/reactive-form-validators'

export function isInvalid(control?: IAbstractControl) {
    return control?.invalid && (control?.dirty || control?.touched)
}

export function showErrorMessage(control?: IAbstractControl) {
    return (control?.touched || control?.dirty) && control?.errors
}

export function getErrorMessage(control?: IAbstractControl) {
    for (const err in control?.errors) {
        if (control?.errors.hasOwnProperty(err)) {
            return control.errors[err].message
        }
    }
    return ''
}
