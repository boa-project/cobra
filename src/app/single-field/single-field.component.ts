import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-single-field]',
  templateUrl: './single-field.component.html',
  styleUrls: ['./single-field.component.css']
})
export class SingleFieldComponent implements OnInit {

  @Input() field: any;
  @Input() subfield: boolean;

  expandedView: boolean;

  constructor() { }

  ngOnInit() {
  }



}
