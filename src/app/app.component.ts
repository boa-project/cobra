import { Component, DoCheck, KeyValueDiffers } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SpecsService } from './providers/specs.service';
import { OptionSetsService } from './editors/providers/option-sets.service';
import { SuiLocalizationService } from "ng2-semantic-ui";
import es from "ng2-semantic-ui/locales/es";
import { BaseEditorComponent } from './editors/base-editor/base-editor.component';

//import { MetaField } from './models/meta-field';

export const FIELD_ATTRIBUTES = [
  "alias",
  "type",
  "defaultValue",
  "enabled",
  "visible",
  "editable",
  "required",
  "collection",
  "multiple",
  "optionset-name"
 ];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dco-spec-editor';
  specs:Array<any>;
  currentSpec: any;  
  name:string = 'Selecciona una especificación';
  loading: boolean = true;
  specModel: any;
  formModel: any;
  isNew: boolean;
  defaultMetadata: any;
  dirty: boolean;
  message: any;
  differ: any;
  config: any;

  private langDic:any = {};

  constructor(private translate:TranslateService,
    private specsService: SpecsService,
    private optionsets: OptionSetsService,
    private suiLocalization: SuiLocalizationService,
    private differs: KeyValueDiffers,
    private fb: FormBuilder
  ){
  	this.initTranslate();
  	this.loadData();
  	this.specModel = {};
    this.clearMessage();
    //this.differ = this.differs.find({}).create(null);
  }

  ngOnInit(){
    this.config = this.buildFormConfig(false);
  }

  //#region setup functions

  private initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('es');
    this.translate.get(['SPEC_NEWLABEL', 'CONFIRM_SAVE_ONSPEC_CHANGED']).subscribe((value) => {
      this.langDic.newSpecLabel = value.SPEC_NEWLABEL;
      this.langDic.ConfirmSaveOnSpecChaanged = value.CONFIRM_SAVE_ONSPEC_CHANGED;
    });
    //Check https://github.com/ngx-translate/core to see how to make it dynamic
    this.suiLocalization.load("es", es);
    this.suiLocalization.setLanguage("es");
  }

  //#endregion

  //#region business logic functions

  private loadData(){
    this.defaultMetadata = this.specsService.getMetadata();
    this.fixMetadata();
    this.optionsets.initialize(this.defaultMetadata.optionsets);
    this.loadSpecs();
  }

  private loadSpecs(selected?:string){
    console.log(selected);
    const source = this.specsService.getSpecs();
    this.loading = true;
    source.subscribe((specs) => {
      this.specs = specs;
      if (selected){
        this.loadSpec({id: selected});
      }
    }, () => {}, () => {
      this.loading = false;
    });
  }


  specChanged(sel){
    if (this.config.form && this.config.form.dirty) {
      if (!confirm(this.langDic.ConfirmSaveOnSpecChaanged)){
        return;
      }
    }
    this.loadSpec(sel);
  }

  private loadSpec(sel:any){
    this.loading = true;
    const source = this.specsService.getSpecById(sel.id);
    source.subscribe((result) => {
      this.currentSpec = Object.assign({}, result, sel);
      this.prepareModelView(this.currentSpec.js);
      this.config = this.buildFormConfig();
      this.config.form.patchValue(this.formModel);
      this.isNew = false;
      this.loading = false;
    });
  }

  createSpec() {
    if (this.config.form && this.config.form.dirty) {
      if (!confirm(this.langDic.ConfirmSaveOnSpecChaanged)){
        return;
      }
    }
    this.loading = true;
    this.isNew = true;
    this.currentSpec = { name: this.langDic.newSpecLabel };
    this.prepareModelView({});
    this.config = this.buildFormConfig();
    this.loading = false;
  }

  saveSpec(specJs):any{
    if (!(this.config.form && this.config.form.dirty)) return;

    if (!this.config.form.valid) return;

    let toSave = this.prepareModelToSave(this.config.form);
    this.loading = true;
    let obs = this.specsService.saveSpec(toSave);
    obs.subscribe(() => {
      this.config.form.markAsPristine();
      this.loading = false;
      if (this.isNew) {
        this.loadSpecs(toSave.id);
      }
    });
    return obs;
  }

  private fixMetadata(){
    var meta = this.defaultMetadata;
    meta.types = meta.types.type;
    meta.optionsets = meta.optionsets.optionset;
    meta.categories = meta.fields.category;
    delete meta.fields;
    const notAField = (key) => { return key != '$' && key != '_help' };

    for(let cat of meta.categories){
      const metakey = `meta.fields.${cat.$.name}`;
      cat.fields = Object.keys(cat).filter(notAField).map((key) => {
        let oField = cat[key];
        let field:any = { name: key, labelkey: `${metakey}.${key}.label`, $: oField.$ };
        if (field.$.type == 'composed'){
          field.fields = Object.keys(oField).filter(notAField).map((skey) => {
            return { name: skey, labelkey: `${metakey}.${key}.${skey}.label`, $: oField[skey].$ };
          });
        }
        delete cat[key];
        return field;
      });
      cat.labelkey = `${metakey}.label`;
    }
    this.defaultMetadata = meta;
  }

  private showMessage(header, content, type, icon){
    this.message.header = header;
    this.message.content = content;
    this.message.class = type;
    if (icon) this.message.icon = icon;
    else delete this.message.icon;
    this.message.visible = true;    
  }

  private clearMessage(){
    this.message = { visible: false };
  }

  private buildFormConfig(createForm:boolean=true):any{
    if (!createForm) return {};

    let categories = this.specModel.categories || this.defaultMetadata.categories;
    let config = {
      form: this.fb.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
        description: ['', null]
      }),
      categories: []
    };

    for(let category of categories){
      let fieldsConfig = [];
      let categoryConfig = {
        name: category.$.name,
        labelkey: category.labelkey,
        group: this.fb.group({
          isCollection: [!!category.$.collection, null],
          fields: this.createFields(category.fields)
        })
      };
      config.categories.push(categoryConfig);
      config.form.addControl(categoryConfig.name, categoryConfig.group);
    }

    return config;

  }

  private createFields(fields:any):FormArray{
    let config = [];
    let controls = this.fb.array([]);
    for(let field of fields) {
      let group = BaseEditorComponent.buildFormControl(field);
      if (field.fields) {
        group.addControl('fields', this.createFields(field.fields))
      }
      controls.push(group);
    }
    return controls; //{ config: config, group: group };
  }

  private prepareModelView(obj):any{
    let model = Object.assign({}, this.defaultMetadata); //Initialize the object with the supported metadata
    let formModel:any = {};

    if (!obj || !obj.fields) return model;

    formModel = {
      id: obj.id,
      name: obj.name,
      description: obj.description
    };
    
    //Load fields
    for(let category of model.categories){
      if (!(category.$.name in obj.fields)) return model;

      let sCat = obj.fields[category.$.name];

      if (sCat[category.$.name] && sCat[category.$.name].$.type == 'container'){
        sCat = sCat[category.$.name];
        category.isCollection = !!sCat.$.collection;
      }

      let formCat:any = {
        isCollection: category.isCollection,
        fields: []
      }

      for(let field of category.fields){
        if (!(field.name in sCat)) continue;
        let sField = sCat[field.name];
        this.mergeField(field, sField, formCat);
      }

      formModel[category.$.name] = formCat;
    }

    this.formModel = formModel;
    this.specModel = model;
  }

  private mergeField(tField, sField, formCat){
    //copy attributes
    let formField:any = {};
    formCat.fields.push(formField);
    if (sField.$) {
      for(let key of FIELD_ATTRIBUTES){
        if (key == 'type') continue;
        if (!(key in sField.$)) continue;
        tField.$[key] = sField.$[key];
        formField[key] = sField.$[key];
      }
      tField._help = sField._help;
      formField._help = sField._help;
      this.normalizeField(tField, formField);
    }
    //if a composed field, copy the 
    if (tField.$.type == 'composed'){
      for(let subF of tField.fields){
        if (!(subF.name in sField)) continue;
        formField.fields = [];
        this.mergeField(subF, sField[subF.name], formField);
        subF.parent = tField;
      }
    }
  }

  private normalizeField(field, formField){
    if (!field.$) return;
    formField.enabled = field.$.enabled = field.$.hasOwnProperty('enabled') && field.$.enabled;
    formField.visible = field.$.visible = field.$.hasOwnProperty('visible') && field.$.visible || field.$.enabled;
    formField.visible = field.$.editable = field.$.hasOwnProperty('editable') && field.$.editable || field.$.enabled;
    formField.required = field.$.required = field.$.hasOwnProperty('required') && field.$.required;
    formField.collection = field.$.collection = field.$.hasOwnProperty('collection') && field.$.collection;
    
    if (/(composed|vcard|duration)/.test(field.$.type)){
      let value = field.$.defaultValue;
      if (typeof(value) == 'string') value = JSON.parse(field.$.defaultValue);
      formField.defaultValue = field.$.defaultValue = value == undefined ? (field.$.collection ? [] : {}) : value;
    }
  }

  private prepareModelToSave(form):any {
    let obj:any = form.value;
    let toSave:any = { id: obj.id, name: obj.name, description: obj.name };
    //Fix types
    toSave.types = { type: this.defaultMetadata.types };
    //Fix optionsets
    toSave.optionsets = { optionset: this.defaultMetadata.optionsets };
    toSave.fields = {};

    for(let catKey in obj){
      if (/id|name|description/.test(catKey)) continue;
      let cat = obj[catKey];
      let catField:any = { $: { type: 'category'} };
      let target = toSave.fields;

      if (cat.isCollection) {
        toSave.fields[catKey] = catField;
        catField[catKey] = { $: { type: 'container', collection: true, enabled: true } };
        target = catField;
        delete catField.$.collection;
        catField = catField[catKey];
      }

      for(let field of cat.fields){
        let f = this.populateField(field);
        catField[field._name] = f;
        if (f.$.defaultValue === null || f.$.defaultValue === undefined) {
          delete f.$.defaultValue;
        }
        else if (/(composed|vcard|duration)/.test(f.$.type)) {
          f.$.defaultValue = JSON.stringify(f.$.defaultValue);
        }
      }
      target[catKey] = catField;
    }
    return toSave;
  }

  private populateField(formField):any {
    let f:any = {$: {}, "_": formField._help || ''};
    for(let attr of FIELD_ATTRIBUTES){
      let value = formField[attr];
      if (value !== undefined && value !== null)
        f.$[attr] = value;
    }
    f.$.type = formField._type;
    if (f.$.type == 'composed'){
      for(let sfield of formField.fields) {
        f[sfield._name] = this.populateField(sfield);
        delete f[sfield._name].$.defaultValue;
      }
    }
    return f;
  }
}
