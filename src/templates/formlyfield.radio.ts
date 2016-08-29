import {Component, Renderer, ElementRef, ViewChildren, QueryList} from "@angular/core";
import {Field, FormlyPubSub, FormlyMessages, FormlyValueChangeEvent} from "ng2-formly";
import {SingleFocusDispatcher} from "ng2-formly/lib/templates"
import {MdRadioButton} from "@angular2-material/radio";


@Component({
  selector: "formly-field-radio",
  template: `
    <div [formGroup]="form">
        <label for="">{{templateOptions.label}}</label>
        <md-radio-group [(ngModel)]="model" [formControlName]="key">
          <p *ngFor="let option of templateOptions.options">
            <md-radio-button [value]="option.key" 
              (change)="inputChange($event, option.key)" (focus)="onInputFocus()"
              [disabled]="templateOptions.disabled" #inputElement>{{option.value}}
            </md-radio-button>
          </p>
        </md-radio-group>
        <small class="text-muted">{{templateOptions.description}}</small>
    </div>`,
  queries: {inputComponent: new ViewChildren("inputElement")}
})
export class FormlyFieldRadio extends Field {
  constructor(fm: FormlyMessages, ps: FormlyPubSub, renderer: Renderer,
              focusDispatcher: SingleFocusDispatcher) {
    super(fm, ps, renderer, focusDispatcher);
  }

  inputComponent: QueryList<MdRadioButton>;

  protected setNativeFocusProperty(newFocusValue: boolean): void {
    if (this.inputComponent.length > 0) {
      // this.inputComponent.first.focus();
    }
  }

  inputChange(e, val) {
    this.model = val;
    this.changeFn.emit(new FormlyValueChangeEvent(this.key, this.model));
    this.ps.setUpdated(true);
  }
}
