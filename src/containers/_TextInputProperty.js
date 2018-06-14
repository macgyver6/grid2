import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';
import { Input_Property_Template } from './Input_Property_Template';

// const form = new Form(defaultPropsFE.Form);

export const _TextInputProperty = props => {
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
      />
      <label htmlFor="textInput-defaultContent">Default Content</label>
      <br />
      <input
        type="text"
        name="textInput-defaultContent"
        type="text"
        id="defaultContent"
        onChange={change_handler}
        value={props.model.defaultContent()}
      />
      <div>
        <div>
          <label htmlFor="textInput-length">Max Length</label>
          <br />
          <input
            name="textInput-length"
            size="2"
            type="number"
            id="length"
            onChange={change_handler}
            value={props.model.maxLength()}
          />
          <br />
          <label htmlFor="textInput-QxQ">QxQ Content</label>
          <br /> <br />
          <textarea
            name="textInput-QxQ"
            type="text"
            id="QxQ"
            onChange={change_handler}
            value={props.model.QxQ()}
            rows="3"
            cols="50"
          />
          <br /> <br />
          <label htmlFor="textInput-defaultContent">Default Content</label>
          <br />
          <input
            type="text"
            name="textInput-defaultContent"
            type="text"
            id="defaultContent"
            onChange={change_handler}
            value={props.model.defaultContent()}
          />
        </div>
        <hr />
        <label htmlFor="textInput-val-type">Input Type</label>
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
          {Object.keys(_dataDefined)
            .map(val => val)
            .map(item => <option value={item}>{item}</option>)}
        </select>
        <br />
        {/*    <label for="textInput-val-length">Input Max Length</label>

          <input
            name="textInput-val-length"
            type="number"
            id="maxLength"
            onChange={change_handler}
            value={props.model.validations().maxLength}
            />
            size="2"
          */}
        {/* {address.whichValidation(props.model.validations().type)} */}
        {React.createElement(address.whichValidation(props.model.inputType()), {
          // key: i,
          model: props.model,
          form: props.form,
          // remove: props.remove,
          // add: props.add,
          mutate: props.mutate,
          // temporalStateChange: props.temporalStateChange
        })}
        <hr />
      </div>
    </div>
  );
};
