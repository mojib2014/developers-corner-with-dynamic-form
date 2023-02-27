import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormInputBase } from '../model/form-input-base';

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.scss'],
})
export class DynamicFormInputComponent {
  @Input() field!: FormInputBase<string | boolean>;
  @Input() form!: FormGroup;

  isValid(): boolean {
    return (
      this.form.controls[this.field.key].invalid &&
      (this.form.controls[this.field.key].dirty ||
        this.form.controls[this.field.key].touched)
    );
  }
}
