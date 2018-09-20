import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../api/api.service";
import { Observable } from "rxjs";
import { Provider } from "../../../models/provider.model";
import { ActivatedRoute } from "@angular/router";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";
import { AuthService } from "../../../api/auth.service";
import { ModalFormService } from "../../forms/modal-forms.service";
import { Appointment } from "../../../models/appointment.model";
import { AlertService } from "../../../alerts/alerts.service";

@Component({
    selector: 'provider-profile',
    templateUrl: './provider-profile.component.html',
})
export class ProviderProfile extends AppBrowserPanel implements OnInit {
    private provider$: Observable<Provider>;
    private _provider: Provider;
    private id: number|string;
    private appointment_cache: Appointment|any = {};

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private modal: ModalFormService,
        private alert: AlertService,
        auth: AuthService,
    ) { 
        super(auth);
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.id = id;
        this.provider$ = this.api.getProvider(id);
        this.provider$.subscribe((provider) => {
            this._provider = provider;
        })
    }

    get provider(): Provider {
        return this._provider;
    }

    get show_toolbar(): boolean {
        if (this.current_user) {
            if (this.current_user.is_patient) return true;  // make appointmnet
            if (this.current_user.is_provider && this.id == this.current_user.id) return true; // modify own profile
            return false;
        }
        return false;
    }

    get show_patients(): boolean {
        if (this.current_user && this.current_user.is_patient) {
            return false;
        } else {
            return true;
        }
    }

    modify_profile(): void {
        this.modal
            .open_provider_form("Modify profile", this.provider, true)
            .then((form) => {
                if (form.onSubmitChange) {
                    this.api.patchProvider(this.id, form.onSubmitChange)
                        .subscribe((provider) => {
                            this._provider = provider;
                        });
                }
            })
    }

    add_appointment(): void {
        this.modal
            .open_appointment_form("Make appointment", {...(this.appointment_cache),
                    patient_id: this.current_user.id,
                    provider_id: this.provider.id,
                }, false, false)
            .then((form) => {
                this.appointment_cache = form.onSubmit;
                this.api.addAppointment(form.onSubmit)
                    .subscribe((appointment) => {
                        this.provider.appointments.push(appointment);
                    });
            })
    }

    modify_appointment(appointment: Appointment, index: number): void {
        this.modal
            .open_appointment_form("Modify appointment", appointment, false, false)
            .then((form) => {
                if (form.onSubmitChange) {
                    this.api.patchAppointment(appointment.id, form.onSubmitChange)
                        .subscribe((patched_appointment) => {
                            this.provider.appointments[index] = patched_appointment;
                        });     
                }
            });
    }

    delete_appointment(appointment: Appointment, index: number): void {
        this.modal
            .dialog("Cancel appointment", "Are you sure you want to cancel this appointment?")
            .then(() => {
                this.api.deleteAppointment(appointment.id)
                    .subscribe((response) => {
                        this.provider.appointments.splice(index, 1);
                        this.alert.addAlert({
                            type: 'success',
                            text: String(response),
                            autodismiss: 2.5,
                        });
                    });
            })
    }


}