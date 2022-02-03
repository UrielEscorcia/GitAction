import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
    form!: FormGroup;
    constructor(private fBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fBuilder.group({
            username: ['', Validators.required],
            type: ['MASTER', Validators.required],
            person: this.fBuilder.group({
                fullname: ['', [Validators.required, Validators.minLength(3)]],
                email: ['', [Validators.required, Validators.email]],
            }),
        });
    }

    get formUsername() {
        return this.form.get('username') as FormControl;
    }

    get formType() {
        return this.form.get('type') as FormControl;
    }

    get formPersonFullname() {
        return this.form.get('person.fullname') as FormControl;
    }

    get formPersonEmail() {
        return this.form.get('person.email') as FormControl;
    }

    invalidInput(control: FormControl) {
        return control.invalid && (control.dirty || control.touched);
    }

    showMsgError(control: FormControl, error: string) {
        return (control.touched || control.dirty) && control.hasError(error);
    }

    save() {
        const data = this.form.value;
        console.log(this.form);
        console.log(data);
    }
}
