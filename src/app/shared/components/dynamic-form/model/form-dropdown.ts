import { FormInputBase } from './form-input-base';

export class FormDropdown extends FormInputBase<string> {
  override controlType = 'dropdown';
}
