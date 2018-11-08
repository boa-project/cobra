import { Component, OnInit } from '@angular/core';
import { BaseEditorComponent } from '../base-editor/base-editor.component';

@Component({
  selector: 'app-vcard-editor',
  templateUrl: './vcard-editor.component.html',
  styleUrls: ['./vcard-editor.component.css']
})
export class VCardEditorComponent extends BaseEditorComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.model === undefined) {
      this.model = {
        name: '',
        lastname: '',
        company: '',
        email: ''
      };
    }
  }

  getValue() {
    if (this.model.name && this.model.name.length ||
      this.model.lastname && this.model.lastname.length ||
      this.model.company && this.model.company.length ||
      this.model.email && this.model.email.length) {
      return this.model;
    }
    return null;
  }

}
