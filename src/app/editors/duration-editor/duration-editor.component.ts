import { Component, OnInit } from '@angular/core';
import { BaseEditorComponent } from '../base-editor/base-editor.component';

const isNumber = function(value) {
  let val = parseInt(value);
  return !isNaN(val);
}

@Component({
  selector: 'app-duration-editor',
  templateUrl: './duration-editor.component.html',
  styleUrls: ['./duration-editor.component.css']
})
export class DurationEditorComponent extends BaseEditorComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.model === undefined){
      this.model = { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }


  getValue() {
    if (this.model.years && isNumber(this.model.years) ||
      this.model.months && isNumber(this.model.months) ||
      this.model.days && isNumber(this.model.days) ||
      this.model.hours && isNumber(this.model.hours) ||
      this.model.minutes && isNumber(this.model.minutes) ||
      this.model.seconds && isNumber(this.model.seconds)) {
      return this.model;
    }
    return null;
  }

  

}
