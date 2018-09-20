import { Component, OnInit } from "@angular/core";
import { Appointment } from "../../../models/appointment.model";
import { ApiService } from "../../../api/api.service";
import { Observable } from "rxjs";
import { AuthService } from "../../../api/auth.service";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";
import { ModalFormService } from "../../forms/modal-forms.service";

@Component({
    selector: 'appointment-browser',
    templateUrl: './appointment-browser.component.html',
})
export class AppointmentBrowser extends AppBrowserPanel implements OnInit {
    private _appointments: Appointment[];
    private appointments$: Observable<Appointment[]>;

    private appointment_form_cache: Appointment|any = {};

    constructor(
        private api: ApiService,
        private modal: ModalFormService,
        auth: AuthService,
    ) { 
        super(auth);
    }

    get appointments(): Appointment[] {
        return this._appointments;
    }

    get show_patients(): boolean {
        return (this.current_user 
            && (this.current_user.is_admin || this.current_user.is_provider)
        );
    }

    get show_providers(): boolean {
        return (this.current_user
            && (this.current_user.is_admin || this.current_user.is_patient)  
        );
    }

    ngOnInit(): void {
        this.appointments$ = this.api.getAppointments();
        if (!this.appointments) {
            this.appointments$.subscribe((appointments: Appointment[]) => {
                this._appointments = appointments;
            });
        }
    }

    add_appointment(): void {
        this.modal
            .open_appointment_form('Add appointment', this.appointment_form_cache)
            .then((form) => {
                this.appointment_form_cache = form.onSubmit;
                this.api.addAppointment(form.onSubmit)
                    .subscribe((appointment) => {
                        this.appointment_form_cache = {};
                        this._appointments.push(appointment);
                    });
            });
    }


}