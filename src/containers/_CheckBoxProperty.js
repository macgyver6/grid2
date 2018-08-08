import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';
import Input_Property_Template from './Input_Property_Template';

// const form = new Form(defaultPropsFE.Form);

export const _CheckBoxProperty = props => {
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
      <Input_Property_Template
        model={address.byPath(props.form, props.currententity)}
        form={props.form}
        currententity={props.currententity}
        mutate={props.mutate}
        appState={props.appState}
        temporalStateChange={props.temporalStateChange}
        add={props.add}
      />
      <label htmlFor="defaultState">Default State</label>
      <br />
      <select
        value={props.model.inputType()}
        className="form-control"
        name="defaultState"
        onChange={change_handler}
        id="defaultState"
      >
        {/* <option selected value>
              {' '}
              -- select an default state --{' '}
      </option> */}
        {[{ label: 'checked', value: true }, { label: 'unchecked', value: false }]
          .map(val => val)
          .map(item => <option value={item.value}>{item.label}</option>)}
      </select>
    </div>
  );
};
