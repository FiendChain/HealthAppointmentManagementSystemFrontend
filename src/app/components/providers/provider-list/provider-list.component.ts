import { Component, OnInit, Input } from "@angular/core";
import { Provider } from "../../../models/provider.model";
import { ApiService } from "../../../api/api.service";
import { ModalFormService } from "../../forms/modal-forms.service";
import { AuthService } from "../../../api/auth.service";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";

@Component({
    selector: 'provider-list',
    templateUrl: './provider-list.component.html',
})
export class ProviderList extends AppBrowserPanel implements OnInit {
    @Input('providers') providers: Provider[];

    public dtOptions: DataTables.Settings = {};

    constructor(
        private api: ApiService,
        private modal: ModalFormService,
        auth: AuthService,
    ) {
        super(auth);
    }

    ngOnInit(): void {
        this.dtOptions = {
            autoWidth: false,
            responsive: true,
        };
    }

    modify(provider: Provider, index: number) {
        this.modal
            .open_provider_form('Modify provider', provider)
            .then((form) => {
                if (form.onSubmitChange) {
                    this.api.patchProvider(provider.id, form.onSubmitChange)
                        .subscribe((patched_provider) => {
                            this.providers[index] = patched_provider;
                        })
                }
            });
    } 

    delete(provider: Provider, index: number) {
        this.modal
            .dialog("Delete provider", "Are you sure you want to delete this provider?")
            .then(() => {
                this.api.deleteProvider(provider.id)
                    .subscribe(() => {
                        this.providers.splice(index, 1);
                    });
            })
    }
}; 