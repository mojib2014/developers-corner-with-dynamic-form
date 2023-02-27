import { FormInputBase } from './form-input-base';

export class FormTextarea extends FormInputBase<string> {
  override controlType = 'textarea';
}
