import { Injectable } from "@angular/core";

export interface Alert {
    id?: number;
    type: string;
    text: string;
    dismissed?: boolean;
    autodismiss?: number;
    autodismiss_timer?: number|any;
}

@Injectable()
export class AlertService {
    private current_id: number = 0;
    private _alerts: Alert[] = [];

    get alerts(): Alert[] {
        return this._alerts;
    }

    private get new_id(): number {
        this.current_id++;
        return this.current_id;
    }

    clear(): void {
        for (let alert of this.alerts) {
            if (alert.autodismiss_timer) {
                clearTimeout(alert.autodismiss_timer);
            }
        }
        this._alerts = [];
    }

    addAlert(alert: Alert): void {
        if (alert.autodismiss) {
            alert.autodismiss_timer = setTimeout(() => {
                this.removeByInstance(alert);
            }, alert.autodismiss * 1000);
        }
        alert.id = this.new_id;
        this.alerts.push(alert);
    }

    removeByIndex(index: number): void {
        let alert = this._alerts[index];
        if (alert.dismissed) return;
        if (alert.autodismiss_timer) {
            clearTimeout(alert.autodismiss_timer);
        }
        alert.dismissed = true;
        setTimeout(() => {
            this.removeById(alert.id);
        }, 250);
    }

    removeByInstance(alert: Alert): void {
        let index = this._alerts.indexOf(alert);
        if (index != -1) {
            this.removeByIndex(index);
        }
    }

    private removeById(id: number): void {
        let index: number = 0;
        for (let alert of this.alerts) {
            if (alert.id == id) {
                this._alerts.splice(index, 1);
                return;
            }
            index++;
        }
    }
}