import React from 'react';

export const TextInputProperty = props => (
  <div>
    <h1>Text Input Properties</h1>
    Name<input type="text" name="name" value={props.model.name()} />
    <br />
    PrePrompt<input
      type="text"
      name="firstname"
      value={props.model.prePrompt()}
    />
  </div>
);
