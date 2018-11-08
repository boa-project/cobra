import { Component, OnInit } from '@angular/core';

import { BaseEditorComponent } from '../base-editor/base-editor.component';

@Component({
  selector: 'app-long-text-editor',
  templateUrl: './long-text-editor.component.html',
  styleUrls: ['./long-text-editor.component.css']
})
export class LongTextEditorComponent extends BaseEditorComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
