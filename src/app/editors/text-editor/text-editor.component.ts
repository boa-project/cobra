import { Component, OnInit } from '@angular/core';

import { BaseEditorComponent } from '../base-editor/base-editor.component';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent extends BaseEditorComponent implements OnInit {

  constructor() { 
    super()
  }

  ngOnInit() {
    super.ngOnInit();
    /*
    if (this.model == undefined && this.field.parent){
      let pvalue = this.field.parent.$.collection ? this.field.parent.$.defaultValue[0] : this.field.parent.$.defaultValue;
      if (pvalue && pvalue[this.field.name]) {
        this.model = pvalue[this.field.name].default;
      }
      else {
        this.model = '';
      }
    }*/
  }

}
