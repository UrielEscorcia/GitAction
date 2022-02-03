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

    save() {
        const data = this.form.value;
        console.log(this.form);
        console.log(data);
    }
}
