import { Component, OnInit } from '@angular/core';

import { BaseEditorComponent } from '../base-editor/base-editor.component';
import { OptionSetsService } from '../providers/option-sets.service';

@Component({
  selector: 'app-option-set-editor',
  templateUrl: './option-set-editor.component.html',
  styleUrls: ['./option-set-editor.component.css']
})
export class OptionSetEditorComponent extends BaseEditorComponent implements OnInit {

  options:Array<any>;
  multiple: boolean;

  constructor(private optionsets: OptionSetsService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    //let config = this.group.get('_config').value;
    this.multiple = !!this.group.get('multiple').value;
    let optionsetName = this.group.get('optionset-name').value
    let setName = optionsetName;
    let re = /\{(\w+)\}/;
    let isValidOptionSet = true;
    if (re.test(setName) && this.group.parent){
      isValidOptionSet = false;
      let dependency = re.exec(setName);
      let controls:any = this.group.parent.controls;
      let ctrl = controls.find(c => c.value._name == dependency[1]);
      let pvalue = ctrl.value;
      if (pvalue) {
        setName = setName.replace(re, pvalue.defaultValue);
        isValidOptionSet = true;
      }

      if (ctrl) {
        ctrl.valueChanges.subscribe((value) => {
          this.refreshItems(optionsetName.replace(re, value.defaultValue));
        });
      }
    }
    if (isValidOptionSet) {
      this.refreshItems(setName);
    }
  }

  refreshItems(setName) {
    this.optionsets.get(setName).subscribe((result) => {
      this.options = result;
    });
  }

  change(e) {
    this.onChange.emit(e);
  }
}
