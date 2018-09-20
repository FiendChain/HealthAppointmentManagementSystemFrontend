import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../api/api.service";
import { Observable } from "rxjs";
import { Patient } from "../../../models/patient.model";
import { ActivatedRoute } from "@angular/router";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";
import { AuthService } from "../../../api/auth.service";
import { ModalFormService } from "../../forms/modal-forms.service";

@Component({
    selector: 'patient-profile',
    templateUrl: './patient-profile.component.html',
})
export class PatientProfile extends AppBrowserPanel implements OnInit {
    private _patient: Patient;
    private patient$: Observable<Patient>;
    private id: string|number;

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private modal: ModalFormService,
        auth: AuthService,
    ) { 
        super(auth);
    }

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

    get show_toolbar(): boolean {
        return (this.current_user
            && (this.current_user.is_patient && this.current_user.id == this.id) 
        );
    }

    modify_patient(): void {
        this.modal
            .open_patient_form("Modify profile", this.patient, true)
            .then((form) => {
                if (form.onSubmitChange) {
                    this.api.patchPatient(this.id, form.onSubmitChange)
                        .subscribe((patient) => {
                            this._patient = patient;
                        });
                }
            });
    }


}