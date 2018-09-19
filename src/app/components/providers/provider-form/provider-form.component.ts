import { Component, OnInit, Input } from "@angular/core";
import { FormComponent } from "../../forms/form.component";
import { Provider, ProviderTypes } from "../../../models/provider.model";
import { ApiService } from "../../../api/api.service";
import { HealthCentre } from "../../../models/health_centre.model";
import { Observable } from "rxjs";
import { Validators, FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: 'provider-form',
    templateUrl: './provider-form.component.html',
})
export class ProviderForm extends FormComponent implements OnInit {
    @Input('button-text') button_text: string = 'Submit';
    @Input('password-field') password_field: boolean = false;
    public value: Provider|any = {};
    private _health_centres$: Observable<HealthCentre[]>;

    constructor(
        private api: ApiService,
    ) {
        super();
    }

    get health_centres$(): Observable<HealthCentre[]> {
        return this._health_centres$;
    }

    get provider_types(): string[] {
        return ProviderTypes;
    }

    ngOnInit(): void {
        this.create_form();
        this._health_centres$ = this.api.getHealthCentres();
        this.health_centres$.subscribe((health_centres: HealthCentre[]) => {
            let health_centre_id = this.form.get('health_centre_id');
            if (!health_centre_id.value)
                health_centre_id.setValue(health_centres[0].id);
        });
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
            'provider_number': new FormControl(this.value.provider_number, [
                Validators.required,
                Validators.minLength(10),
            ]),
            'provider_type': new FormControl(this.value.provider_type || this.provider_types[0], [
                Validators.required,
            ]),
            'health_centre_id': new FormControl(this.value.health_centre_id, [
                Validators.required,
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