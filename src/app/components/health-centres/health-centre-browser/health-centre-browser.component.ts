import { Component, OnInit } from "@angular/core";
import { ApiService } from '../../../api/api.service';
import { Observable } from "../../../../../node_modules/rxjs";
import { HealthCentre } from "../../../models/health_centre.model";
import { AuthService } from "../../../api/auth.service";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'health-centre-browser',
    templateUrl: './health-centre-browser.component.html',
})
export class HealthCentreBrowser extends AppBrowserPanel implements OnInit {
    private _health_centres: HealthCentre[];
    private health_centres$: Observable<HealthCentre[]>;

    constructor(
        private api: ApiService,
        auth: AuthService,
        private modal: NgbModal,
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

    add_health_centre(health_centre: HealthCentre): void {
        this.api.addHealthCentre(health_centre)
            .subscribe((health_centre: HealthCentre) => {
                this._health_centres.push(health_centre);
            });
    }

    test_content(content) {
        console.log(content);
        this.modal.open(content);
    }
}; 