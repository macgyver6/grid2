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
  //   actions.remove([0, 0])
  //   actions.add(
  //     this.mutate({ defaultContent: event.target.value }
  //     ), [0, 0])
  // },

  add: (path, entity, section) => {
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
      e = utility.add(path.slice(1), entity, section.children()[path[0]]);
    }
    let newChildren = section.children().slice(0);
    newChildren.splice(path[0], path.length > 1 ? 1 : 0, e);
    // console.log(path, entity, section)
    return section.setChildren(newChildren);
  },

  /**
   * @param {FormSection} section
   * @param {number[]} path
   * @returns {FormEntity}
   */
  remove: (path, section) => {
    // if (path.length === 1 && section.children()[path[0]] === undefined) {
    //   throw new Error("path OOB");
    // }
    let newChildren = section.children().slice(0);
    if (path.length > 1) {
      newChildren[path[0]] = utility.remove(
        path.slice(1),
        section.children()[path[0]]
      );
    } else {
      newChildren.splice(path[0], 1);
    }
    return section.setChildren(newChildren);
  },

  mutate: (address, properties) => {
    const entity = address.byPath(address);
    utility.remove(address);
    utility.add(
      address.resurrectEntity(
        Object.assign({}, entity.properties(), properties)
      ),
      address
    );
  },
};

export const components = {
  TextInput: TextInput,
  TextArea: TextArea,
};
