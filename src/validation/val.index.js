// import { defaultPropsFE } from '../constants/defaultPropsFE';
import { Form } from '../data/Form';
import { utility } from './val.utility';
import { validations } from './val.suite';
// const form = new Form(defaultPropsFE.Form);

const types = ['Form', 'FormSection', 'TextInput'];
// const types = ['Form', 'FormSection', 'TextInput', 'TextArea', 'CheckBox'];

/**
 * Generisized function that will automatically map through all possible entity types for a form, find each of the entities of that type and apply the suite of tests for that type of section
 * @param {String} type String of the entity type
 * @returns {Array} A flattened array of the result of all of the tests applied against that form
 */
const dynamic = form =>
  types.map(type =>
    utility
      .findAll(form, e => e.type() === type)
      .map(entity =>
        Object.keys(validations[type]).map(fn => validations[type][fn](entity))
      )
  );

const importValid = form =>
  utility.flatten(dynamic(form)).filter(e => e !== undefined);

const stateChangeValid = form =>
  utility.flatten(dynamic(form)).every(e => e === undefined);

/**
 *
 * @param {Array} dynamic Output of dynamic()
 * @param {integer} [mode=0] Operation mode formInput || UI action validation
 * @returns {}
 */
export const validateForm = (form, mode) =>
  mode === 0 ? importValid(form) : stateChangeValid(form);
