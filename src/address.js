// import {defaultPropsFE} from './constants/defaultPropsFE';
import FormComponent from './components/FormEntities/Form';
import FormSectionComponent from './components/FormEntities/FormSection';
import TextInputComponent from './components/FormEntities/TextInput';
import TextAreaComponent from './components/FormEntities/TextArea';
import CheckBoxComponent from './components/FormEntities/CheckBox';
import RadioButtonComponent from './components/FormEntities/RadioButton';
import SelectionInputComponent from './components/FormEntities/SelectionInput';
import TextBlockComponent from './components/FormEntities/TextBlock';
import AdverseeventComponent from './components/FormEntities/AdverseEvent';
import EchoComponent from './components/FormEntities/Echo';
import { Form } from './data/Form';
import { FormSection } from './data/FormSection';
import { TextInput } from './data/TextInput';
import { TextArea } from './data/TextArea';
import { CheckBox } from './data/CheckBox';
import { SelectionInput } from './data/SelectionInput';
import { RadioButton } from './data/RadioButton';
import { TextBlock } from './data/TextBlock';
import { EchoInput } from './data/EchoInput';
import { AdverseEventInput } from './data/AdverseEventInput';
import { TextInputProperty } from './containers/TextInputProperty';
import { TextAreaProperty } from './containers/TextAreaProperty';
import { AdverseEventProperty } from './containers/AdverseEventProperty';
import { CheckBoxProperty } from './containers/CheckBoxProperty';
import { RadioButtonProperty } from './containers/RadioButtonProperty';
import { SelectionInputProperty } from './containers/SelectionInputProperty';
import { TextBlockProperty } from './containers/TextBlockProperty';
import { EchoProperty } from './containers/EchoProperty';
import { initFE } from './constants/defaultPropsFE';

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
    console.log(modelInstance);
    if (modelInstance instanceof Form) {
      return FormComponent;
    } else if (modelInstance instanceof FormSection) {
      return FormSectionComponent;
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
    } else if (modelInstance instanceof AdverseEventInput) {
      return AdverseEventProperty;
    } else if (modelInstance instanceof EchoInput) {
      return EchoProperty;
    }
  },

  resurrectEntity: formEntitySerialized => {
    // @hack
    console.log(formEntitySerialized);
    switch (formEntitySerialized.type ||
      formEntitySerialized._type ||
      formEntitySerialized.type()) {
      case 'Form':
        return new Form({ ...formEntitySerialized });
      case 'FormSection':
        return new FormSection({ ...formEntitySerialized });
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
      case 'AdverseEvent':
        return new AdverseEventInput({ ...formEntitySerialized });
      case 'Echo':
        return new EchoInput({ ...formEntitySerialized });
      default:
        throw new Error('Unexpected Entity Type');
    }
  },
};
