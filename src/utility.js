import defaultProps from './constants/defaultPropsFE';
import FormComponent from './components/FormEntities/Form';
import FormSectionComponent from './components/FormEntities/FormSection';
import TextInputComponent from './components/FormEntities/TextInput';
import TextAreaComponent from './components/FormEntities/TextArea';
import CheckboxComponent from './components/FormEntities/Checkbox';
import { Form } from './data/Form';
import { FormSection } from './data/FormSection';
import { TextInput } from './data/TextInput';
import { TextArea } from './data/TextArea';
import { Checkbox } from './data/Checkbox';

/**
 * 
 * @param {FormEntity} entity 
 * @param {FormSection} section 
 * @param {number[]} path 
 */

export const utility = {
  add: function add (entity, section, path) {
    if (path[0] < 0 || path[0] === undefined) {
      throw new Error("path OOB");
    }

    if (!(section instanceof FormSection)) {
      throw new Error("section was not FormSection");
    }

    let e = entity;
    if (path.length > 1) {
      e = add(entity, section.children()[path[0]], path.slice(1));
    }

    let newChildren = section.children().slice(0);
    newChildren.splice(path[0], path.length > 1 ? 1 : 0, e);
    return section.setChildren(newChildren);
  },

  lookupComponent: function (modelInstance) {
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
    else if (modelInstance instanceof Checkbox) {
      return CheckboxComponent;
    }
  },

  resurrectEntity: function (formEntitySerialized) {
    switch (formEntitySerialized.type) {
      case 'Form':
        return new Form({ ...formEntitySerialized })
      case 'FormSection':
        return new FormSection({ ...formEntitySerialized })
      case 'TextInput':
        return new TextInput({ ...formEntitySerialized })
      case 'TextArea':
        return new TextArea({ ...formEntitySerialized })
      case 'Checkbox':
        return new Checkbox({ ...formEntitySerialized })
    }
  }
}

export const components = {
  TextInput: TextInput,
  TextArea: TextArea
}
