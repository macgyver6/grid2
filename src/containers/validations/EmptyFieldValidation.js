import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';

export const EmptyFieldValidation = props => {
  // const change_handler = event => {
  //   return props.mutate(address.bySample(props.model, props.form), {
  //     validations: {
  //       ...props.model.validations(),
  //       [event.target.id]: event.target.value,
  //     },
  //   });
  // };
  return (
    <div>
      <h2>EmptyField Validations</h2>
      <br />
    </div>
  );
};

export default EmptyFieldValidation;
