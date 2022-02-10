import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    HostListener,
    Input,
} from '@angular/core'
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
    RxOptions,
} from '../../models'
import { Observable, Subscription } from 'rxjs'
import { gsap, Elastic } from 'gsap'

@Component({
    selector: 'rx-select',
    templateUrl: './rx-select.component.html',
    styleUrls: ['../style.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: RxSelectComponent,
        },
    ],
    host: {
        '(document:click)': 'documentClick($event)',
    },
})
export class RxSelectComponent implements OnInit, ControlValueAccessor {
    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: any) {
        if (event.keyCode == 27) {
            this.hideOptionsAnimation()
        }
    }
    @ViewChild('rxSelectInput') rxSelectInput!: ElementRef<HTMLDivElement>
    @ViewChild('selectOptions') selectOptions!: ElementRef<HTMLDivElement>

    @Input() title: string = 'Titulo'
    @Input() placeholder: string = ''
    @Input() name: string = 'name'
    @Input() options: RxOptions[] = []
    @Input() native: boolean = false
    @Input() asyncOptions?: Observable<RxOptions[]>

    @Input() isDisabled: boolean = false
    @Input() control?: IAbstractControl | RxFormArray | IFormGroup<any>
    @Input() styleClass: string = 'form-field-group'

    _options: RxOptions[] = []
    private asyncOpts$?: Subscription
    value?: any
    onChange = (_: any) => {}
    onTouch = () => {}

    private openOptions = false

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

    get selectedOrPlaceholder() {
        if (this.value) {
            const op = this._options.find(
                (item) =>
                    JSON.stringify(item.value) === JSON.stringify(this.value)
            )
            return op?.label ?? this.placeholder
        }
        return this.placeholder
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

    openOptionsSelect($event: Event): void {
        $event.stopPropagation()
        $event.preventDefault()
        if (this.isDisabled) return
        this.showOptionsAnimation()
    }

    selectRxOption($event: Event, option: RxOptions) {
        $event.stopPropagation()
        $event.preventDefault()
        if (this.isDisabled) return
        this.value = option.value
        this.onTouch()
        this.onChange(this.value)
        this.hideOptionsAnimation()
    }

    private showOptionsAnimation() {
        if (this.openOptions) return

        if (this._options.length == 0) return

        gsap.timeline().to(
            this.selectOptions.nativeElement,
            {
                duration: 0.8,
                y: '0%',
                opacity: 1,
                ease: Elastic.easeOut.config(1, 0.4),
                pointerEvents: 'auto',
                onComplete: () => {
                    this.openOptions = true
                },
            },
            0
        )
    }

    private hideOptionsAnimation() {
        if (!this.openOptions) return

        gsap.timeline().to(
            this.selectOptions.nativeElement,
            {
                duration: 0.3,
                y: '25%',
                opacity: 0,
                pointerEvents: 'none',
                onComplete: () => {
                    this.openOptions = false
                },
            },
            0
        )
    }

    private documentClick(event: any) {
        if (this.native) return
        if (event.target != this.rxSelectInput.nativeElement) {
            this.hideOptionsAnimation()
        }
    }
}