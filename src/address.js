// import {defaultPropsFE} from './constants/defaultPropsFE';
import FormComponent from './components/FormEntities/Form';
import FormSectionComponent from './components/FormEntities/FormSection';
import TextInputComponent from './components/FormEntities/TextInput';
import CDSTextInputComponent from './components/FormEntities/CDSTextInput';
import TextAreaComponent from './components/FormEntities/TextArea';
import CheckBoxComponent from './components/FormEntities/CheckBox';
import SelectionInputComponent from './components/FormEntities/SelectionInput';
import TextBlockComponent from './components/FormEntities/TextBlock';
import ImageBlockComponent from './components/FormEntities/ImageBlock';
import autoSuggestComponent from './components/FormEntities/autoSuggest';
import EchoComponent from './components/FormEntities/Echo';
import { Form } from './data/Form';
import { FormSection } from './data/FormSection';
import { TextInput } from './data/TextInput';
import { CDSTextInput } from './data/CDSTextInput';
import { TextArea } from './data/TextArea';
import { CheckBox } from './data/CheckBox';
import { SelectionInput } from './data/SelectionInput';
import { TextBlock } from './data/TextBlock';
import { ImageBlock } from './data/ImageBlock';
import { EchoInput } from './data/EchoInput';
import { autoSuggestInput } from './data/autoSuggestInput';
import { _TextInputProperty } from './containers/_TextInputProperty';
import { _CDSTextInputProperty } from './containers/_CDSTextInputProperty';
import { _TextAreaProperty } from './containers/_TextAreaProperty';
import { _autoSuggestProperty } from './containers/_autoSuggestProperty';
import { _CheckBoxProperty } from './containers/_CheckBoxProperty';
import { _SelectionInputProperty } from './containers/_SelectionInputProperty';
import { _TextBlockProperty } from './containers/_TextBlockProperty';
import { _ImageBlockProperty } from './containers/_ImageBlockProperty';
import { _EchoProperty } from './containers/_EchoProperty';
import { _FormSectionProperty } from './containers/_FormSectionProperty';
import { initFE } from './constants/defaultPropsFE';
import DateValidationUI from './containers/validations/DateValidationUI';
import StringValidationUI from './containers/validations/stringValidationUI';
import IntegerValidationUI from './containers/validations/integerValidationUI';
import FloatValidationUI from './containers/validations/floatValidationUI';
import PatternValidation from './containers/validations/PatternValidation';
import EnumerationValidation from './containers/validations/EnumerationValidation';
import SubjectInputValidation from './containers/validations/SubjectInputValidation';
import EmptyFieldValidation from './containers/validations/EmptyFieldValidation';
import RangeValidation from './containers/validations/RangeValidation';
import NoOpValidation from './containers/validations/NoOpValidation';
import { PatternValidator } from './containers/validations/data/PatternValidator';
import { EnumerationValidator } from './containers/validations/data/EnumerationValidator.js';
import { NoOpValidator } from './containers/validations/data/NoOpValidator.js';
import { RangeValidator } from './containers/validations/data/RangeValidator.js';
import { SubjectInputValidator } from './containers/validations/data/SubjectInputValidator.js';
import { entityActions } from './components/FormEntities/actions.entities';

