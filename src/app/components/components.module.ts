import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
    declarations: [UserFormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RxReactiveFormsModule,
    ],
    exports: [UserFormComponent],
})
export class ComponentsModule {}
