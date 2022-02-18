import { Component, OnInit, Input, Optional, Self } from '@angular/core'
import {
    NgControl,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { IAbstractControl } from '@rxweb/reactive-form-validators'
import { Observable, Subscription } from 'rxjs'
import {
    isInvalid,
    showErrorMessage,
    getErrorMessage,
    RxOptions,
} from '../../models'

@Component({
    selector: 'rx-radios',
    templateUrl: './rx-radios.component.html',
    styleUrls: ['../style.scss', './rx-radios.component.scss'],
})
export class RxRadiosComponent implements OnInit, ControlValueAccessor {
    @Input() title: string = 'Titulo'
    @Input() name: string = 'name'

    @Input() isDisabled: boolean = false
    @Input() styleClass: string = 'form-field-group'
    @Input() options: RxOptions[] = []
    @Input() asyncOptions?: Observable<RxOptions[]>

    _options: RxOptions[] = []
    private asyncOpts$?: Subscription

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

    ngOnInit(): void {
        if (this.asyncOptions) {
            this.asyncOpts$ = this.asyncOptions.subscribe((options) => {
                this._options = options
            })
        } else {
            this._options = this.options
        }
    }

    ngOnDestroy(): void {
        this.asyncOpts$?.unsubscribe()
    }

    get idField() {
        return this.name ?? this.title
    }

    onInput(value: Event) {
        if (this.isDisabled) return
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
