// import { defaultPropsFE } from '../constants/defaultPropsFE';
import { Form } from '../data/Form';
import { utility } from './val.utility';
import { validations } from './val.suite';
// const form = new Form(defaultPropsFE.Form);

const types = ['Form', 'FormSection', 'TextInput'];
// const types = ['Form', 'FormSection', 'TextInput', 'TextArea', 'CheckBox'];

/**
 * Generisized function that will automatically map through all possible entity types for a form, find each of the entities of that type and apply the suite of tests for that type of section
 * @param {Object} form memberof Form
 * @returns {Array{}} A flattened array of the result of all of the tests applied against that form
 * @returns {Boolean} A Boolea of the result of all of the tests applied against that form
 */
export const validateForm = form => {
  let result = {
    result: utility.flatten(
      types.map(type =>
        utility
          .findAll(form, e => e.type() === type)
          .map(entity =>
            Object.keys(validations[type]).map(fn =>
              validations[type][fn](entity)
            )
          )
      )
    ),

    validateImport: () => result.result.filter(e => e !== undefined),
    validateFormState: () => result.result.every(e => e === undefined),
  };
  return result;
};
