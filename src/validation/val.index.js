// import { defaultPropsFE } from '../constants/defaultPropsFE';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { FormEntity } from '../data/FormEntity';
import { utility } from './val.utility';
import { validations, inputValidations, entityValidations } from './val.suite';
// const form = new Form(defaultPropsFE.Form);

const types = [
  'TextInput',
  'SelectionInput',
  'TextArea',
  'CheckBox',
  'TextBlock',
  'ImageBlock',
  'AdverseEvent',
  'Echo',
  'CDSTextInput',
];
// const types = ['Form', 'FormSection', 'TextInput', 'TextArea', 'CheckBox'];

/**
 * Generisized function that will automatically map through all possible entity types for a form, find each of the entities of that type and apply the suite of tests for that type of section
 * @param {Object} form memberof Form
 * @returns {Array{}} A flattened array of the result of all of the tests applied against that form
 * @returns {Boolean} A Boolea of the result of all of the tests applied against that form
 */

export const validateForm = form => {
  console.log(
    utility.flatten([
      types.map(type =>
        utility
          .findAll(form, e => e.type() === type)
          .map(entity => Object.keys(validations[type]).map(fn => validations[type][fn](entity)))
      ),
      /** generic rules to be applied to all FormInputs */
      utility
        .findAll(form, e => e instanceof FormInput)
        .map(entity => Object.keys(inputValidations).map(fn => inputValidations[fn](entity))),
      utility
        .findAll(form, e => e instanceof FormEntity)
        .map(entity => Object.keys(entityValidations).map(fn => entityValidations[fn](entity))),
    ])
  );

  return utility.flatten([
    types.map(type =>
      utility
        .findAll(form, e => e.type() === type)
        .map(entity => Object.keys(validations[type]).map(fn => validations[type][fn](entity)))
    ),
    /** generic rules to be applied to all FormInputs */
    utility
      .findAll(form, e => e instanceof FormInput)
      .map(entity => Object.keys(inputValidations).map(fn => inputValidations[fn](entity))),
    utility
      .findAll(form, e => e instanceof FormEntity)
      .map(entity => Object.keys(entityValidations).map(fn => entityValidations[fn](entity))),
  ]);
};
// utility.findAll(form, e => e instanceof FormInput).map(entity => inputValidations(entity))

export const validateImport = form => validateForm(form).filter(e => e !== undefined);
export const validateFormState = form => validateForm(form).every(e => e === undefined);
