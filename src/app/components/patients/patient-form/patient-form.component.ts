import { Component, OnInit, Input } from "@angular/core";
import { FormComponent } from "../../forms/form.component";
import { Patient } from "../../../models/patient.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'patient-form',
    templateUrl: './patient-form.component.html'
})
export class PatientForm extends FormComponent implements OnInit {
    @Input('button-text') button_text: string = 'Submit';
    @Input('password-field') password_field: boolean = false;
    public value: Patient|any = {};

    ngOnInit(): void {
        this.create_form();
    }

    private create_form() {
        this.form = new FormGroup({
            'name': new FormControl(this.value.name, Validators.required),
            'email': new FormControl(this.value.email, [
                Validators.required,
                Validators.email,
            ]),
            'phone': new FormControl(this.value.phone, [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(8),
            ]),
            'medicare': new FormControl(this.value.medicare, [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10),
            ]),
        });
        if (this.password_field) {
            this.form.addControl('password', new FormControl(this.value.password, [
                Validators.required,
                Validators.minLength(6),
            ]));
            this.form.addControl('confirm_password', new FormControl(this.value.password, Validators.required));
            this.form.setValidators([this.check_password]);
        }
    }

    check_password(group: FormGroup) {
        let pass = group.get('password').value;
        let confirm_pass = group.get('confirm_password').value;
        if (pass != confirm_pass && pass && confirm_pass) {
            return { confirm_password: true };
        } else {
            return null;
        }
    }
}