import React from 'react';
import { address } from '../../address';

export const StringValidationUI = props => {
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
      <h1>String Validations</h1>
      <p>
        <label for="val-length">String Length</label>
        <br />
        <input
          type="number"
          name="val-length"
          id="length"
          size="2"
          onChange={change_handler}
          value={props.model.validations().length}
        />
      </p>
    </div>
  );
};

export default StringValidationUI;
