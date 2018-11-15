import { EntityTypes } from '../model/types';

export const translate = {
  entityTypeToDescriptor: entityType => {
    const readable = {
      [EntityTypes.CDSTextInput]: 'CDS Text Input',
      [EntityTypes.TextInput]: 'Text Input',
      [EntityTypes.TextArea]: 'Text Area',
      [EntityTypes.CheckBox]: 'Checkbox',
      [EntityTypes.SelectionInput]: 'Selection INput',
      [EntityTypes.TextBlock]: 'Text Block',
      [EntityTypes.ImageBlock]: 'Image Block',
      [EntityTypes.AutoSuggestInput]: 'Auto-suggest',
      [EntityTypes.FormSection]: 'Form Section',
      [EntityTypes.Form]: 'Form',
      [EntityTypes.Padding]: 'Padding',
      [EntityTypes.EchoInput]: 'Echo Input',
    };
    return readable[entityType];
  },
};
