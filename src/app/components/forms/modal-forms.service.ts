import { Injectable, EventEmitter } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { HealthCentre } from "../../models/health_centre.model";
import { ModalConfirm } from "./modal-dialog.component";
import { 
    ModalHealthCentreForm, 
    ModalProviderForm, 
    ModalPatientForm, 
    ModalAppointmentForm, 
    ModalHealthCentreRatingForm,
    ModalProviderRatingForm
} from "./modal-forms.component";
import { Provider } from "../../models/provider.model";
import { Patient } from "../../models/patient.model";
import { Appointment } from "../../models/appointment.model";
import { HealthCentreRating } from "../../models/health_centre_rating.model";
import { ProviderRating } from "../../models/provider_rating.model";

interface FormResponse {
    onSubmit: any;
    onSubmitChange: any;
}

@Injectable()
export class ModalFormService {
    constructor(
        private modal: NgbModal,
    ) {}

    private open_with_animation(component): NgbModalRef {
        return this.modal.open(component, { 
            backdropClass: 'modal-backdrop-animation',
            windowClass:'modal-window-animation',
        });
    }

    private handle_dismissal(modalRef: NgbModalRef): Promise<any> {
        return new Promise((resolve, reject) => {
            modalRef.result
                .then((data) => resolve(data))
                .catch((error) => {});
        });
    }

    private open_modal_form(component, value, title): NgbModalRef {
        const modalRef = this.open_with_animation(component);
        modalRef.componentInstance.value = value;
        modalRef.componentInstance.title = title;
        return modalRef;
    }

    open_health_centre_form(title: string, health_centre: HealthCentre|any = {}): Promise<FormResponse> {
        let modalRef = this.open_modal_form(ModalHealthCentreForm, health_centre, title);
        return this.handle_dismissal(modalRef);
    }

    open_provider_form(title: string, provider: Provider|any = {}, password_field: boolean = false): Promise<FormResponse> {
        let modalRef = this.open_modal_form(ModalProviderForm, provider, title);
        modalRef.componentInstance.password_field = password_field;
        return this.handle_dismissal(modalRef);
    }

    open_patient_form(title: string, patient: Patient|any = {}, password_field: boolean = false): Promise<FormResponse> {
        let modalRef = this.open_modal_form(ModalPatientForm, patient, title);
        modalRef.componentInstance.password_field = password_field;
        return this.handle_dismissal(modalRef);
    }

    open_appointment_form(title: string, appointment: Appointment|any={}, show_providers: boolean=true, show_patients: boolean=true): Promise<FormResponse> {
        let modalRef = this.open_modal_form(ModalAppointmentForm, appointment, title);
        modalRef.componentInstance.show_patients = show_patients;
        modalRef.componentInstance.show_providers = show_providers;
        return this.handle_dismissal(modalRef);
    }

    open_health_centre_rating_form(title: string, health_centre_rating: HealthCentreRating|any={}, show_patients: boolean=false, show_health_centres: boolean=false): Promise<FormResponse> {
        let modalRef = this.open_modal_form(ModalHealthCentreRatingForm, health_centre_rating, title);
        modalRef.componentInstance.show_patients = show_patients;
        modalRef.componentInstance.show_health_centres = show_health_centres;
        return this.handle_dismissal(modalRef);
    }

    open_provider_rating_form(title: string, provider_rating: ProviderRating|any={}, show_patients: boolean=false, show_providers: boolean=false): Promise<FormResponse> {
        let modalRef = this.open_modal_form(ModalProviderRatingForm, provider_rating, title);
        modalRef.componentInstance.show_patients = show_patients;
        modalRef.componentInstance.show_providers = show_providers;
        return this.handle_dismissal(modalRef);
    }

    dialog(title: string, text: string): Promise<any> {
        const modalRef = this.open_with_animation(ModalConfirm);
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.text = text;
        return this.handle_dismissal(modalRef);
    }
}