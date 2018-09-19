import { Component, OnInit, Input, AfterViewInit, ViewChild, OnDestroy } from "@angular/core";
import { ApiService } from '../../../api/api.service';
import { HealthCentre } from "../../../models/health_centre.model";
import { AuthService } from "../../../api/auth.service";
import { AppBrowserPanel } from "../../../app-browser/app-browser-panel.component";
import { ModalFormService } from "../../forms/modal-forms.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";

@Component({
    selector: 'health-centre-list',
    templateUrl: './health-centre-list.component.html',
})
export class HealthCentreList extends AppBrowserPanel implements OnInit {
    @Input('health-centres') health_centres: HealthCentre[];

    constructor(
        private api: ApiService,
        private modal: ModalFormService,
        auth: AuthService,
    ) { 
        super(auth);
    }

    ngOnInit() {

    }

    modify(health_centre: HealthCentre, index: number) {
        this.modal
            .open_health_centre_form('Modify health centre', health_centre)
            .then((form) => {
                if (form.onSubmitChange) {
                    this.api.patchHealthCentre(health_centre.id, form.onSubmitChange)
                        .subscribe((patched_health_centre) => {
                            this.health_centres[index] = patched_health_centre;
                        });
                }
            });

            
    }

    delete(health_centre: HealthCentre, index: number) {
        this.modal
            .dialog("Delete health centre", "Are you sure you want to delete this health centre?")
            .then(() => {
                this.api.deleteHealthCentre(health_centre.id)
                    .subscribe(() => {
                        this.health_centres.splice(index, 1);
                    });
            });
    }
}; 