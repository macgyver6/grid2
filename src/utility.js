// import {defaultPropsFE} from './constants/defaultPropsFE';
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

export const utility = {
  /**
   * 
   * @param {FormEntity} entity 
   * @param {FormSection} section 
   * @param {number[]} path 
   * @returns {FormEntity}
   */

  // handleChange: function handleChange(event) {
  //   console.log(event.target.value)
  //   actions.removeformentity([0, 0])
  //   actions.addformentity(
  //     this.mutate({ defaultContent: event.target.value }
  //     ), [0, 0])
  // },

  add: function add(entity, section, path) {
    // if (path[0] < 0 || path[0] === undefined && (!(entity instanceof FormSection))) {
    //   throw new Error("path OOB");
    // }

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
    return utility.resurrectEntity(section.setChildren(newChildren));
  },

  /**
   * @param {FormSection} section
   * @param {number[]} path
   * @returns {FormEntity}
   */
  remove: function remove(section, path) {
    // if (path.length === 1 && section.children()[path[0]] === undefined) {
    //   throw new Error("path OOB");
    // }
    let newChildren = section.children().slice(0)
    let e
    if (path.length > 1) {
      e = remove(section.children()[path[0]], path.slice(1));
    } else {
      newChildren.splice(path[0], 1)
    }
      return (utility.resurrectEntity(section.setChildren(path.length > 1 ? [e] : newChildren)));
  },

  serialize: (node) => {
    // process this node and return public copy with props
    const props = node.properties()
    let children;
    if (props && props.children) {
      // process any children
      (children = props.children.map(child => utility.serialize(child)));
    }
    return { ...props, children }
  },

  unserialize: (node) => {
    // process this node and return public copy with props
    const props = utility.resurrectEntity(node)
    if (node && (props instanceof Form || props instanceof FormSection)) {
      // process any children
      return utility.resurrectEntity(props.setChildren(props.children().map(child => utility.unserialize(child)
      )))
    }
    return props
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
    switch (formEntitySerialized.type || formEntitySerialized._type || formEntitySerialized.type()) {
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
