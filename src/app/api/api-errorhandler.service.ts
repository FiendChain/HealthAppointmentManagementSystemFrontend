import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Router } from "@angular/router";
import { AlertService } from "../alerts/alerts.service";
import { AuthService } from "./auth.service";

@Injectable()
export class ApiErrorHandler implements HttpInterceptor {
    constructor(
        private router: Router,
        private alert: AlertService,
        private auth: AuthService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
            .handle(request)
            .do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    switch (err.status) {
                    case 400:
                        this.alert.addAlert({
                            type: 'danger',
                            text: err.error,
                            autodismiss: 5,
                        });
                        break;
                    case 401:
                        this.auth.check_auto_login();
                        break;
                    case 403:
                    case 404:
                        this.router.navigateByUrl(this.auth.default_route);
                        break;
                    }
                }
            });
    }
};