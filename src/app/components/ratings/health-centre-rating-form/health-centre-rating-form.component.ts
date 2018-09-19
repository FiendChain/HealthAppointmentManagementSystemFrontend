import { Component, OnInit, Input } from "@angular/core";
import { FormComponent } from "../../forms/form.component";
import { ProviderRating } from "../../../models/provider_rating.model";
import { Observable } from "rxjs";
import { Patient } from "../../../models/patient.model";
import { ApiService } from "../../../api/api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HealthCentre } from "../../../models/health_centre.model";

@Component({
    selector: 'health-centre-rating-form',
    templateUrl: './health-centre-rating-form.component.html',
})
export class HealthCentreRatingForm extends FormComponent implements OnInit {
    @Input('button-text') button_text: string = 'Submit';
    @Input('show-patients') show_patients: boolean = false;
    @Input('show-health-centres') show_health_centres: boolean = false;

    public value: ProviderRating|any = {};
    private patients$: Observable<Patient[]>;
    private _patients: Patient[];
    private health_centres$: Observable<HealthCentre[]>;
    private _health_centres: HealthCentre[];

    constructor(
        private api: ApiService,
    ) {
        super();
    }

    get patients(): Patient[] {
        return this._patients;
    }

    get health_centres(): HealthCentre[] {
        return this._health_centres;
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            'patient_id': new FormControl(this.value.patient_id, Validators.required),
            'health_centre_id': new FormControl(this.value.health_centre_id, Validators.required),
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
        this.health_centres$ = this.api.getHealthCentres();
        this.health_centres$.subscribe((health_centres) => {
            this._health_centres = health_centres;
            let health_centre_id = this.form.get('health_centre_id');
            if (!health_centre_id.value) {
                health_centre_id.setValue(health_centres[0].id);
            }
        });
    }
}