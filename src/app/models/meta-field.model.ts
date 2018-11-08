export interface IMetaField {
  name: string;
  $ctrl: any;
  $: {
    alias: string;
    type: string;
    defaultValue: any;
    enabled: boolean;
    visible: boolean;
    editable: boolean;
    required: boolean;
    collection: boolean; //If true, then the field can have multiple values
    multiple: boolean; //applies when type = optionset
    optionsetName: string;
  };
  _help: string;
  parent: IMetaField;
  fields: Array<IMetaField>;
}