import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'
import { NgxCurrencyModule } from 'ngx-currency'

import { RxInputComponent } from './components/rx-input/rx-input.component'
import { RxSelectComponent } from './components/rx-select/rx-select.component'

@NgModule({
    declarations: [RxInputComponent, RxSelectComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RxReactiveFormsModule,
        NgxCurrencyModule,
    ],
    exports: [RxInputComponent, RxSelectComponent],
})
export class RxFormModule {}
