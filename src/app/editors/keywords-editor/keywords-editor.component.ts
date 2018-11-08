import { Component, OnInit } from '@angular/core';
import { BaseEditorComponent } from '../base-editor/base-editor.component';

@Component({
  selector: 'app-keywords-editor',
  templateUrl: './keywords-editor.component.html',
  styleUrls: ['./keywords-editor.component.css']
})
export class KeywordsEditorComponent extends BaseEditorComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
