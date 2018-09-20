import { Component, Input, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'modal-body',
    template: `
    <div class="modal-header">
        <h4 class="modal-title">{{title}}</h4>
        <button type="button" class="close" aria-label="Close" (click)="dismiss()">
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
    @Output('onClick') onClick = new EventEmitter<any>();

    dismiss(): void {
        this.onClick.emit();
    }
}