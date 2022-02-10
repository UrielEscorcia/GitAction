import { Component, OnInit, Input } from '@angular/core'
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
        | 'search'
        | 'tel'
        | 'url'
        | 'currency'
        | 'textarea' = 'text'
    @Input() control?: IAbstractControl | RxFormArray | IFormGroup<any>

    @Input() currencyOptions: any = {
        thousands: ',',
        decimal: '.',
        allowNegative: false,
        precision: 2,
    }
    @Input() isDisabled: boolean = false
    @Input() styleClass: string = 'input-group'

    value: any = ''
    onChange = (_: any) => {}
    onTouch = () => {}

    constructor() {}

    ngOnInit(): void {}

    get idField() {
        return this.name ?? this.title
    }

    onCurrencyInput($event: Event) {
        if (this.isDisabled) return
        this.onTouch()
        this.onChange(this.value)
    }

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
