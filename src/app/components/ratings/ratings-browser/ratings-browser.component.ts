import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../api/api.service";
import { Observable } from "rxjs";
import { HealthCentreRating } from "../../../models/health_centre_rating.model";
import { ProviderRating } from "../../../models/provider_rating.model";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";
import { AuthService } from "../../../api/auth.service";
import { ModalFormService } from "../../forms/modal-forms.service";

@Component({
    selector: 'ratings-browser',
    templateUrl: './ratings-browser.component.html',
})
export class RatingsBrowser extends AppBrowserPanel implements OnInit {
    private health_centre_ratings$: Observable<HealthCentreRating[]>;
    private _health_centre_ratings: HealthCentreRating[];
    private provider_ratings$: Observable<ProviderRating[]>;
    private _provider_ratings: ProviderRating[];

    constructor(
        private api: ApiService,
        private modal: ModalFormService,
        auth: AuthService,
    ) {
        super(auth);
    }

    get health_centre_ratings(): HealthCentreRating[] {
        return this._health_centre_ratings;
    }

    get provider_ratings(): ProviderRating[] {
        return this._provider_ratings;
    }

    ngOnInit(): void {
        this.health_centre_ratings$ = this.api.getHealthCentreRatings();
        this.health_centre_ratings$.subscribe((health_centre_ratings) => {
            this._health_centre_ratings = health_centre_ratings;
        })
        this.provider_ratings$ = this.api.getProviderRatings();
        this.provider_ratings$.subscribe((provider_ratings) => {
            this._provider_ratings = provider_ratings;
        })
    }

    add_health_centre_rating() {
        this.modal
            .open_health_centre_rating_form('Add health centre rating', {}, true, true)
            .then((form) => {
                this.api.addHealthCentreRating(form.onSubmit)
                    .subscribe((health_centre_rating) => {
                        this._health_centre_ratings.push(health_centre_rating);
                    });
            })
        
    }

    add_provider_rating() {
        this.modal
            .open_provider_rating_form('Add provider rating', {}, true, true)
            .then((form) => {
                this.api.addProviderRating(form.onSubmit)
                    .subscribe((provider_rating) => {
                        this._provider_ratings.push(provider_rating);
                    });
            });
    }

}