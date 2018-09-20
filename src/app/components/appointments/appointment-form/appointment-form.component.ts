import { Component, OnInit, Input } from "@angular/core";
import { FormComponent } from "../../forms/form.component";
import { Appointment } from "../../../models/appointment.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiService } from "../../../api/api.service";
import { Observable } from "rxjs";
import { Provider } from "../../../models/provider.model";
import { Patient } from "../../../models/patient.model";

@Component({
    selector: 'appointment-form',
    templateUrl: './appointment-form.component.html',
})
export class AppointmentForm extends FormComponent implements OnInit {
    @Input('button-text') button_text: string = "Submit";
    @Input('show-patients') show_patients: boolean = true;
    @Input('show-providers') show_providers: boolean = true;

    public value: Appointment|any = {};
    private providers$: Observable<Provider[]>;
    private _providers: Provider[];
    private patients$: Observable<Patient[]>;
    private _patients: Patient[];

    constructor(
        private api: ApiService,
    ) {
        super();
    }

    get providers(): Provider[] {
        return this._providers;
    }

    get patients(): Patient[] {
        return this._patients;
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            'patient_id': new FormControl(this.value.patient_id, Validators.required),
            'provider_id': new FormControl(this.value.provider_id, Validators.required),
            'start_time': new FormControl(this.value.start_time, Validators.required),
            'end_time': new FormControl(this.value.end_time, Validators.required),
            'reason': new FormControl(this.value.reason || "", Validators.required),
            'comment': new FormControl(this.value.comment || ""),
        });
        this.providers$ = this.api.getProviders();
        this.patients$ = this.api.getPatients();
        if (this.show_patients) {
            this.patients$.subscribe((patients) => {
                this._patients = patients;
                let patient_id = this.form.get('patient_id');
                if (!patient_id.value) {
                    patient_id.setValue(patients[0].id);
                }
            });
        }
        if (this.show_providers) {
            this.providers$.subscribe((providers) => {
                this._providers = providers;
                let provider_id = this.form.get('provider_id');
                if (!provider_id.value) {
                    provider_id.setValue(providers[0].id);
                }
            });
        }
    }
}