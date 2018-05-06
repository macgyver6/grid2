import React from 'react';
import { address } from '../address';
import { calcTotal } from '../components/FormEntities/feStyles';

export const AdverseEventProperty = props => {
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
      <h1>Adverse Event Input</h1>
      <p>{props.model.UUID()}</p>
      <p>Total width: {calcTotal(props.model)}</p>

      <div>
        <p>
          <label for="adverseEvent-name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="adverseEvent-name"
            onChange={change_handler}
            value={props.model.name()}
          />
        </p>
        <p>
          <label for="adverseEvent-prompt_pre">Pre Prompt (optional)</label>
          <br />
          <textarea
            name="adverseEvent-prompt_pre"
            type="text"
            id="prePrompt"
            onChange={change_handler}
            value={props.model.prePrompt()}
            rows="3"
            cols="50"
          />
        </p>
        <p>
          <label for="adverseEvent-prompt_post">Post Prompt (optional)</label>
          <br />
          <textarea
            name="adverseEvent-prompt_post"
            type="text"
            id="postPrompt"
            onChange={change_handler}
            value={props.model.postPrompt()}
            rows="3"
            cols="50"
          />
        </p>
        {/* <p>
          <label for="adverseEvent-qbq">Q-by-Q (optional)</label>
          <br />
          <textarea name="adverseEvent-qbq" />
        </p> */}
      </div>
      <div>
        <p>
          <label for="adverseEvent-tabOrder">Tab Order</label>
          <br />
          <input
            type="number"
            name="adverseEvent-tabOrder"
            id="tabOrder"
            size="2"
            onChange={change_handler}
            value={props.model.tabOrder()}
          />
          {/* disabled="disabled" */}
        </p>
        <p>
          <label for="adverseEvent-sasCodeLabel">SAS Code Label</label>
          <br />
          <input
            type="text"
            name="adverseEvent-sasCodeLabel"
            id="sasCodeLabel"
            onChange={change_handler}
            value={props.model.sasCodeLabel()}
          />
        </p>
        <br />
      </div>
    </div>
  );
};
