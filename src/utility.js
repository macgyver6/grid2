import defaultProps from './constants/defaultPropsFE';
import TextInputComponent from './components/FormEntities/TextInput';
import TextAreaComponent from './components/FormEntities/TextArea';
import { TextInput } from './data/TextInput';
import { TextArea } from './data/TextArea';

export const utility = {
  lookupComponent: function (modelInstance) {
    if (modelInstance instanceof TextInput) {
      return TextInputComponent;
    }
    else if (modelInstance instanceof TextArea) {
      return TextAreaComponent;
    }
  },

  resurrectEntity: function (formEntitySerialized) {
    switch (formEntitySerialized.type) {
      case 'TextInput': 
        return new TextInput({...formEntitySerialized})
      case 'TextArea':         return new TextArea({...formEntitySerialized})
    }
  }
}

export const components = {
  TextInput: TextInput,
  TextArea: TextArea
}
