import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HealthCentre } from "../../../models/health_centre.model";
import { FormComponent } from "../../forms/form.component";

@Component({
    selector: 'health-centre-form',
    templateUrl: './health-centre-form.component.html'
})
export class HealthCentreForm extends FormComponent implements OnInit {
    public value: HealthCentre;

    constructor() {
        super()
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            'name': new FormControl(this.value.name, Validators.required),
            'address': new FormControl(this.value.address, Validators.required),
        });
    }
}