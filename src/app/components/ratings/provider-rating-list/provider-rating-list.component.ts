import { Component, Input } from "@angular/core"; 
import { ProviderRating } from "../../../models/provider_rating.model";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";
import { AuthService } from "../../../api/auth.service";
import { ApiService } from "../../../api/api.service";
import { ModalFormService } from "../../forms/modal-forms.service";

@Component({
    selector: 'provider-rating-list',
    templateUrl: './provider-rating-list.component.html',
})
export class ProviderRatingList extends AppBrowserPanel {
    @Input('provider-ratings') provider_ratings: ProviderRating[];

    constructor(
        private api: ApiService,
        private modal: ModalFormService,
        auth: AuthService,
    ) {
        super(auth);
    }

    modify(provider_rating: ProviderRating, index: number): void {
        this.modal
            .open_provider_rating_form('Modify rating', provider_rating)
            .then((form) => {
                if (form.onSubmitChange) {
                    this.api
                        .patchProviderRating(provider_rating.id, form.onSubmitChange)
                        .subscribe((patched_provider_rating) => {
                            this.provider_ratings[index] = patched_provider_rating;
                        });
                }
            })
    }

    delete(provider_rating: ProviderRating, index: number): void {
        this.modal
            .dialog('Delete rating', 'Are you sure you want to delete this rating?')
            .then(() => {
                this.api
                    .deleteProviderRating(provider_rating.id)
                    .subscribe(() => {
                        this.provider_ratings.splice(index, 1);
                    });
            });
    }
}