export const address = {
  bySample: (target, node, path = []) => {
    if (target.type() === 'Form') {
      return [];
    }
    if (node.UUID() === target.UUID()) {
      return path;
    }

    if (node.children) {
      return node
        .children()
        .reduce((acc, child, index) => acc || address.bySample(target, child, [...path, index]), null);
    }

    return null;
  },

  byUuid: (uuid, node, path = [], entity) => {
    if (node.UUID() === uuid) {
      return [path, node];
    }

    if (node.children) {
      return node.children().reduce((acc, child, index) => acc || address.byUuid(uuid, child, [...path, index]), null);
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
    } else if (modelInstance instanceof SelectionInput) {
      return SelectionInputComponent;
    } else if (modelInstance instanceof TextBlock) {
      return TextBlockComponent;
    } else if (modelInstance instanceof ImageBlock) {
      return ImageBlockComponent;
    } else if (modelInstance instanceof autoSuggestInput) {
      return autoSuggestComponent;
    } else if (modelInstance instanceof EchoInput) {
      return EchoComponent;
    }
  },

  whichEntity: modelInstance => {
    if (modelInstance instanceof CDSTextInput) {
      return _CDSTextInputProperty;
    } else if (modelInstance instanceof FormSection) {
      return _FormSectionProperty;
    } else if (modelInstance instanceof TextInput) {
      return _TextInputProperty;
    } else if (modelInstance instanceof TextArea) {
      return _TextAreaProperty;
    } else if (modelInstance instanceof CheckBox) {
      return _CheckBoxProperty;
    } else if (modelInstance instanceof SelectionInput) {
      return _SelectionInputProperty;
    } else if (modelInstance instanceof TextBlock) {
      return _TextBlockProperty;
    } else if (modelInstance instanceof ImageBlock) {
      return _ImageBlockProperty;
    } else if (modelInstance instanceof autoSuggestInput) {
      return _autoSuggestProperty;
    } else if (modelInstance instanceof EchoInput) {
      return _EchoProperty;
    }
  },

  whichValidationComponent: modelInstance => {
    if (modelInstance === 'PatternValidator') {
      return PatternValidation;
    } else if (modelInstance === 'EnumerationValidator') {
      return EnumerationValidation;
    } else if (modelInstance === 'EmptyFieldValidator') {
      return EmptyFieldValidation;
    } else if (modelInstance === 'NoOpValidator') {
      return NoOpValidation;
    } else if (modelInstance === 'RangeValidator') {
      return RangeValidation;
    } else if (modelInstance === 'SubjectInputValidator') {
      return SubjectInputValidation;
    }
  },

  hydrateValidator: (validatorInstance, properties) => {
    if (validatorInstance === 'PatternValidator') {
      return new PatternValidator(properties);
    } else if (validatorInstance === 'EnumerationValidator') {
      return new EnumerationValidator(properties);
    } else if (validatorInstance === 'NoOpValidator') {
      return new NoOpValidator(properties);
    } else if (validatorInstance === 'Range') {
      return new RangeValidator(properties);
    } else if (validatorInstance === 'SubjectInputValidator') {
      return new SubjectInputValidator(properties);
    }
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

  getHumanName: entityType => {
    console.log(entityType);
    switch (entityType) {
      case 'CDSTextInput':
        return 'CDS Text Input';
        break;
      case 'TextInput':
        return 'Text Input';
        break;
      case 'TextArea':
        return 'Text Area';
        break;
      case 'CheckBox':
        return 'Check Box';
        break;
      case 'SelectionInput':
        return 'Selection Input';
        break;
      case 'TextBlock':
        return 'Text Block';
        break;
      case 'ImageBlock':
        return 'Image Block';
        break;
      case 'autoSuggest':
        return 'autoSuggest';
        break;
      case 'Echo':
        return 'Echo Input';
        break;
      case 'FormSection':
        return 'Form Section';
        break;
    }
  },

  getHumanValidatorName: validatorType => {
    console.log(validatorType);
    switch (validatorType) {
      case 'NoOpValidator':
        return 'Empty Field';
        break;
      case 'PatternValidator':
        return 'Pattern Validator';
        break;
      case 'RangeValidator':
        return 'Range Validator';
        break;
      case 'EnumerationValidator':
        return 'Enumeration Validator';
        break;
      case 'SubjectInputValidator':
        return 'Selection Input';
        break;
    }
  },

  rehydrate: formEntitySerialized => {
    switch (formEntitySerialized.type || formEntitySerialized._type || formEntitySerialized.type()) {
      case 'Form':
        return new Form({
          ...formEntitySerialized,
        });
      case 'FormSection':
        return new FormSection({
          ...formEntitySerialized,
        });
      case 'CDSTextInput':
        return new CDSTextInput({
          ...formEntitySerialized,
        });
      case 'TextInput':
        return new TextInput({
          ...formEntitySerialized,
        });
      case 'TextArea':
        return new TextArea({
          ...formEntitySerialized,
        });
      case 'CheckBox':
        return new CheckBox({
          ...formEntitySerialized,
        });
      case 'SelectionInput':
        return new SelectionInput({
          ...formEntitySerialized,
        });
      case 'TextBlock':
        return new TextBlock({
          ...formEntitySerialized,
        });
      case 'ImageBlock':
        return new ImageBlock({
          ...formEntitySerialized,
        });
      case 'autoSuggest':
        return new autoSuggestInput({
          ...formEntitySerialized,
        });
      case 'Echo':
        return new EchoInput({
          ...formEntitySerialized,
        });
      default:
        throw new Error('Unexpected Entity Type');
    }
  },
};
