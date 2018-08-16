import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { valUtility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';

// const form = new Form(defaultPropsFE.Form);

export const _ImageBlockProperty = props => {
  const change_handler = event => {
    // console.log(event.target.value);
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: value,
    });
  };

  const layoutChange_handler = event => {
    props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: parseFloat(event.target.value),
      append:
        24 -
        props.model.prepend() -
        (event.target.id === 'prePromptWidth' ? parseFloat(event.target.value) : props.model.prePromptWidth()) -
        props.model.width() -
        (event.target.id === 'postPromptWidth' ? parseFloat(event.target.value) : props.model.postPromptWidth()),
      // function that calcs total width and subtracts all OTHER elements, returningt what the value should be
    });
  };

  let localFiles = [];
  for (var i = 0; i < localStorage.length; i++) {
    let _key = localStorage.key(i);
    localFiles.push({
      name: [_key],
      file: localStorage.getItem(localStorage.key(i)),
    });
  }

  return (
    <div>
      {/* <h1>Image Block</h1>
      <p>{props.model.UUID()}</p>
      <p>Total width: {calcTotal(props.model)}</p> */}
      <label htmlFor="url">
        Select a image: Note: To add images to this form, please upload under the 'Form' tab above
      </label>
      <br />
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
          <option>'No files found, please upload picture through Form Property Panel'</option>
        )}
      </select>
      <div />
      <div />
    </div>
  );
};
