import { EntityTypes } from '../model/types';
import * as model from '../model/FormEntities';

export const generateEntity: any = (entityType: any) => {
  const types: any = {
    [EntityTypes.FormSection]: model.generateFormSection(),
    [EntityTypes.TextArea]: model.generateTextArea(),
    [EntityTypes.CheckBox]: model.generateCheckBox(),
    [EntityTypes.TextInput]: model.generateTextInput(),
    [EntityTypes.SelectionInput]: model.generateSelectionInput(),
    [EntityTypes.TextBlock]: model.generateTextBlock(),
    [EntityTypes.ImageBlock]: model.generateImageBlock(),
    [EntityTypes.AutoSuggestInput]: model.generateTextInput(),
    [EntityTypes.EchoInput]: model.generateEchoInput(),
    [EntityTypes.CDSTextInput]: model.generateCDSTextInput(),
    [EntityTypes.Padding]: model.generatePadding(),
  };

  return types[entityType];
};
