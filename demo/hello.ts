import {NgModule, Component} from "@angular/core";
import {Validators, FormBuilder} from "@angular/forms";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {BrowserModule} from "@angular/platform-browser";
import {FormlyMessages, FormlyEventEmitter, FormlyFieldConfig, FormlyModule} from "ng2-formly"
import {ValidationService} from "./validation.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormlyMaterialModule, FormlyMaterial} from "../src/templates/formlyMaterial";

import {MdToolbarModule} from "@angular2-material/toolbar/toolbar";
import {MdSidenavModule} from "@angular2-material/sidenav/sidenav";
import {MdListModule} from "@angular2-material/list/list";
import {MdCardModule} from "@angular2-material/card/card";
import {MdIconModule} from "@angular2-material/icon/icon";
import {MdButtonModule} from "@angular2-material/button";
import {MdInputModule} from "@angular2-material/input";
import {MdCheckboxModule} from "@angular2-material/checkbox";
import {MdRadioModule} from "@angular2-material/radio";

@Component({
  selector: "hello-app",
  templateUrl: "../demo/template.html",
})
export class HelloApp {
  form;
  Stream;
  author;
  env;
  _user;
  constructor(fm: FormlyMessages, formlyMaterial: FormlyMaterial, protected fb: FormBuilder) {

    if (!this.form) {
      this.form = this.fb.group({});
    }

    fm.addStringMessage("required", "This field is required.");
    fm.addStringMessage("invalidEmailAddress", "Invalid Email Address");
    fm.addStringMessage("maxlength", "Maximum Length Exceeded.");
    fm.addStringMessage("minlength", "Should have atleast 2 Characters");

    this.author = {
      name: "Mohammed Zama Khan",
      url: "https://www.github.com/mohammedzamakhan"
    };
    this.env = {
      angularVersion: "2.0.0-rc.5",
      formlyVersion: "2.0.0-beta.5"
    };

    this.Stream = new FormlyEventEmitter();

    setTimeout(() => {

      this.userFields = [{
        type: "material-radio",
        key: "title",
        templateOptions: {
          options: [{
            key: "mr",
            value: "Mr."
          }, {
            key: "mrs",
            value: "Mrs"
          }],
          label: "Title",
          description: "Select a title that suits your description"
        }
      }, {
        className: "row",
        type: "md-card",
        fieldGroup: [{
          key: "email",
          type:  "material-input",
          templateOptions: {
            type: "email",
            label: "Email address",
            placeholder: "Enter email",
            disabled: true
          },
          validation: Validators.compose([Validators.required, ValidationService.emailValidator]),
          expressionProperties: {
            "templateOptions.disabled": "!model.password"
          }
        }, {
          key: "password",
          type:  "material-input",
          templateOptions: {
            type: "password",
            label: "Password",
            placeholder: "Password"
          },
          validation: Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(2)])
        }]
      }, {
        className: "section-label",
        template: "<hr/><div><strong>Address:</strong></div>"
      }, {
        key: "address",
        className: "row",
        fieldGroup: [{
          className: "col-xs-6",
          type:  "material-input",
          key: "street",
          templateOptions: {
            label: "Street",
            placeholder: "604 Causley Ave. ",
            description: "Enter a valid US Address"
          }
        }, {
          className: "col-xs-3",
          type:  "material-input",
          key: "city",
          templateOptions: {
            label: "City",
            placeholder: "Arlington"
          }
        }, {
          className: "col-xs-3",
          type:  "material-input",
          key: "zip",
          templateOptions: {
            type: "number",
            label: "Zip",
            placeholder: "76010"
          }
        }]
      }, {
        key: "checked",
        type:  "material-checkbox",
        templateOptions: {
          label: "Check me out",
          description: "If you want to check me out, check this box"
        }
      }, {
        type:  "material-multicheckbox",
        key: "interest",
        templateOptions: {
          options: [{
            key: "sports",
            value: "Sports"
          }, {
            key: "movies",
            value: "Movies"
          }, {
            key: "others",
            value: "Others"
          }],
          label: "Interest",
          description: "Select areas which you are interested"
        }
      }, {
        key: "otherInterest",
        type:  "material-textarea",
        hideExpression: "!model.interest.others",
        templateOptions: {
          rows: 5,
          cols: 20,
          placeholder: "Type a paragraph about your interest...",
          label: "Other Interest"
        }
      }, {
        key: "textAreaVal",
        type:  "material-textarea",
        templateOptions: {
          rows: 5,
          cols: 20,
          placeholder: "Type a paragraph...",
          label: "Message",
          description: "Please enter atleast 150 characters"
        }
      }];

      this.user = {
        email: "email@gmail.com",
        checked: true,
        select: "male",
        title: "mr",
        interest: {
          "movies": false,
          "sports": false,
          "others": true
        }
      };
      this.Stream.emit({
        model: this.user,
        fields: this.userFields
      });
    }, 0);
  }
  user: any = {};
  private userFields: Array<FormlyFieldConfig> = [];

  console(data) {
    console.log(data);
  }

  showEmail() {
    this._user = Object.assign({}, this.user);
    this._user.email = "mohammedzamakhan";
    this._user.checked = !this.user.checked;
    this.user = this._user;
    this.Stream.emit({
      model: this.user
    });
  }
  hide() {
    this.userFields[1].fieldGroup[0].hideExpression = !this.userFields[1].fieldGroup[0].hideExpression;
  }

  changeEmail() {
    this.Stream.emit({});
  }

  resetForm() {
    this.user = {
      email: "email@gmail.com",
      checked: true,
      select: "male",
      title: "mr",
      interest: {
        "movies": false,
        "sports": false,
        "others": true
      }
    };
  }

  submit(user) {
    console.log(user);
  }
}

@NgModule({
  declarations: [
    HelloApp,
  ],
  imports: [
    BrowserModule,
    FormlyModule,
    FormlyMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MdSidenavModule,
    MdListModule,
    MdCardModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    MdCheckboxModule,
    MdRadioModule
  ],
  bootstrap: [HelloApp]
})
export class FormlyDemoModule {
}

platformBrowserDynamic().bootstrapModule(FormlyDemoModule);
