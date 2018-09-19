import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpEvent } from "@angular/common/http";

import { API_URL, JSONToUrlEncoded, OPTIONS } from "./api.config";
import { Login } from '../models/login.model';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { User } from "../models/user.model";
import { CookieService } from "angular2-cookie";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    private _current_user: User;

    constructor(
        private http: HttpClient,
        private cookies: CookieService,
        private router: Router,
    ) { }

    get current_user(): User {
        return this._current_user;
    }

    get default_route(): string {
		if (!this.current_user) {
			return '/login';
		}
		switch (this.current_user.type) {
		case 'admin':
			return '/patients';
		case 'patient':
		case 'provider':
			return '/appointments';
		default:
			return '/login';
		}
	}

    attempt_login() {
        this.check_login()
            .then(() => {
                if (this.router.url == '/')
                    this.router.navigateByUrl(this.default_route);
            }, () => {
                this.check_auto_login();
            });
    }

    check_auto_login() {
        // attempt auto login with stored credentials
        if (JSON.parse(this.cookies.get('auto_login'))) {
            // auto login worked
            this.auto_login().then((user: User) => {
                if (this.router.url == '/') this.router.navigateByUrl(this.default_route);
            // auto login failed
            }, () => {
                this.router.navigateByUrl('/login');
            });
        } else {
            // if not logged in, and no auto login
            this.router.navigateByUrl('/login');
        }
    }

    check_login(): Promise<User> {
        let request: Observable<any> = this.http
            .get<User>(`${API_URL}/login`, OPTIONS)
            .catch((err: any) => {
                this._current_user = undefined;
                throw err;
            });
        return new Promise<User>((resolve, reject) => {
            request.subscribe((user: User) => {
                this._current_user = user;
                resolve(user);
            }, (err) => {
                reject(err);
            });
        }); 
    }

    auto_login(): Promise<User> {
        return this.login({
            email: this.cookies.get('email'),
            password: this.cookies.get('password'),
        });
    }

    login(credentials: Login): Promise<User> {
        let request: Observable<any> = this.http
            .post<Login>(`${API_URL}/login`, JSONToUrlEncoded(credentials), OPTIONS)
            .catch((err: any) => {
                this._current_user = undefined;
                return err;
            });
        
        return new Promise<User>((resolve, reject) => {
            request.subscribe((user: User) => {
                this._current_user = user;
                resolve(user);
            }, (err) => {
                reject(err);
            });
        });
    }

    logout(): Promise<any> {
        let request = this.http
            .get<any>(`${API_URL}/logout`, OPTIONS)
            .catch((err: any) => {
                return Observable.of(undefined);
            });
        return new Promise<any>((resolve, reject) => {
            request.subscribe((response) => {
                this._current_user = undefined;
                resolve(response);
            }, (err) => {
                reject(err);
            })
        });
    }
}