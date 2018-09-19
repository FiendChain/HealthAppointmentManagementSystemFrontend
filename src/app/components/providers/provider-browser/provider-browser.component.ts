import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from '../../../api/api.service';
import { Observable } from "../../../../../node_modules/rxjs";
import { Provider } from "../../../models/provider.model";

@Component({
    selector: 'provider-browser',
    templateUrl: './provider-browser.component.html',
})
export class ProviderBrowser implements OnInit {
    private providers$: Observable<Provider[]>;
    @Input('providers') providers: Provider[];

    constructor(
        private api: ApiService,
    ) { }

    ngOnInit(): void {
        if (!this.providers) {
            this.providers$ = this.api.getProviders();
            this.providers$.subscribe((providers) => this.providers = providers);
        }
        
    }
}; 