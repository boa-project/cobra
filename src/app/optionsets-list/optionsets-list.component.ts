import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-optionsets-list',
  templateUrl: './optionsets-list.component.html',
  styleUrls: ['./optionsets-list.component.css']
})
export class OptionsetsListComponent implements OnInit {

	@Input()
	optionsets: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
