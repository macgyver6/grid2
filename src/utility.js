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
    return section.setChildren(newChildren);
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
    let newChildren = section.children().slice(0);
    if (path.length > 1)
    {
      newChildren[path[0]] = remove(section.children()[path[0]], path.slice(1));
    } else {
      newChildren.splice(path[0], 1);
    }
    return section.setChildren(newChildren);
  },

  findNode: (target, node, path = []) => {
    if (node.UUID() === target.UUID()) {
      return path;
    }

    if (node.children) {
      return node.children().reduce((acc, child, index) => {
        return acc || utility.findNode(target, child, [...path, index]);
      }, null);
    }

    return null;
  },

  findEntityUuid: (uuid, node, path = [], entity) => {
    if (node.UUID() === uuid) {
      return [path, node];
    }

    if (node.children) {
      return node.children().reduce((acc, child, index) => {
        return acc || utility.findEntityUuid(uuid, child, [...path, index]);
      }, null);
    }

    return null;
  },

  findEntityByPath: (section, path, entity) => {
    if (path.length > 1) {
      return utility.findEntityByPath(section.children()[path[0]], path.slice(1));
    } else {
      return section.children()[path]
    }
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
      return props.setChildren(props.children().map(child => utility.unserialize(child)
      ))
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
    else if (modelInstance instanceof CheckBox) {
      return CheckBoxComponent;
    }
    else if (modelInstance instanceof RadioButton) {
      return RadioButtonComponent;
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
      case 'CheckBox':
        return new CheckBox({ ...formEntitySerialized })
      case 'RadioButton':
        return new RadioButton({ ...formEntitySerialized })
      default: throw new Error('Unexpected Entity Type')
    }
  },

  mutate: function (address, properties) {
    const entity = utility.findEntityByPath(address)
    utility.remove(address)
    utility.add(utility.resurrectEntity(
      Object.assign({},
        entity.properties(), properties)
    ), address)
  },
}

export const components = {
  TextInput: TextInput,
  TextArea: TextArea
}
