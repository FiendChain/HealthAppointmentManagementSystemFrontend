import { Component, OnInit } from "@angular/core";
import { Patient } from "../../../models/patient.model";
import { ApiService } from "../../../api/api.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CookieService } from "angular2-cookie";
import { Router } from "@angular/router";

@Component({
    selector: 'register-form-patient',
    templateUrl: './register-form-patient.component.html',
    styleUrls: ['./register-form-patient.component.css'],
})
export class RegisterFormPatient implements OnInit {

    constructor(
        private api: ApiService,
        private cookies: CookieService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        
    }

    register(patient: Patient): void {
        this.api.addPatient(patient)
            .subscribe((patient: Patient) => {
                this.cookies.put('email', patient.email);
                this.cookies.remove('password');
                this.router.navigateByUrl('/login');
            });
    }
}