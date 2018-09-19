import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../api/api.service";
import { Observable } from "rxjs";
import { Provider } from "../../../models/provider.model";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'provider-profile',
    templateUrl: './provider-profile.component.html',
})
export class ProviderProfile implements OnInit {
    private _provider$: Observable<Provider>;

    constructor(
        private api: ApiService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this._provider$ = this.api.getProvider(id);
    }

    get provider$(): Observable<Provider> {
        return this._provider$;
    }


}