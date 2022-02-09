import { Component, OnInit } from '@angular/core'

import { RxFormBuilder, IFormGroup } from '@rxweb/reactive-form-validators'
import { User, Person } from '../../models/user'
import { IModelForm } from '../../models/UIRxForms'

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
    form!: IModelForm<User>

    constructor(private fBuilder: RxFormBuilder) {
        const user = new User()
        this.form = this.fBuilder.formGroup(user) as IModelForm<User>
    }

    ngOnInit(): void {}

    get formPerson() {
        const person = this.form.controls.person as IFormGroup<Person>
        return person
    }

    save() {
        this.form.controls
        const data = this.form.value
        console.log(this.form)
        console.log(data)
    }
}
