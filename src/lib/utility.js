// import {defaultPropsFE} from './constants/defaultPropsFE';
// import FormComponent from './components/FormEntities/Form';
// import FormSectionComponent from './components/FormEntities/FormSection';
// import TextInputComponent from './components/FormEntities/TextInput';
// import TextAreaComponent from './components/FormEntities/TextArea';
// import CheckBoxComponent from './components/FormEntities/CheckBox';
// import { Form } from './data/Form';
// import { FormSection } from './data/FormSection';
// import TextInput from "../data/TextInput";
// import TextArea from "../data/TextArea";
// import { CheckBox } from './data/CheckBox';

export const utility = {
  /**
   *
   * @param {FormEntity} entity
   * @param {FormSection} section
   * @param {number[]} path
   * @returns {FormEntity}
   */

  add: (path, entity, section) => {
    let e = entity;
    if (path.length > 1) {
      e = utility.add(path.slice(1), entity, section.children()[path[0]]);
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
      address.rehydrate(Object.assign({}, entity.properties(), properties)),
      address
    );
  },

  findAll: (e, testFn) => {
    let result = testFn.call({}, e) ? [e] : [];
    if (!e.children) {
      return result;
    }
    return result.concat(
      e
        .children()
        .map(e => utility.flatten(utility.findAll(e, testFn)))
        .reduce((a, b) => [...a, ...b], [])
    );
  },

  /**
   * flatten the given array or array-like such that any members
   * which are themselves array-likes will be inserted into the
   * resulting array at the position of their parent's occurrence.
   *
   * Ex: [1, [2, 3], 4, [5, [6]]] => [1, 2, 3, 4, 5, 6]
   *
   * @param {Array} arr array to flatter, not undefined
   * @returns {Array} utility.flattened array
   */
  flatten: arr =>
    arr.reduce(
      (a, b) => a.concat(Array.isArray(b) ? utility.flatten(b) : b),
      []
    ),

  total: entity => entity.prepend() + entity.width() + entity.append(),

  arraysEqual: (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  },

  round: (value, decimals) =>
    Number(Math.round(value + "e" + decimals) + "e-" + decimals)
};
