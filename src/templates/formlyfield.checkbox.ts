import {Component, Renderer, ElementRef, ViewChildren, QueryList} from "@angular/core";
import {AbstractControl, FormBuilder} from "@angular/forms";
import {Field, FormlyPubSub, FormlyMessages, FormlyValueChangeEvent} from "ng2-formly";
import {SingleFocusDispatcher} from "ng2-formly/lib/templates"


@Component({
  selector: "formly-field-checkbox",
  template: `
    <div class="form-group">
      <div [formGroup]="form">
        <label class="c-input c-checkbox">
          <md-checkbox (change)="inputChange($event)" [formControlName]="key" [(ngModel)]="model"
          [disabled]="templateOptions.disabled" (focus)="onInputFocus()" #inputElement> {{templateOptions.label}}
          </md-checkbox>
          </label>
      </div>
      <small class="text-muted">{{templateOptions.description}}</small>
    </div>
    `,
  queries: {inputComponent: new ViewChildren("inputElement")}
})
export class FormlyFieldCheckbox extends Field {

  constructor(fm: FormlyMessages, ps: FormlyPubSub, private formBuilder: FormBuilder, renderer: Renderer,
              focusDispatcher: SingleFocusDispatcher) {
    super(fm, ps, renderer, focusDispatcher);
  }

  inputComponent: QueryList<ElementRef>;

  inputChange(e: any, val: any): void {
    this.model = e.checked;
    this.changeFn.emit(new FormlyValueChangeEvent(this.key, e.checked));
    this.ps.setUpdated(true);
  }

  createControl(): AbstractControl {
    return this._control = this.formBuilder.control(this._model ? "on" : undefined);
  }

  protected setNativeFocusProperty(newFocusValue: boolean): void {
    // if (this.inputComponent.length > 0) {
    //   this.renderer.invokeElementMethod(this.inputComponent.first.nativeElement, "focus", [newFocusValue]);
    // }
  }

}
