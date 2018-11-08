import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

import { IMetaField } from '../../models/meta-field.model';

@Component({
  selector: 'app-base-editor',
  templateUrl: './base-editor.component.html',
  styleUrls: ['./base-editor.component.css']
})
export class BaseEditorComponent implements OnInit {

  @Input() field: IMetaField;
  @Input() editorOptions: any;
  @Output()
  onChange: EventEmitter<any> = new EventEmitter<any>();
  model: any;

  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  getValue() {
    return this.model;
  }

  static buildFormControl(field):FormGroup {
    let control = new FormGroup({
      _name: new FormControl(field.name),
      _type: new FormControl(field.$.type),
      _labelkey: new FormControl(field.labelkey),
      _help: new FormControl(field.$._help),
      enabled: new FormControl({value: false, disabled: false }),
      visible: new FormControl({value: null, disabled: true }),
      editable: new FormControl({value: null, disabled: true }),
      required: new FormControl({value: null, disabled: true }),
      collection: new FormControl({value: null, disabled: true }),
    });
    let editorCtrl:AbstractControl;

    switch (field.$.type) {
      case "duration":
        editorCtrl = new FormGroup({
          years: new FormControl(0, [Validators.min(0)]),
          months: new FormControl(0, [Validators.min(0)]),
          days: new FormControl(0, [Validators.min(0)]),
          hours: new FormControl(0, [Validators.min(0)]),
          minutes: new FormControl(0, [Validators.min(0)]),
          seconds: new FormControl(0, [Validators.min(0)])
        });
        break;
      
      case "vcard":
        editorCtrl = new FormGroup({
          name: new FormControl(''),
          lastname: new FormControl(''),
          company: new FormControl(''),
          email: new FormControl('', Validators.email)
        });
        break;

      case "optionset":
        control.addControl('multiple', new FormControl(!!field.$.multiple));
        control.addControl('optionset-name', new FormControl(field.$['optionset-name']));
        editorCtrl = new FormControl('');
        break;

      case "date":
        editorCtrl = new FormControl('');
        break;

      default:
        editorCtrl = new FormControl('');
        break;
    }
    control.addControl('defaultValue', editorCtrl);
    return control;
  }
}
