import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { entityWrapperStyle, entityStyle, inputStyle, calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';
import { Input_Property_Template } from './Input_Property_Template';
import { DataDefinedValidation } from './DataDefinedValidation';

// const form = new Form(defaultPropsFE.Form);

export const _FormSectionProperty = props => {
  const change_handler = event => {
    // console.log(event.target.value);
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: value,
    });
  };

  const layoutChange_handler = event => {
    props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: parseFloat(event.target.value),
      append:
        24 -
        props.model.prepend() -
        (event.target.id === 'prePromptWidth' ? parseFloat(event.target.value) : props.model.prePromptWidth()) -
        props.model.width() -
        (event.target.id === 'postPromptWidth' ? parseFloat(event.target.value) : props.model.postPromptWidth()),
      // function that calcs total width and subtracts all OTHER elements, returningt what the value should be
    });
  };

  return (
    <div>
      <label htmlFor="legend">Name: </label>
      <br />
      <textarea
        type="text"
        name="legend"
        type="text"
        id="legend"
        onChange={change_handler}
        value={props.model.legend()}
        type={props.model.type()}
        rows="3"
        cols="50"
      />
    </div>
  );
};
