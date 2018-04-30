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
      <h2>Date Validations</h2>

      <br />
      <label for="val-full">How should the date to be collected be defined?</label>
      <select
        value={props.model.validations().full}
        className="form-control"
        name="val-full"
        onChange={change_handler}
        id="full"
      >
        <option value={true}>Full - Expect all properties on date to be entered. Ex. YYYYMMDDThhmmss-TZ</option>
        <option value={false}>Partial - Expect only date properties defined in expression below.</option>
      </select>

      {props.model.validations().full === 'false' ? (
        <p>
          <label for="val-partialExpression">Partial Date Expression</label>
          <br />
          <input
            type="text"
            id="partialExpression"
            name="val-partialExpression"
            onChange={change_handler}
            value={props.model.validations().partialExpression}
            placeholder="Ex. 'ymd'"
          />
        </p>
      ) : null}
      <br />
      <br />
      <label for="val-fixed">Can user override defined date properties for field?</label>
      <br />
      <select
        value={props.model.validations().fixed}
        className="form-control"
        name="val-fixed"
        onChange={change_handler}
        id="fixed"
      >
        <option value={true}>Prefer that date entered include all properties stated above, but accept any precision</option>
        <option value={false}>Strict - accept only date entered that includes all properties stated above</option>
      </select>
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
