// import {defaultPropsFE} from './constants/defaultPropsFE';
import FormComponent from './components/FormEntities/Form';
import FormSectionComponent from './components/FormEntities/FormSection';
import TextInputComponent from './components/FormEntities/TextInput';
import TextAreaComponent from './components/FormEntities/TextArea';
import CheckBoxComponent from './components/FormEntities/CheckBox';
import RadioButtonComponent from './components/FormEntities/RadioButton';
import { Form } from './data/Form';
import { FormSection } from './data/FormSection';
import { TextInput } from './data/TextInput';
import { TextArea } from './data/TextArea';
import { CheckBox } from './data/CheckBox';
import { RadioButton } from './data/RadioButton';
import { utility } from './utility';

export const address = {

  bySample: (target, node, path = []) => {
    if (node.UUID() === target.UUID()) {
      return path;
    }

    if (node.children) {
      console.log()
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
      return section.children()[path]
    }
  },

  lookupComponent: (modelInstance) => {
    if (modelInstance instanceof Form) {
      return FormComponent;
    }
    else if (modelInstance instanceof FormSection) {
      return FormSectionComponent;
    }
    else if (modelInstance instanceof TextInput) {
      return TextInputComponent;
    }
    else if (modelInstance instanceof TextArea) {
      return TextAreaComponent;
    }
    else if (modelInstance instanceof CheckBox) {
      return CheckBoxComponent;
    }
    else if (modelInstance instanceof RadioButton) {
      return RadioButtonComponent;
    }
  },

  resurrectEntity: (formEntitySerialized) => {
    // @hack
    switch (formEntitySerialized.type || formEntitySerialized._type || formEntitySerialized.type()) {
      case 'Form':
        return new Form({ ...formEntitySerialized })
      case 'FormSection':
        return new FormSection({ ...formEntitySerialized })
      case 'TextInput':
        return new TextInput({ ...formEntitySerialized })
      case 'TextArea':
        return new TextArea({ ...formEntitySerialized })
      case 'CheckBox':
        return new CheckBox({ ...formEntitySerialized })
      case 'RadioButton':
        return new RadioButton({ ...formEntitySerialized })
      default: throw new Error('Unexpected Entity Type')
    }
  }
}
