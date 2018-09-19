import { Component, Input, EventEmitter } from "@angular/core";

@Component({
    selector: 'modal-body',
    template: `
    <div class="modal-header">
        <h4 class="modal-title">{{title}}</h4>
        <button type="button" class="close" aria-label="Close" (click)="onClick.emit()">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <div class="container">
            <ng-content></ng-content>
        </div>
    </div>
    `,
})
export class ModalBody {
    @Input('title') title: string;
    @Input('onClick') onClick = new EventEmitter<any>();
}