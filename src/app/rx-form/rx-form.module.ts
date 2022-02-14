import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'
import { NgxCurrencyModule } from 'ngx-currency'

import { RxInputComponent } from './components/rx-input/rx-input.component'
import { RxSelectComponent } from './components/rx-select/rx-select.component'
import { RxSwitchComponent } from './components/rx-switch/rx-switch.component'

@NgModule({
    declarations: [RxInputComponent, RxSelectComponent, RxSwitchComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RxReactiveFormsModule,
        NgxCurrencyModule,
    ],
    exports: [RxInputComponent, RxSelectComponent, RxSwitchComponent],
})
export class RxFormModule {}
