import { Directive, Input, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BaseEditorComponent } from '../base-editor/base-editor.component';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { LongTextEditorComponent } from '../long-text-editor/long-text-editor.component';
import { OptionSetEditorComponent } from '../option-set-editor/option-set-editor.component';
import { DateEditorComponent } from '../date-editor/date-editor.component';
import { VCardEditorComponent } from '../vcard-editor/vcard-editor.component';
import { DurationEditorComponent } from '../duration-editor/duration-editor.component';
import { KeywordsEditorComponent } from '../keywords-editor/keywords-editor.component';
import { IMetaField } from '../../models/meta-field.model';

export const editors = {
  'text': TextEditorComponent,
  'string': TextEditorComponent,
  'longtext': LongTextEditorComponent,
  'int': TextEditorComponent,
  'email': TextEditorComponent,
  'optionset': OptionSetEditorComponent,
  'date': DateEditorComponent,
  'vcard': VCardEditorComponent,
  'duration': DurationEditorComponent,
  'keywords': KeywordsEditorComponent
};

@Directive({
  selector: '[editorSelector]'
})
export class EditorSelectorDirective {

  @Input('editorSelector') field: FormGroup;
  @Input() editorOptions: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.loadComponent();
  }

  private loadComponent(){
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(editors[this.field.get('_type').value]);
    let componentRef = this.viewContainerRef.createComponent(componentFactory);
    let instance = (<BaseEditorComponent>componentRef.instance)
    instance.group = this.field;
    instance.editorOptions = this.editorOptions;

  }
}
