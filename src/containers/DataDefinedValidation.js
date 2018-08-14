import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined, dataDefinedByInput } from './_validations';
import Input_Property_Template from './Input_Property_Template';
import { DateValidationUI } from './validations/DateValidationUI.js';

// const form = new Form(defaultPropsFE.Form);

export const DataDefinedValidation = props => {
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
      <label htmlFor="textInput-val-type">Data Type</label>
      <br />
      <select
        value={props.model.inputType()}
        className="form-control"
        name="textInput-val-type"
        onChange={change_handler}
        id="inputType"
      >
        {/* <option selected value>
              {' '}
              -- select an option --{' '}
      </option> */}
        {dataDefinedByInput[props.model.type()].map(item => <option value={item}>{item}</option>)}
      </select>
      <br />
      {console.log(props.model)}
      {/* <DateValidationUI model={props.model} form={props.form} mutate={props.mutate} /> */}
      {typeof props.model.length === 'function' && props.model.inputType() === 'Date' ? (
        <DateValidationUI model={props.model} form={props.form} mutate={props.mutate} />
      ) : null}
      {/* {typeof props.model.length === 'function' && props.model.inputType() === 'date'
        ? React.createElement(address.whichValidation(props.model.inputType()), {
            // key: i,
            model: props.model,
            form: props.form,
            // remove: props.remove,
            // add: props.add,
            mutate: props.mutate,
            // temporalStateChange: props.temporalStateChange
          })
        : null} */}
    </div>
  );
};
