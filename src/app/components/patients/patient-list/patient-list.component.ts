import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from '../../../api/api.service';
import { Patient } from "../../../models/patient.model";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";
import { AuthService } from "../../../api/auth.service";
import { ModalFormService } from "../../forms/modal-forms.service";

@Component({
    selector: 'patient-list',
    templateUrl: './patient-list.component.html',
})
export class PatientList extends AppBrowserPanel implements OnInit {
    @Input('patients') patients: Patient[];

    constructor(
        private api: ApiService,
        private modal: ModalFormService,
        auth: AuthService,
    ) { 
        super(auth);
    }

    ngOnInit(): void {

    }

    modify(patient: Patient, index: number) {
        this.modal
            .open_patient_form('Modify patient', patient)
            .then((form) => {
                if (form.onSubmitChange) {
                    this.api.patchPatient(patient.id, form.onSubmitChange)
                        .subscribe((patched_patient) => {
                            this.patients[index] = patched_patient;
                        })
                }
            });
    } 

    delete(patient: Patient, index: number) {
        this.modal
            .dialog("Delete patient", "Are you sure you want to delete this patient?")
            .then(() => {
                this.api.deletePatient(patient.id)
                    .subscribe(() => {
                        this.patients.splice(index, 1);
                    });
            })
    }


}; 