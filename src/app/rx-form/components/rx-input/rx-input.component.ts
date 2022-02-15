import { Component, OnInit, Input, Optional, Self } from '@angular/core'
import {
    NgControl,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { IAbstractControl } from '@rxweb/reactive-form-validators'
import { isInvalid, showErrorMessage, getErrorMessage } from '../../models'

@Component({
    selector: 'rx-input',
    templateUrl: './rx-input.component.html',
    styleUrls: ['../style.scss'],
    // providers: [
    //     {
    //         provide: NG_VALUE_ACCESSOR,
    //         multi: true,
    //         useExisting: RxInputComponent,
    //     },
    // ],
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

    @Input() currencyOptions: any = {
        thousands: ',',
        decimal: '.',
        allowNegative: false,
        precision: 2,
    }
    @Input() isDisabled: boolean = false
    @Input() styleClass: string = 'form-field-group'

    value: any = ''
    onChange = (_: any) => {}
    onTouch = () => {}

    constructor(@Optional() @Self() public ngControl: NgControl) {
        if (this.ngControl != null) {
            // Setting the value accessor directly (instead of using
            // the providers) to avoid running into a circular import.
            this.ngControl.valueAccessor = this
        }
    }

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
        return this.ngControl?.control
            ? isInvalid(this.ngControl.control as IAbstractControl)
            : false
    }

    showErrorMessage() {
        return this.ngControl?.control
            ? showErrorMessage(this.ngControl.control as IAbstractControl)
            : false
    }

    getErrorMessage() {
        return this.ngControl?.control
            ? getErrorMessage(this.ngControl.control as IAbstractControl)
            : ''
    }
}
