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
  add: function add(entity, section, path) {
    if (path[0] < 0 || path[0] === undefined && (!(entity instanceof FormSection))) {
      throw new Error("path OOB");
    }

    // if not passing in either entity=FormSection section=Form, or entity=someFormEntity section !== FormSection
    // if ((!(section instanceof Form)) &&
    //   ((!(entity instanceof FormSection)) ))
    //      {
    //   throw new Error("section was not FormSection");
    // }

    let e = entity;
    if (path.length > 1) {
      e = add(entity, section.children()[path[0]], path.slice(1));
    }

    let newChildren = section.children().slice(0);
    newChildren.splice(path[0], path.length > 1 ? 1 : 0, e);
    return section.setChildren(newChildren);
  },

  /*  
    1. Pass in array of FormSections
    2. If instance of FormSection, then call it's properties, then map through the form element properties
    3. Replace the FormSection children with the unserialized and then replace FormSection[i] .properties
    4. Call serialize again, passing in array of form sections
    5. Terminal case is if there are no instance of form section, return array of unserialized form sections
  */
  serialize: function serialize(formSections, index2, output2) {
    let index = index2 || 0;
    let output = output2 || [];
    if (formSections.length <= 0 || (!(formSections[index] instanceof FormSection))) {
      throw new Error("provide a valid array of type FormSections")
    }
    if (index < formSections.length) {
      let children = formSections[index].properties()
      children =
        formSections[index].children().slice().map((child) => {
          return child.properties()
        })
      output.push(formSections[index].properties())
      output[index].children = children;
      if (index < formSections.length - 1) {
        return serialize(formSections, ++index, output)
      } else {
        return output
      }
    }
  },

  unserialize: function unserialize(payload, parent) {
    console.log(payload)
    if (payload.length <= 0) {
      throw new Error("provide a valid children array")
    }
    return payload.map((child) => {

      // if parent !== cccc then dpn't use parent[index]
      if (!(child instanceof FormSection)) {
        console.log(parent)
        return (parent[0].children = (utility.resurrectEntity((child))))
      } else {
        return unserialize(child.children, payload)
      }
    })
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
    // @hack
    switch (formEntitySerialized.type || formEntitySerialized._type) {
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
      default: throw new Error('Unexpected Entity Type')
    }
  }
}

export const components = {
  TextInput: TextInput,
  TextArea: TextArea
}
