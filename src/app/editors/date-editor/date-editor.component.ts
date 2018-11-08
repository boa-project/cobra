import { Component, OnInit } from '@angular/core';
import { BaseEditorComponent } from '../base-editor/base-editor.component';

@Component({
  selector: 'app-date-editor',
  templateUrl: './date-editor.component.html',
  styleUrls: ['./date-editor.component.css']
})
export class DateEditorComponent extends BaseEditorComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
