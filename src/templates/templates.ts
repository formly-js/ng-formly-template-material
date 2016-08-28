import {FormlyFieldInput} from "./formlyfield.input";
import {FormlyFieldCheckbox} from "./formlyfield.checkbox";
import {FormlyFieldRadio} from "./formlyfield.radio";
import {FormlyFieldMultiCheckbox} from "./formlyfield.multicheckbox";
import {TypeOption} from "ng2-formly/lib/templates";

export const TemplateDirectives: [TypeOption] = [
  {
    name: "material-input",
    component: FormlyFieldInput
  }, {
    name: "material-checkbox",
    component: FormlyFieldCheckbox,
  }, {
    name: "material-radio",
    component: FormlyFieldRadio,
  }, {
    name: "material-multicheckbox",
    component: FormlyFieldMultiCheckbox
  }, {
    name: "material-textarea",
    component: FormlyFieldInput
  }
];

//TODO: Add select input once https://github.com/angular/material2/issues/118 is fixed
//"material-select": FormlyFieldSelect,
//TODO: Use Text Area instead of input text once https://github.com/angular/material2/issues/546 is fixed.
