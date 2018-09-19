import { Component, Input } from "@angular/core";
import { HealthCentreRating } from "../../../models/health_centre_rating.model";
import { ApiService } from "../../../api/api.service";
import { ModalFormService } from "../../forms/modal-forms.service";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";
import { AuthService } from "../../../api/auth.service";

@Component({
    selector: 'health-centre-rating-list',
    templateUrl: './health-centre-rating-list.component.html',
})
export class HealthCentreRatingList extends AppBrowserPanel {
    @Input('health-centre-ratings') health_centre_ratings: HealthCentreRating[];

    constructor(
        private api: ApiService,
        private modal: ModalFormService,
        auth: AuthService,
    ) {
        super(auth);
    }

    modify(health_centre_rating: HealthCentreRating, index: number): void {
        this.modal
            .open_health_centre_rating_form('Modify rating', health_centre_rating)
            .then((form) => {
                if (form.onSubmitChange) {
                    this.api
                        .patchHealthCentreRating(health_centre_rating.id, form.onSubmitChange)
                        .subscribe((patched_health_centre_rating) => {
                            this.health_centre_ratings[index] = patched_health_centre_rating;
                        });
                }
            })
    }

    delete(health_centre_rating: HealthCentreRating, index: number): void {
        this.modal
            .dialog('Delete rating', 'Are you sure you want to delete this rating?')
            .then(() => {
                this.api
                    .deleteHealthCentreRating(health_centre_rating.id)
                    .subscribe(() => {
                        this.health_centre_ratings.splice(index, 1);
                    });
            });
    }
}