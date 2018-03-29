import React from 'react';
import { address } from '../address';

export const TextAreaProperty = props => {
  const change_handler = event => {
    console.log(props.model.name());

    return props.mutate(address.bySample(props.model, props.form), {
      name: event.target.value
    });
  };
  return (
    <div>
      <h1>Text Area</h1>
      <p>{props.model.UUID()}</p>

      <div>
        <p>
          <label for="textArea-name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="textArea-name"
            onChange={change_handler}
            value={props.model.name()}
          />
        </p>
        <p>
          <label for="textArea-prompt_pre">Pre Prompt (optional)</label>
          <br />
          <input
            name="textArea-prompt_pre"
            type="text"
            id="prePrompt"
            onChange={change_handler}
            value={props.model.prePrompt()}
          />
        </p>
        <p>
          <label for="textArea-prompt_post">Post Prompt (optional)</label>
          <br />
          <input
            name="textArea-prompt_post"
            type="text"
            id="postPrompt"
            onChange={change_handler}
            value={props.model.postPrompt()}
          />
        </p>
        {/* <p>
          <label for="textArea-qbq">Q-by-Q (optional)</label>
          <br />
          <textarea name="textArea-qbq" />
        </p> */}
      </div>
      <div>
        <p>
          <label for="textArea-tabOrder">Tab Order</label>
          <br />
          <input
            type="number"
            name="textArea-tabOrder"
            id="tabOrder"
            size="2"
            onChange={change_handler}
            value={props.model.tabOrder()}
          />
          // disabled="disabled"
        </p>
        <p>
          <label for="textArea-sasCodeLabel">SAS Code Label</label>
          <br />
          <input
            type="text"
            name="textArea-sasCodeLabel"
            id="sasCodeLabel"
            onChange={change_handler}
            value={props.model.sasCodeLabel()}
          />
        </p>
      </div>
    </div>
  );
};
