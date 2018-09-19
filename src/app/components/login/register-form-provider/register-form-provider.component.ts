import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../api/api.service";
import { CookieService } from "angular2-cookie";
import { Router } from "@angular/router";
import { Provider } from "../../../models/provider.model";

@Component({
    selector: 'register-form-provider',
    templateUrl: './register-form-provider.component.html',
    styleUrls: ['./register-form-provider.component.css'],
})
export class RegisterFormProvider implements OnInit {
    constructor(
        private api: ApiService,
        private cookies: CookieService,
        private router: Router,
    ) { }

    ngOnInit(): void {

    }

    register(provider: Provider): void {
        this.api.addProvider(provider)
            .subscribe((provider: Provider) => {
                this.cookies.put('email', provider.email);
                this.cookies.remove('password');
                this.router.navigateByUrl('/login');
            });
    }


}