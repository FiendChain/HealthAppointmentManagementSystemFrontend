import { Component } from "@angular/core";
import { AlertService, Alert } from "./alerts.service";

@Component({
    selector: 'ngb-alerts',
    templateUrl: './alerts.component.html',
})
export class AlertsComponent {
    constructor(
        private alert: AlertService,
    ) {}

    get alerts() {
        return this.alert.alerts;
    }

    close(alert: Alert, index: number) {
        if (!alert.dismissed) {
            this.alert.removeByIndex(index);
        }
    }
}