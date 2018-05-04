import React from 'react';
import { address } from '../address';
import { log } from 'util';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';

export const ImageBlockProperty = props => {
  const change_handler = event => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: value
    });
  };

  let localFiles = [];
  for (var i = 0; i < localStorage.length; i++) {
    let _key = localStorage.key(i);
    localFiles.push({
      name: [_key],
      file: localStorage.getItem(localStorage.key(i))
    });
  }

  return (
    <div>
      <h1>Image Block</h1>
      <p>{props.model.UUID()}</p>
      <p>Total width: {calcTotal(props.model)}</p>
      <select
        value={props.model.url()}
        className="form-control"
        name="url"
        type={props.model.type()}
        onChange={change_handler}
        id="title"
      >
        {localFiles.length > 0 ? (
          <option selected value>
            {' '}
            -- select an option --{' '}
          </option>
        ) : null}

        {localFiles.length > 0 ? (
          localFiles.map(file => <option value={file.name}>{file.name}</option>)
        ) : (
          <option>
            'No files found, please upload picture through Form Property Panel'
          </option>
        )}
      </select>
      <div />
      <div />
    </div>
  );
};
