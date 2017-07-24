import defaultProps from './constants/defaultPropsFE';
import TextInputComponent from './components/FormEntities/TextInput';
import TextAreaComponent from './components/FormEntities/TextArea';
import { TextInput } from './data/TextInput';
import { TextArea } from './data/TextArea';

export const utility = {
  lookup: function(modelInstance) {
    if (modelInstance instanceof TextInput) {
      console.log('TextInput')
      return TextInputComponent;
    }
    else if (modelInstance instanceof TextArea) {
      console.log('TextArea')
      return TextAreaComponent;
    }
  },
  yolo: function() {
    console.log('yolo')
  }
}

export const components = {
  TextInput: TextInput,
  TextArea: TextArea
}
