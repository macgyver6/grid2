import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { valUtility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';
import { DataDefinedValidation } from './DataDefinedValidation';
import Input_Property_Template from './Input_Property_Template';
/*
script: this.script(),
editing: this.editeable(),
*/
// const form = new Form(defaultPropsFE.Form);

export const _CDSTextInputProperty = props => {
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
      <br />
      <label htmlFor="evalidationPolicy">Script runs:</label>
      <select value={props.model.script()} className="form-control" name="script" onChange={change_handler} id="script">
        {[
          { label: '-- select a script --', value: '' },
          { label: 'Super helpful script', value: '0' },
          { label: 'Super helpful script 2', value: '2' },
          { label: 'Super helpful script 3', value: '3' },
          ,
        ].map(item => <option value={item.value}>{item.label}</option>)}
      </select>
      <br />
      <br />
      <select
        value={props.model.evaluationPolicy()}
        className="form-control"
        name="evaluationPolicy"
        onChange={change_handler}
        id="evaluationPolicy"
      >
        {/* <option selected value>
              {' '}
              -- select an default state --{' '}
      </option> */}
        {[
          { label: 'When form is first loaded', value: 'RENDER_FIRST' },
          { label: 'Every time form is loaded', value: 'RENDER_EVERY' },
          { label: 'If no collected data exists', value: 'IF_COLLECTED_DATA_NULL' },
        ].map(item => <option value={item.value}>{item.label}</option>)}
      </select>
      <p>
        <label htmlFor="editeable">Editeable: </label>
        <input
          type="checkbox"
          name="editeable"
          id="editeable"
          onChange={change_handler}
          checked={props.model.editeable()}
        />
      </p>
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
    </div>
  );
};
