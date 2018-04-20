import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';

export const DateValidationUI = props => {
  const change_handler = event => {
    return props.mutate(address.bySample(props.model, props.form), {
      validations: {
        ...props.model.validations(),
        [event.target.id]: event.target.value,
      },
    });
  };
  return (
    <div>
      <h1>Date Validations</h1>
      <br />
      <label for="val-fixed">Fixed</label>
      <select
        value={props.model.validations().fixed}
        className="form-control"
        name="val-fixed"
        onChange={change_handler}
        id="fixed"
      >
        <option value={true}>true</option>
        <option value={false}>false</option>
      </select>
      <br />
      <label for="val-full">Full</label>
      <select
        value={props.model.validations().full}
        className="form-control"
        name="val-full"
        onChange={change_handler}
        id="full"
      >
        <option value={true}>true</option>
        <option value={false}>false</option>
      </select>
      {props.model.validations().fixed ? (
        <p>
          <label for="val-partialExpression">Partial Date Expression</label>
          <br />
          <input
            type="text"
            id="partialExpression"
            name="val-partialExpression"
            onChange={change_handler}
            value={props.model.validations().partialExpression}
          />
        </p>
      ) : null}
      <br />
      <label for="val-timeZone">Timezone</label>
      <select
        value={props.model.validations().timeZone}
        className="form-control"
        name="val-timeZone"
        onChange={change_handler}
        id="timeZone"
      >
        <option selected value>
          {' '}
          -- select a Time Zone --{' '}
        </option>
        {Object.entries(timeZones).map(([key, value]) => (
          <option value={value}>{key}</option>
        ))}
      </select>
    </div>
  );
};

export default DateValidationUI;
