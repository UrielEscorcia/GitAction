import {
    AppFormGroup,
    IAbstractControl,
    IFormGroup,
    RxFormArray,
} from '@rxweb/reactive-form-validators'

export interface IModelForm<T> extends AppFormGroup<T> {
    controls: {
        [key in keyof T]: IAbstractControl | IFormGroup<T[key]> | RxFormArray
    }
}

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
