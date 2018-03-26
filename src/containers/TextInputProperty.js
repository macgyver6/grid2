import React from 'react';
import { address } from '../address';

export const TextInputProperty = props => {
  const change_handler = event => {
    console.log(props.model.name());

    return props.mutate(address.bySample(props.model, props.form), {
      name: event.target.value
    });
  };
  console.log(props.model);
  return (
    <div>
      <h1>Text Input Properties</h1>
      <p>{props.model.UUID()}</p>
      Name<input onChange={change_handler} value={props.model.name()} />
      <br />
      {/* PrePrompt<input
      type="text"
      name="firstname"
      value={props.model.prePrompt()}
    /> */}
    </div>
  );
};
