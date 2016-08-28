import {Component, ElementRef, AfterViewInit, Renderer, ViewChildren, QueryList} from "@angular/core";
import {Field, FormlyPubSub, FormlyMessages, FormlyMessage} from "ng2-formly";
import {SingleFocusDispatcher} from "ng2-formly/lib/templates";

@Component({
  selector: "formly-field-input",
  template: `
      <div class="formly-md-input-wrapper" [formGroup]="form" [ngClass]="{'has-danger': !formControl.valid}" *ngIf="!templateOptions.hidden">
        <md-input [type]="templateOptions.type" [formControlName]="key" class="form-control md-input-full-width" id="{{key}}"
          [disabled]="templateOptions.disabled"
          (keyup)="inputChange($event, 'value')" (change)="inputChange($event, 'value')" [(ngModel)]="model"
          (focus)="onInputFocus()" [ngClass]="{'form-control-danger': !form.controls[key].valid}" #inputElement>
          <md-placeholder [ngClass]="{'md-placeholder-error': !formControl.valid}">{{templateOptions.label}}</md-placeholder>
        </md-input>
        <small class="md-hint">{{templateOptions.description}}</small>
        <small class="md-hint-error"><formly-message [control]="key" [formDir]="form"></formly-message></small>
      </div>
    `,
  queries: {inputComponent: new ViewChildren("inputElement")}
})
export class FormlyFieldInput extends Field implements AfterViewInit {

  constructor(fm: FormlyMessages, ps: FormlyPubSub, renderer: Renderer, focusDispatcher: SingleFocusDispatcher) {
    super(fm, ps, renderer, focusDispatcher);
  }

  inputComponent: QueryList<ElementRef>;

  protected setNativeFocusProperty(newFocusValue: boolean): void {
    // if (this.inputComponent.length > 0) {
    //   this.renderer.invokeElementMethod(this.inputComponent.first.nativeElement, "focus", [newFocusValue]);
    // }
  }
}
