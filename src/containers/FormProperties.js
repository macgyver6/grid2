import React from 'react';
import { address } from '../address';

export const FormProperty = props => {
  const change_handler = event => {
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
      <h1>Form Properties</h1>
      <div>
        <p>
          <label for="form-name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="form-name"
            onChange={change_handler}
            value={props.model.name()}
          />
        </p>
        <p>
          <label for="form-prompt_pre">Pre Prompt (optional)</label>
          <br />
          <input
            name="form-prompt_pre"
            type="text"
            id="prePrompt"
            onChange={change_handler}
            value={props.model.prePrompt()}
          />
        </p>
        <p>
          <label for="form-prompt_post">Post Prompt (optional)</label>
          <br />
          <input
            name="form-prompt_post"
            type="text"
            id="postPrompt"
            onChange={change_handler}
            value={props.model.postPrompt()}
          />
        </p>
        {/* <p>
          <label for="form-qbq">Q-by-Q (optional)</label>
          <br />
          <textarea name="form-qbq" />
        </p> */}
      </div>
      <div>
        <p>
          <label for="form-tabOrder">Tab Order</label>
          <br />
          <input
            type="number"
            name="form-tabOrder"
            id="tabOrder"
            size="2"
            onChange={change_handler}
            value={props.model.tabOrder()}
          />
          // disabled="disabled"
        </p>
        <p>
          <label for="form-sasCodeLabel">SAS Code Label</label>
          <br />
          <input
            type="text"
            name="form-sasCodeLabel"
            id="sasCodeLabel"
            onChange={change_handler}
            value={props.model.sasCodeLabel()}
          />
        </p>
        <p>
          <input
            type="checkbox"
            name="form-autoTab"
            id="autoTab"
            onChange={change_handler}
            checked={props.model.autoTab()}
          />
          <label for="form-autoTab">Enable Auto Tabbing</label>
        </p>
        <div>
          <label for="form-length">Max Length</label>
          <br />
          <input
            name="form-length"
            size="2"
            type="number"
            id="length"
            onChange={change_handler}
            value={props.model.length()}
          />
          <br />
          <label for="form-defaultContent">Default Content</label>
          <br />
          <input
            type="text"
            name="form-defaultContent"
            type="text"
            id="defaultContent"
            onChange={change_handler}
            value={props.model.defaultContent()}
          />
        </div>
        <br />
      </div>
    </div>
  );
};
