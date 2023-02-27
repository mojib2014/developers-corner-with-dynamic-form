import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { FormInputBase } from './model/form-input-base';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() formFields: FormInputBase<string | boolean>[] | null = [];

  form!: FormGroup;
  @Output() submitEvent = new EventEmitter<FormGroup>();

  ngOnInit(): void {
    this.toFormGroup();
  }

  // Returns whether the form exists and has been modified or not as a helper for the confirmation dialog
  hasFormUnsavedChanges(): boolean {
    return this.form && this.form.dirty;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    this.submitEvent.emit(this.form);
  }

  private toFormGroup(): void {
    const group: any = {};

    this.formFields?.forEach((field) => {
      group[field.key] =
        field.required && field.minlength
          ? new FormControl(field.value || '', [
              ...(field.validators as ValidatorFn[]),
              Validators.required,
              Validators.minLength(field.minlength),
            ])
          : field.required
          ? new FormControl(field.value || '', [
              ...(field.validators as ValidatorFn[]),
              Validators.required,
            ])
          : new FormControl(field.value || '', field.validators);
    });
    this.form = new FormGroup(group);
  }
}
