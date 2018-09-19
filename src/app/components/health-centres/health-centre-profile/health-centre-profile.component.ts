import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../api/api.service";
import { Observable } from "rxjs";
import { HealthCentre } from "../../../models/health_centre.model";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../api/auth.service";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";

@Component({
    selector: 'health-centre-profile',
    templateUrl: './health-centre-profile.component.html',
})
export class HealthCentreProfile extends AppBrowserPanel implements OnInit  {
    private _health_centre: HealthCentre;
    private health_centre$: Observable<HealthCentre>;
    private id: string;

    constructor(
        private api: ApiService, 
        private route: ActivatedRoute,
        auth: AuthService,
    ) { 
        super(auth);
    }

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        this.id = id;
        this.health_centre$ = this.api.getHealthCentre(id);
        this.health_centre$.subscribe((health_centre: HealthCentre) => {
            this._health_centre = health_centre;
        })
    }

    get health_centre(): HealthCentre {
        return this._health_centre;
    }

    patch_health_centre(health_centre: HealthCentre): void {
        this.api.patchHealthCentre(this.id, health_centre)
            .subscribe((health_centre: HealthCentre) => {
                this._health_centre = health_centre;
            })
    }


}