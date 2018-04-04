import React from 'react';
import { address } from '../address';
import { log } from 'util';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';

export const ImageBlockProperty = props => {
  const change_handler = event => {
    console.log('yolo2: ', { [event.target.id]: event.target.value });
    // console.log(event.target.value);
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: value,
    });
  };

  const stringOfFiles = localStorage.getItem('FILE');
  const filesJSON = JSON.parse(stringOfFiles);
  const fileNames = stringOfFiles
    ? JSON.parse(stringOfFiles).map(file => {
        return Object.keys(file)[0];
      })
    : null;

  return (
    <div>
      <h1>Image Block</h1>
      <p>{props.model.UUID()}</p>
      <select
        className="form-control"
        name="echo-url"
        type={props.model.type()}
        onChange={
          change_handler // value={props.model.url()}
        }
        id="url"
      >
        {filesJSON.map(file => (
          <option value={Object.values(file)}>{Object.keys(file)}</option>
        ))}
      </select>
      <div />
      <div />
    </div>
  );
};
