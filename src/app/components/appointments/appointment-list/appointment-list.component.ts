import { Component, OnInit, Input } from "@angular/core";
import { Appointment } from "../../../models/appointment.model";
import { ApiService } from "../../../api/api.service";
import { AuthService } from "../../../api/auth.service";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";
import { ModalFormService } from "../../forms/modal-forms.service";

@Component({
    selector: 'appointment-list',
    templateUrl: './appointment-list.component.html',
})
export class AppointmentList extends AppBrowserPanel implements OnInit {

    constructor(
        private api: ApiService,
        private modal: ModalFormService,
        auth: AuthService,
    ) { 
        super(auth);
    }

    @Input('show_providers') show_providers: boolean = true;
    @Input('show_patients') show_patients: boolean = true;
    @Input('appointments') appointments: Appointment[];

    ngOnInit(): void {

    }

    modify(appointment: Appointment, index: number) {
        this.modal
            .open_appointment_form('Modify appointment', appointment, this.show_providers, this.show_patients)
            .then((form) => {
                if (form.onSubmitChange) {
                    this.api.patchAppointment(appointment.id, form.onSubmitChange)
                        .subscribe((patched_appointment) => {
                            this.appointments[index] = patched_appointment;
                        })
                }
            });
    } 

    delete(appointment: Appointment, index: number) {
        this.modal
            .dialog("Delete appointment", "Are you sure you want to delete this appointment?")
            .then(() => {
                this.api.deleteAppointment(appointment.id)
                    .subscribe(() => {
                        this.appointments.splice(index, 1);
                    });
            })
    }
}