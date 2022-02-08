import { Component, OnInit, Input, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import {
    IFormGroup,
    IAbstractControl,
    RxFormArray,
} from '@rxweb/reactive-form-validators'
import {
    isInvalid,
    showErrorMessage,
    getErrorMessage,
} from '../../models/UIRxForms'

@Component({
    selector: 'rx-input',
    templateUrl: './rx-input.component.html',
    styleUrls: ['./rx-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: RxInputComponent,
        },
    ],
})
export class RxInputComponent implements OnInit, ControlValueAccessor {
    @Input() title: string = 'Titulo'
    @Input() placeholder: string = ''
    @Input() name: string = 'name'
    @Input() inputType:
        | 'text'
        | 'email'
        | 'password'
        | 'number'
        | 'tel'
        | 'url' = 'text'
    @Input() control?: IAbstractControl | RxFormArray | IFormGroup<any>

    value: string = ''
    isDisabled: boolean = false
    onChange = (_: any) => {}
    onTouch = () => {}

    constructor() {}

    ngOnInit(): void {}

    onInput(value: Event) {
        if (this.isDisabled) return
        this.value = (value.target as HTMLInputElement).value
        this.onTouch()
        this.onChange(this.value)
    }

    writeValue(value: any): void {
        this.value = value
    }
    registerOnChange(fn: any): void {
        this.onChange = fn
    }
    registerOnTouched(fn: any): void {
        this.onTouch = fn
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled
    }

    isInvalid() {
        return this.control
            ? isInvalid(this.control as IAbstractControl)
            : false
    }

    showErrorMessage() {
        return this.control
            ? showErrorMessage(this.control as IAbstractControl)
            : false
    }

    getErrorMessage() {
        return this.control
            ? getErrorMessage(this.control as IAbstractControl)
            : ''
    }
}
