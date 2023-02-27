import { ValidatorFn } from '@angular/forms';

export class FormInputBase<T> {
  value: T | undefined;
  key: string;
  label: string;
  required: boolean;
  minlength: number;
  order: number;
  controlType: string;
  type: string;
  icon: string;
  options: { key: string; value: string }[];
  validators: ValidatorFn[] | null;
  readonly: boolean;
  placeholder?: string;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      minlength?: number;
      order?: number;
      controlType?: string;
      type?: string;
      icon?: string;
      options?: { key: string; value: string }[];
      validators?: ValidatorFn[] | null;
      readonly?: boolean;
      placeholder?: string;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.minlength = options.minlength || 0;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.icon = options.icon || '';
    this.options = options.options || [];
    this.validators = options.validators || [];
    this.readonly = !!options.readonly;
    this.placeholder = options.placeholder || '';
  }
}
