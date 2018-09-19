import { Component, OnInit } from "@angular/core";
import { Appointment } from "../../../models/appointment.model";
import { ApiService } from "../../../api/api.service";
import { Observable } from "rxjs";
import { AuthService } from "../../../api/auth.service";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";

@Component({
    selector: 'appointment-browser',
    templateUrl: './appointment-browser.component.html',
})
export class AppointmentBrowser extends AppBrowserPanel implements OnInit {
    private _appointments: Appointment[];
    private appointments$: Observable<Appointment[]>;

    constructor(
        private api: ApiService,
        auth: AuthService,
    ) { 
        super(auth);
    }

    get appointments(): Appointment[] {
        return this._appointments;
    }

    ngOnInit(): void {
        this.appointments$ = this.api.getAppointments();
        if (!this.appointments) {
            this.appointments$.subscribe((appointments: Appointment[]) => {
                this._appointments = appointments;
            });
        }
    }

    add_appointment(appointment: Appointment): void {
        this.api.addAppointment(appointment)
            .subscribe((appointment) => {
                this._appointments.push(appointment);
            });
    }


}