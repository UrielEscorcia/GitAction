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
import { Observable, Subscription } from 'rxjs'

export interface RxOptions {
    label: string
    value: any
}

@Component({
    selector: 'rx-select',
    templateUrl: './rx-select.component.html',
    styleUrls: ['./rx-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: RxSelectComponent,
        },
    ],
})
export class RxSelectComponent implements OnInit, ControlValueAccessor {
    @Input() title: string = 'Titulo'
    @Input() placeholder: string = ''
    @Input() name: string = 'name'
    @Input() options: RxOptions[] = []
    @Input() asyncOptions?: Observable<RxOptions[]>

    @Input() isDisabled: boolean = false
    @Input() control?: IAbstractControl | RxFormArray | IFormGroup<any>

    _options: RxOptions[] = []
    private asyncOpts$?: Subscription
    value: any = ''
    onChange = (_: any) => {}
    onTouch = () => {}

    constructor() {}
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
        this.value = (value.target as HTMLSelectElement).value
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
