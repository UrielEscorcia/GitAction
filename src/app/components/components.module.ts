import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RxFormModule } from '@rxform/rx-form.module'

import { UserFormComponent } from './user-form/user-form.component'

@NgModule({
    declarations: [UserFormComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RxFormModule],
    exports: [UserFormComponent],
})
export class ComponentsModule {}
