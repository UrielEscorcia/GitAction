import { Component, OnInit } from '@angular/core';

import { RxFormBuilder, IFormGroup, IAbstractControl, RxFormArray } from '@rxweb/reactive-form-validators';
import { User, Person } from '../../models/user';
import { IModelForm, isInvalid, showErrorMessage, getErrorMessage } from '../../models/UIRxForms'

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
    form!: IModelForm<User>

    constructor(private fBuilder: RxFormBuilder) {
        const user = new User();
        this.form = this.fBuilder.formGroup(user) as IModelForm<User>
    }

    ngOnInit(): void {

        // this.form = this.fBuilder.group({
        //     username: ['', Validators.required],
        //     type: ['MASTER', Validators.required],
        //     person: this.fBuilder.group({
        //         fullname: ['', [Validators.required, Validators.minLength(3)]],
        //         email: ['', [Validators.required, Validators.email]],
        //     }),
        // });
    }

    get formPerson(){
        const person = this.form.controls.person as IFormGroup<Person>;
        return person
    }

    isInvalid(control?: IAbstractControl | RxFormArray | IFormGroup<any>){
        return isInvalid(control as IAbstractControl);
    }

    showErrorMessage(control?: IAbstractControl | RxFormArray | IFormGroup<any>) {
        return showErrorMessage(control as IAbstractControl)
    }

    getErrorMessage(control?: IAbstractControl | RxFormArray | IFormGroup<any>) {
        return getErrorMessage(control as IAbstractControl);
    }

    save() {
        this.form.controls;
        const data = this.form.value;
        console.log(this.form);
        console.log(data);
    }
}
