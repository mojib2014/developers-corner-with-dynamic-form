import { FormInputBase } from "./form-input-base";

export class FormTextbox extends FormInputBase<string> {
  override controlType = "textbox";
}
