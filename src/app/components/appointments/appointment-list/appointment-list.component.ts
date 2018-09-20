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

    @Input('show-providers') show_providers: boolean = true;
    @Input('show-patients') show_patients: boolean = true;
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

    get delete_message(): DeleteParams {
        switch (this.current_user.type) {
        case 'patient':
            return {
                title: "Cancel appointment",
                message: "Are you sure you want to cancel this appointment?",
            };
        case 'provider':
            return {
                title: "Cancel appointment",
                message: "Are you sure you want to cancel this patient's appointment?",
            }
        case 'admin':
        default:
            return {
                title: "Delete appointment",
                message: "Are you sure you want to delete this appointment?",
            };
        }
    }

    delete(appointment: Appointment, index: number) {
        let delete_message = this.delete_message;
        this.modal
            .dialog(delete_message.title, delete_message.message)
            .then(() => {
                this.api.deleteAppointment(appointment.id)
                    .subscribe(() => {
                        this.appointments.splice(index, 1);
                    });
            })
    }
}

interface DeleteParams {
    title: string;
    message: string;
}