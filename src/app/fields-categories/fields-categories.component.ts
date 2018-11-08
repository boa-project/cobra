import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { SuiModalService, TemplateModalConfig, ModalTemplate } from 'ng2-semantic-ui';

export interface IContext {
    formGroup:FormGroup;
    fieldName:string;
}

@Component({
  selector: 'app-fields-categories',
  templateUrl: './fields-categories.component.html',
  styleUrls: ['./fields-categories.component.css']
})
export class FieldsCategoriesComponent implements OnInit {

	@Input()
	categories: Array<any>;

  @Input('optionsets') set optionSets(value: Array<any>) {
    this.editorOptions.optionSets = value;
  }

  @ViewChild('helpModalTemplate')
  modalTemplate:ModalTemplate<IContext, string, string>;
  
  editorOptions: any;
  modalFormGroup: FormGroup;
	
  constructor(private modal:SuiModalService) { 
    this.editorOptions = {
      optionSets: []
    };
  }

  ngOnInit() {
  }

  editHelp(field) {
    const config = new TemplateModalConfig<IContext, string, string>(this.modalTemplate);
    config.context = { 
      formGroup: new FormGroup({
        '_help': new FormControl(field.get('_help').value)
      }),
      fieldName: field.get('_labelkey').value
    };
    this.modal.open(config)
      .onApprove(result => { 
        field.patchValue(result);
        field.markAsDirty(); 
      });
  }

  showMore(){
    
  }

  setControlEnabled(name:string, field:any, defValue?:boolean) {
    let ctrl = field.get(name);
    if (defValue !== undefined) {
      ctrl.setValue(defValue); 
    }
    ctrl.enable();
  }

  setControlDisable(name:string, group:any) {
    let ctrl = group.get(name);
    ctrl.reset();
    ctrl.disable();
  }

  fieldEnabledChanged(field:any, type:number){
    const enabled = field.get('enabled').value; // field.$.enabled;
    let fvisible = field.get('visible');
    let feditable = field.get('editable');
    let frequired = field.get('required');
    let fcollection = field.get('collection');
    
    if (enabled){
      this.setControlEnabled('visible', field, true);
      this.setControlEnabled('collection', field);
      if (type == 0) {
        this.setControlEnabled('editable', field, true);
        this.setControlEnabled('required', field, true);
      }
    }
    else {
      this.setControlDisable('visible', field);
      this.setControlDisable('editable', field);
      this.setControlDisable('required', field);
      this.setControlDisable('collection', field);
    }
  }
}
