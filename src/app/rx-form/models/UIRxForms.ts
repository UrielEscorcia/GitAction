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

export interface RxOptions {
    label: string
    value: any
}
