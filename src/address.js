// import {defaultPropsFE} from './constants/defaultPropsFE';
import FormComponent from './components/FormEntities/Form';
import FormSectionComponent from './components/FormEntities/FormSection';
import TextInputComponent from './components/FormEntities/TextInput';
import CDSTextInputComponent from './components/FormEntities/CDSTextInput';
import TextAreaComponent from './components/FormEntities/TextArea';
import CheckBoxComponent from './components/FormEntities/CheckBox';
import RadioButtonComponent from './components/FormEntities/RadioButton';
import SelectionInputComponent from './components/FormEntities/SelectionInput';
import TextBlockComponent from './components/FormEntities/TextBlock';
import ImageBlockComponent from './components/FormEntities/ImageBlock';
import AdverseeventComponent from './components/FormEntities/AdverseEvent';
import EchoComponent from './components/FormEntities/Echo';
import { Form } from './data/Form';
import { FormSection } from './data/FormSection';
import { TextInput } from './data/TextInput';
import { CDSTextInput } from './data/CDSTextInput';
import { TextArea } from './data/TextArea';
import { CheckBox } from './data/CheckBox';
import { SelectionInput } from './data/SelectionInput';
import { RadioButton } from './data/RadioButton';
import { TextBlock } from './data/TextBlock';
import { ImageBlock } from './data/ImageBlock';
import { EchoInput } from './data/EchoInput';
import { AdverseEventInput } from './data/AdverseEventInput';
import { TextInputProperty } from './containers/TextInputProperty';
import { CDSTextInputProperty } from './containers/CDSTextInputProperty';
import { TextAreaProperty } from './containers/TextAreaProperty';
import { AdverseEventProperty } from './containers/AdverseEventProperty';
import { CheckBoxProperty } from './containers/CheckBoxProperty';
import { RadioButtonProperty } from './containers/RadioButtonProperty';
import { SelectionInputProperty } from './containers/SelectionInputProperty';
import { TextBlockProperty } from './containers/TextBlockProperty';
import { ImageBlockProperty } from './containers/ImageBlockProperty';
import { EchoProperty } from './containers/EchoProperty';
import { initFE } from './constants/defaultPropsFE';
import DateValidationUI from './containers/validations/dateValidationUI';
import StringValidationUI from './containers/validations/stringValidationUI';
import IntegerValidationUI from './containers/validations/integerValidationUI';
import FloatValidationUI from './containers/validations/floatValidationUI';
import PatternValidation from './containers/validations/PatternValidation';
import EnumerationValidation from './containers/validations/EnumerationValidation';

