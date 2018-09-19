import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../api/auth.service";
import { Router } from "@angular/router";
import { Login } from "../../../models/login.model";
import { CookieService } from "angular2-cookie";
import { User } from "../../../models/user.model";

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginForm implements OnInit {
    public credentials: Login = {
        email: undefined,
        password: undefined,
    };

    private _remember_me: boolean;
    private _auto_login: boolean;

    constructor(
        private auth: AuthService,
        private router: Router,
        private cookies: CookieService,
    ) { }

    ngOnInit(): void {
        this.remember_me = JSON.parse(this.cookies.get('remember_me'));
        this.auto_login = JSON.parse(this.cookies.get('auto_login'));
        if (this.remember_me) {
            this.credentials.email = this.cookies.get('email');
            this.credentials.password = this.cookies.get('password');
        }
    }

    set remember_me(remember_me: boolean) {
        this._remember_me = remember_me;
        this.cookies.put('remember_me', String(remember_me));
        if (!remember_me) {
            this.auto_login = false;
        }
    }

    get remember_me(): boolean {
        return this._remember_me;
    }

    set auto_login(auto_login: boolean) {
        this._auto_login = auto_login;
        this.cookies.put('auto_login', String(auto_login));
        if (auto_login) {
            this.remember_me = true;
        }
    }

    get auto_login(): boolean {
        return this._auto_login;
    }

    private store_credentials(): void {
        if (this.remember_me) {
            this.cookies.put('email', this.credentials.email);
            this.cookies.put('password', this.credentials.password);
        } else {
            this.cookies.remove('email');
            this.cookies.remove('password');
        }
        this.cookies.put('remember_me', String(this.remember_me));
        this.cookies.put('auto_login', String(this.auto_login));
    }

    login(): void {
        this.auth.login({
            email: this.credentials.email,
            password: this.credentials.password,
        }).then((user: User) => {
            this.store_credentials();
            switch (user.type) {
            case 'admin':
                this.router.navigateByUrl('/patients');
                break;
            case 'patient':
            case 'provider':
            default:
                this.router.navigateByUrl('/appointments');
                break;
            }
        }, (err) => {

        });
    }
};