import { Component, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HealthCentre } from "../../models/health_centre.model";
import { Patient } from "../../models/patient.model";
import { Provider } from "../../models/provider.model";
import { Appointment } from "../../models/appointment.model";
import { HealthCentreRating } from "../../models/health_centre_rating.model";
import { ProviderRating } from "../../models/provider_rating.model";

abstract class ModalForm {
    public value: any = {};
    private on_submit = new EventEmitter<any>();
    private on_submit_change = new EventEmitter<any>();

    all(value: any) {
        this.activeModal.close(value);
    }

    constructor(
        public activeModal: NgbActiveModal,
    ) {}
}

@Component({
    template: `
    <modal-body [title]="title" (onClick)="activeModal.dismiss()">
        <patient-form [value]="value" [password-field]="password_field" (all)="all($event)"></patient-form>
    </modal-body>
    `,
})
export class ModalPatientForm extends ModalForm {
    public value: Patient|any = {};
    public password_field: boolean = false;
    constructor(activeModal: NgbActiveModal) {
        super(activeModal);
    }
}

@Component({
    selector: 'modal-patient-form',
    template: `
    <modal-body [title]="title" (onClick)="activeModal.dismiss()">
        <provider-form [value]="value" [password-field]="password_field" (all)="all($event)"></provider-form>
    </modal-body>
    `,
})
export class ModalProviderForm extends ModalForm {
    public value: Provider|any = {};
    public password_field: boolean = false;
    constructor(activeModal: NgbActiveModal) {
        super(activeModal);
    }
}

@Component({
    template: `
    <modal-body [title]="title" (onClick)="activeModal.dismiss()">
        <health-centre-form [value]="value" (all)="all($event)"></health-centre-form>
    </modal-body>
    `,
})
export class ModalHealthCentreForm extends ModalForm {
    public value: HealthCentre|any = {};
    constructor(activeModal: NgbActiveModal) {
        super(activeModal);
    }
}

@Component({
    template: `
    <modal-body [title]="title" (onClick)="activeModal.dismiss()">
        <appointment-form [value]="value" [show-providers]="show_providers" [show-patients]="show_patients" (all)="all($event)"></appointment-form>
    </modal-body>
    `
})
export class ModalAppointmentForm extends ModalForm {
    public value: Appointment|any = {};
    public show_providers: boolean = true;
    public show_patients: boolean = true;
    constructor(activeModal: NgbActiveModal) {
        super(activeModal);
    }
}

@Component({
    template: `
    <modal-body [title]="title" (onClick)="activeModal.dismiss()">
        <health-centre-rating-form [value]="value" [show-patients]="show_patients" [show-health-centres]="show_health_centres" (all)="all($event)"></health-centre-rating-form>
    </modal-body>
    `
})
export class ModalHealthCentreRatingForm extends ModalForm {
    public value: HealthCentreRating|any = {};
    public show_patients: boolean = false;
    public show_health_centres: boolean = false;
    constructor(activeModal: NgbActiveModal) {
        super(activeModal);
    }
}

@Component({
    template: `
    <modal-body [title]="title" (onClick)="activeModal.dismiss()">
        <provider-rating-form [value]="value" [show-patients]="show_patients" [show-providers]="show_providers" (all)="all($event)"></provider-rating-form>
    </modal-body>
    `
})
export class ModalProviderRatingForm extends ModalForm {
    public value: ProviderRating|any = {};
    public show_patients: boolean = false;
    public show_providers: boolean = false;
    constructor(activeModal: NgbActiveModal) {
        super(activeModal);
    }
}







