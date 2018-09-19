import { Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

export abstract class FormComponent {
    @Input('value')
    public value: any = {};

    @Output('onSubmit')
    public on_submit = new EventEmitter<any>();

    @Output('onSubmitChange')
    public on_submit_change = new EventEmitter<any>();

    @Output('all')
    public all = new EventEmitter<any>();

    public form: FormGroup;

    constructor() {}

    submit(): void {
        this.on_submit.emit(this.form.value);
        let changes: any = undefined;
        if (this.form.dirty) {
            changes = {};
            for (let key in this.form.value) {
                let value = this.form.get(key);
                if (value.dirty) {
                    changes[key] = value.value;
                }
            }
            this.on_submit_change.emit(changes);
        }
        this.all.emit({
            onSubmit: this.form.value,
            onSubmitChange: changes,
        });
    }
}