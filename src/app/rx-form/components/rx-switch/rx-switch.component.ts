import { Component, OnInit, Input } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import {
    IFormGroup,
    IAbstractControl,
    RxFormArray,
} from '@rxweb/reactive-form-validators'
import { isInvalid, showErrorMessage, getErrorMessage } from '../../models'

@Component({
    selector: 'rx-switch',
    templateUrl: './rx-switch.component.html',
    styleUrls: ['../style.scss', './rx-switch.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: RxSwitchComponent,
        },
    ],
})
export class RxSwitchComponent implements OnInit, ControlValueAccessor {
    @Input() title: string = 'Titulo'
    @Input() name: string = 'switch'
    @Input() control?: IAbstractControl | RxFormArray | IFormGroup<any>

    @Input() styleClass: string = 'form-field-group'
    @Input() native: boolean = true

    @Input() isDisabled: boolean = false

    value: boolean = false
    onChange = (_: any) => {}
    onTouch = () => {}

    constructor() {}

    ngOnInit(): void {}

    get idField() {
        return this.name ?? this.title
    }

    onInput(value: Event) {
        if (this.isDisabled) return
        this.value = (value.target as HTMLInputElement).checked
        this.onTouch()
        this.onChange(this.value)
    }

    toggle($event: Event) {
        $event.preventDefault()
        $event.stopPropagation()
        if (this.isDisabled) return
        this.value = !this.value
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
