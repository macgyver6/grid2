import React from 'react';
import { address } from '../address';
import { log } from 'util';

export const TextBlockProperty = props => {
  const change_handler = event => {
    console.log({ [event.target.id]: event.target.value });
    // console.log(event.target.value);
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: value,
    });
  };
  return (
    <div>
      <h1>Text Block</h1>
      <p>{props.model.UUID()}</p>

      <div />
      <div>
        <div>
          <br />
          <label for="textBlock-content">Content</label>
          <br />
          <textarea
            name="textBlock-content"
            type="text"
            id="content"
            onChange={change_handler}
            value={props.model.content()}
            rows="10"
            cols="50"
          />
        </div>
        <br />
      </div>
    </div>
  );
};
