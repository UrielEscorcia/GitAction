import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'
import { NgxCurrencyModule } from 'ngx-currency'

import { UserFormComponent } from './user-form/user-form.component'
import { RxInputComponent } from './rx-input/rx-input.component'
import { RxSelectComponent } from './rx-select/rx-select.component'

@NgModule({
    declarations: [UserFormComponent, RxInputComponent, RxSelectComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RxReactiveFormsModule,
        NgxCurrencyModule,
    ],
    exports: [UserFormComponent, RxInputComponent, RxSelectComponent],
})
export class ComponentsModule {}
