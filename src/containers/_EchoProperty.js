import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { entityWrapperStyle, entityStyle, inputStyle, calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';
import Input_Property_Template from './Input_Property_Template';
import { DataDefinedValidation } from './DataDefinedValidation';

// const form = new Form(defaultPropsFE.Form);

export const _EchoProperty = props => {
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
      <div>
        <label for="echo-sourceInput">Echo Source Input: </label>
        <br />
        <select
          className="form-control"
          name="echo-sourceInput"
          type={props.model.type()}
          value={props.model.sourceInput()}
          onChange={change_handler}
          id="sourceInput"
          style={inputStyle(props.model)}
        >
          {utility
            .findAll(props.form, e => e instanceof FormInput)
            .map(formInput => (
              <option value={formInput.promptNumber()}>{`${formInput.promptNumber()} - ${formInput.type()}`}</option>
            ))}
        </select>

        <div />
        <br />
        <p>
          <label htmlFor="editeable">Editeable echo input: </label>
          <input
            type="checkbox"
            name="editeable"
            id="editeable"
            onChange={change_handler}
            checked={props.model.editeable()}
          />
        </p>
        <br />
        <p>
          <label htmlFor="defaultContent">Default Content: </label>
          <input
            type="text"
            name="defaultContent"
            id="defaultContent"
            onChange={change_handler}
            value={props.model.defaultContent()}
          />
        </p>
        {/* <DataDefinedValidation
          model={address.byPath(props.form, props.currententity)}
          form={props.form}
          currententity={props.currententity}
          mutate={props.mutate}
          appState={props.appState}
          temporalStateChange={props.temporalStateChange}
        /> */}
      </div>
    </div>
  );
};