export const address = {
  bySample: (target, node, path = []) => {
    if (target.type() === 'Form') {
      return [];
    }
    if (node.UUID() === target.UUID()) {
      return path;
    }

    if (node.children) {
      return node.children().reduce((acc, child, index) => {
        return acc || address.bySample(target, child, [...path, index]);
      }, null);
    }

    return null;
  },

  byUuid: (uuid, node, path = [], entity) => {
    if (node.UUID() === uuid) {
      return [path, node];
    }

    if (node.children) {
      return node.children().reduce((acc, child, index) => {
        return acc || address.byUuid(uuid, child, [...path, index]);
      }, null);
    }

    return null;
  },

  byPath: (section, path, entity) => {
    if (path.length > 1) {
      return address.byPath(section.children()[path[0]], path.slice(1));
    } else {
      return section.children()[path];
    }
  },

  lookupComponent: modelInstance => {
    if (modelInstance instanceof Form) {
      return FormComponent;
    } else if (modelInstance instanceof FormSection) {
      return FormSectionComponent;
    } else if (modelInstance instanceof CDSTextInput) {
      return CDSTextInputComponent;
    } else if (modelInstance instanceof TextInput) {
      return TextInputComponent;
    } else if (modelInstance instanceof TextArea) {
      return TextAreaComponent;
    } else if (modelInstance instanceof CheckBox) {
      return CheckBoxComponent;
    } else if (modelInstance instanceof RadioButton) {
      return RadioButtonComponent;
    } else if (modelInstance instanceof SelectionInput) {
      return SelectionInputComponent;
    } else if (modelInstance instanceof TextBlock) {
      return TextBlockComponent;
    } else if (modelInstance instanceof ImageBlock) {
      return ImageBlockComponent;
    } else if (modelInstance instanceof AdverseEventInput) {
      return AdverseeventComponent;
    } else if (modelInstance instanceof EchoInput) {
      return EchoComponent;
    }
  },

  whichEntity: modelInstance => {
    if (modelInstance instanceof Form) {
      return FormComponent;
      // } else if (modelInstance instanceof FormSection) {
      //   return FormSectionComponent;
    } else if (modelInstance instanceof CDSTextInput) {
      return CDSTextInputProperty;
    } else if (modelInstance instanceof TextInput) {
      return TextInputProperty;
    } else if (modelInstance instanceof TextArea) {
      return TextAreaProperty;
    } else if (modelInstance instanceof CheckBox) {
      return CheckBoxProperty;
    } else if (modelInstance instanceof RadioButton) {
      return RadioButtonProperty;
    } else if (modelInstance instanceof SelectionInput) {
      return SelectionInputProperty;
    } else if (modelInstance instanceof TextBlock) {
      return TextBlockProperty;
    } else if (modelInstance instanceof ImageBlock) {
      return ImageBlockProperty;
    } else if (modelInstance instanceof AdverseEventInput) {
      return AdverseEventProperty;
    } else if (modelInstance instanceof EchoInput) {
      return EchoProperty;
    }
  },

  whichValidator: modelInstance => {
    console.log(modelInstance);
    if (modelInstance instanceof Form) {
      return FormComponent;
      // } else if (modelInstance instanceof FormSection) {
      //   return FormSectionComponent;
    } else if (modelInstance === 'Pattern') {
      console.log(modelInstance);
      return PatternValidation;
    } else if (modelInstance === 'Enumeration') {
      return EnumerationValidation;
    }
    // else if (modelInstance instanceof TextArea) {
    //   return TextAreaProperty;
    // } else if (modelInstance instanceof CheckBox) {
    //   return CheckBoxProperty;
    // } else if (modelInstance instanceof RadioButton) {
    //   return RadioButtonProperty;
    // } else if (modelInstance instanceof SelectionInput) {
    //   return SelectionInputProperty;
    // } else if (modelInstance instanceof TextBlock) {
    //   return TextBlockProperty;
    // } else if (modelInstance instanceof ImageBlock) {
    //   return ImageBlockProperty;
    // } else if (modelInstance instanceof AdverseEventInput) {
    //   return AdverseEventProperty;
    // } else if (modelInstance instanceof EchoInput) {
    //   return EchoProperty;
    // }
  },

  whichValidation: validationType => {
    console.log(validationType);
    if (validationType === 'String') {
      console.log('type String ');
      return StringValidationUI;
    } else if (validationType === 'Date') {
      console.log('type Date');
      return DateValidationUI;
    } else if (validationType === 'Integer') {
      console.log('type Date');
      return IntegerValidationUI;
    } else if (validationType === 'Float') {
      console.log('type Date');
      return FloatValidationUI;
    }
  },

  resurrectEntity: formEntitySerialized => {
    // @hack
    console.log(formEntitySerialized);
    switch (
      formEntitySerialized.type ||
        formEntitySerialized._type ||
        formEntitySerialized.type()
    ) {
      case 'Form':
        return new Form({ ...formEntitySerialized });
      case 'FormSection':
        return new FormSection({ ...formEntitySerialized });
      case 'CDSTextInput':
        return new CDSTextInput({ ...formEntitySerialized });
      case 'TextInput':
        return new TextInput({ ...formEntitySerialized });
      case 'TextArea':
        return new TextArea({ ...formEntitySerialized });
      case 'CheckBox':
        return new CheckBox({ ...formEntitySerialized });
      case 'RadioButton':
        return new RadioButton({ ...formEntitySerialized });
      case 'SelectionInput':
        return new SelectionInput({ ...formEntitySerialized });
      case 'TextBlock':
        return new TextBlock({ ...formEntitySerialized });
      case 'ImageBlock':
        return new ImageBlock({ ...formEntitySerialized });
      case 'AdverseEvent':
        return new AdverseEventInput({ ...formEntitySerialized });
      case 'Echo':
        return new EchoInput({ ...formEntitySerialized });
      default:
        throw new Error('Unexpected Entity Type');
    }
  },
};
