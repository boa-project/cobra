import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.css']
})
export class TypesListComponent implements OnInit {
	@Input()
	types: Array<any>;
  constructor() { }

  ngOnInit() {
  }

}
