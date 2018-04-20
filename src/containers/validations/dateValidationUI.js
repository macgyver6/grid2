import React from 'react';
import { address } from '../../address';

export const DateValidationUI = props => {
  const change_handler = event => {
    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.name]: event.target.value
    });
  };
  return (
    <div>
      <h1>Date Validations</h1>
      <p>
        <label for="val-partialExpression">Partial Date Expression</label>
        <br />
        <input
          type="text"
          id="partialExpression"
          name="val-partialExpression"
          onChange={change_handler}
          value={props.model.partialExpression}
        />
      </p>
      <br />
      <select
        value={
          props.model.validations().fixed ? props.model.validations().fixed : ''
        }
        className="form-control"
        name="textInput-val-type"
        onChange={change_handler}
        id="fixed"
      >
        <option selected value>
          {' '}
          -- select an option --{' '}
        </option>
        <option value="true">'true'</option>
        <option value="false">'false'</option>
      </select>
    </div>
  );
};

export default DateValidationUI;
