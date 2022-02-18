import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'
import { NgxCurrencyModule } from 'ngx-currency'
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { RxInputComponent } from './components/rx-input/rx-input.component'
import { RxSelectComponent } from './components/rx-select/rx-select.component'
import { RxSwitchComponent } from './components/rx-switch/rx-switch.component'
import { RxRadiosComponent } from './components/rx-radios/rx-radios.component'

@NgModule({
    declarations: [
        RxInputComponent,
        RxSelectComponent,
        RxSwitchComponent,
        RxRadiosComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RxReactiveFormsModule,
        NgxCurrencyModule,
        NgxMaskModule.forRoot(),
    ],
    exports: [
        RxInputComponent,
        RxSelectComponent,
        RxSwitchComponent,
        RxRadiosComponent,
    ],
})
export class RxFormModule {}
