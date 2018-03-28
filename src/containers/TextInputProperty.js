import React from 'react';
import { address } from '../address';

export const TextInputProperty = props => {
  const change_handler = event => {
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
      <h1>Text Input</h1>
      <p>{props.model.UUID()}</p>

      <div>
        <p>
          <label for="textInput-name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="textInput-name"
            onChange={change_handler}
            value={props.model.name()}
          />
        </p>
        <p>
          <label for="textInput-prompt_pre">Pre Prompt (optional)</label>
          <br />
          <input
            name="textInput-prompt_pre"
            type="text"
            id="prePrompt"
            onChange={change_handler}
            value={props.model.prePrompt()}
          />
        </p>
        <p>
          <label for="textInput-prompt_post">Post Prompt (optional)</label>
          <br />
          <input
            name="textInput-prompt_post"
            type="text"
            id="postPrompt"
            onChange={change_handler}
            value={props.model.postPrompt()}
          />
        </p>
        {/* <p>
          <label for="textInput-qbq">Q-by-Q (optional)</label>
          <br />
          <textarea name="textInput-qbq" />
        </p> */}
      </div>
      <div>
        <p>
          <label for="textInput-tabOrder">Tab Order</label>
          <br />
          <input
            type="number"
            name="textInput-tabOrder"
            id="tabOrder"
            size="2"
            onChange={change_handler}
            value={props.model.tabOrder()}
            // disabled="disabled"
          />
        </p>
        <p>
          <label for="textInput-sasCodeLabel">SAS Code Label</label>
          <br />
          <input
            type="text"
            name="textInput-sasCodeLabel"
            id="sasCodeLabel"
            onChange={change_handler}
            value={props.model.sasCodeLabel()}
          />
        </p>
        <p>
          {console.log(props.model.autoTab())}

          <input
            type="checkbox"
            name="textInput-autoTab"
            id="autoTab"
            onChange={change_handler}
            checked={props.model.autoTab()}
          />
          <label for="textInput-autoTab">Enable Auto Tabbing</label>
        </p>
        <div>
          <label for="textInput-length">Max Length</label>
          <br />
          <input
            type="text"
            name="textInput-length"
            size="2"
            type="number"
            id="length"
            onChange={change_handler}
            value={props.model.length()}
          />
          <br />
          <label for="textInput-defaultContent">Default Content</label>
          <br />
          <input
            type="text"
            name="textInput-defaultContent"
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
