import { Component, OnInit } from "@angular/core";
import { ApiService } from '../../../api/api.service';
import { Observable } from "../../../../../node_modules/rxjs";
import { HealthCentre } from "../../../models/health_centre.model";
import { AuthService } from "../../../api/auth.service";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";
import { ModalFormService } from "../../forms/modal-forms.service";

@Component({
    selector: 'health-centre-browser',
    templateUrl: './health-centre-browser.component.html',
})
export class HealthCentreBrowser extends AppBrowserPanel implements OnInit {
    private _health_centres: HealthCentre[];
    private health_centres$: Observable<HealthCentre[]>;

    constructor(
        private api: ApiService,
        private modal: ModalFormService,
        auth: AuthService,
    ) { 
        super(auth);
    }

    ngOnInit(): void {
        this.health_centres$ = this.api.getHealthCentres();
        this.health_centres$.subscribe((health_centres: HealthCentre[]) => {
            this._health_centres = health_centres;
        });
    }

    get health_centres(): HealthCentre[] {
        return this._health_centres;
    }

    add_health_centre(): void {
        this.modal.open_health_centre_form('Add health centre')
            .then((form) => {
                this.api.addHealthCentre(form.onSubmit)
                    .subscribe((health_centre: HealthCentre) => {
                        this._health_centres.push(health_centre);
                    });
            });
    }
}; 