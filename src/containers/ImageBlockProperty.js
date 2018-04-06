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

  // const stringOfFiles = localStorage.getItem('FILE');
  // const filesJSON = JSON.parse(stringOfFiles);
  // const fileNames = stringOfFiles
  //   ? JSON.parse(stringOfFiles).map(file => {
  //       return Object.keys(file)[0];
  //     })
  //   : null;

  return (
    <div>
      <h1>Image Block</h1>
      <p>{props.model.UUID()}</p>
      <select
        value={props.model.url()}
        className="form-control"
        name="url"
        type={props.model.type()}
        onChange={change_handler}
        id="url"
      >
        <option value="test">test</option>
        <option
          value={localStorage.getItem(
            '25039085_879008932267581_1546704477334011904_n.jpg'
          )}
        >
          smiley.gif
        </option>
        {/*filesJSON.map(file => (
          <option value={localStorage.getItem('smiley.gif')}>
            {'smiley.gif'}
          </option>
        ))*/}
      </select>
      <div />
      <div />
    </div>
  );
};
