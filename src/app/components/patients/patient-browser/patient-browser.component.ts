import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from '../../../api/api.service';
import { Observable } from "../../../../../node_modules/rxjs";
import { Patient } from "../../../models/patient.model";

@Component({
    selector: 'patient-browser',
    templateUrl: './patient-browser.component.html',
})
export class PatientBrowser implements OnInit {
    private patients$: Observable<Patient[]>;
    @Input('patients') patients: Patient[];

    constructor(
        private api: ApiService,
    ) { }

    ngOnInit(): void {
        if (!this.patients) {
            this.patients$ = this.api.getPatients();
            this.patients$.subscribe((patients) => this.patients = patients);
        }
    }
}; 