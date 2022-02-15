import { Component, OnInit, Input, Optional, Self } from '@angular/core'
import {
    NgControl,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { IAbstractControl } from '@rxweb/reactive-form-validators'
import { isInvalid, showErrorMessage, getErrorMessage } from '../../models'

@Component({
    selector: 'rx-switch',
    templateUrl: './rx-switch.component.html',
    styleUrls: ['../style.scss', './rx-switch.component.scss'],
    // providers: [
    //     {
    //         provide: NG_VALUE_ACCESSOR,
    //         multi: true,
    //         useExisting: RxSwitchComponent,
    //     },
    // ],
})
export class RxSwitchComponent implements OnInit, ControlValueAccessor {
    @Input() title: string = 'Titulo'
    @Input() name: string = 'switch'

    @Input() styleClass: string = 'form-field-group'
    @Input() native: boolean = true

    @Input() isDisabled: boolean = false

    value: boolean = false
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
