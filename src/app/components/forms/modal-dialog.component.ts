import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'modal-confirm',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">{{title}}</h4>
            <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <p>{{text}}</p>
        </div>
        <div class="modal-footer"><button class="btn btn-danger btn-round" (click)="activeModal.close()">Confirm</button></div>
    `,
})
export class ModalConfirm {
    public title: string;
    public text: string;

    constructor(
        public activeModal: NgbActiveModal,
    ) {}
}