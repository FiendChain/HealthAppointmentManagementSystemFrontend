import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../api/api.service";
import { Observable } from "rxjs";
import { Patient } from "../../../models/patient.model";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'patient-profile',
    templateUrl: './patient-profile.component.html',
})
export class PatientProfile implements OnInit {
    private _patient: Patient;
    private patient$: Observable<Patient>;
    private id: string;

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.id = id;
        this.patient$ = this.api.getPatient(id);
        this.patient$.subscribe((patient: Patient) => {
            this._patient = patient;
        })
    }

    get patient(): Patient {
        return this._patient;
    }

    patch_patient(patient: Patient): void {
        this.api.patchPatient(this.id, patient)
            .subscribe((patient) => {
                this._patient = patient;
            });
    }


}