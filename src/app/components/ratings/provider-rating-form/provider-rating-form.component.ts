import { Component, OnInit, Input } from "@angular/core";
import { FormComponent } from "../../forms/form.component";
import { ProviderRating } from "../../../models/provider_rating.model";
import { Observable } from "rxjs";
import { Patient } from "../../../models/patient.model";
import { Provider } from "../../../models/provider.model";
import { ApiService } from "../../../api/api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'provider-rating-form',
    templateUrl: './provider-rating-form.component.html',
})
export class ProviderRatingForm extends FormComponent implements OnInit {
    @Input('button-text') button_text: string = 'Submit';
    @Input('show-patients') show_patients: boolean = false;
    @Input('show-providers') show_providers: boolean = false;

    public value: ProviderRating|any = {};
    private patients$: Observable<Patient[]>;
    private _patients: Patient[];
    private providers$: Observable<Provider[]>;
    private _providers: Provider[];

    constructor(
        private api: ApiService,
    ) {
        super();
    }

    get patients(): Patient[] {
        return this._patients;
    }

    get providers(): Provider[] {
        return this._providers;
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            'patient_id': new FormControl(this.value.patient_id, Validators.required),
            'provider_id': new FormControl(this.value.provider_id, Validators.required),
            'rating': new FormControl(this.value.rating || 5, Validators.required),
            'comment': new FormControl(this.value.comment || ""),
        });
        this.patients$ = this.api.getPatients();
        this.patients$.subscribe((patients) => {
            this._patients = patients;
            let patient_id = this.form.get('patient_id');
            if (!patient_id.value) {
                patient_id.setValue(patients[0].id);
            }
        });
        this.providers$ = this.api.getProviders();
        this.providers$.subscribe((providers) => {
            this._providers = providers;
            let provider_id = this.form.get('provider_id');
            if (!provider_id.value) {
                provider_id.setValue(providers[0].id);
            }
        });
    }
}