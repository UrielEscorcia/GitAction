import { Component, OnInit } from '@angular/core'

import { RxFormBuilder, IFormGroup } from '@rxweb/reactive-form-validators'
import { User, Person, TypeUser } from '@models/user'
import { RxOptions, IModelForm } from '@rxform/models'
import { Observable, of } from 'rxjs'

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
    form!: IModelForm<User>

    selectOptions: RxOptions[] = [
        {
            label: 'Master',
            value: TypeUser.MASTER,
        },
        {
            label: 'Administrador',
            value: TypeUser.ADMIN,
        },
    ]

    constructor(private fBuilder: RxFormBuilder) {
        const user = new User()
        this.form = this.fBuilder.formGroup(user) as IModelForm<User>
    }

    ngOnInit(): void {}

    get asyncOptions(): Observable<RxOptions[]> {
        return of(this.selectOptions)
    }

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
