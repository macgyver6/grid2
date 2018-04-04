import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';

// const form = new Form(defaultPropsFE.Form);

export const EchoProperty = props => {
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
      <h1>Echo Input</h1>
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
          <textarea
            name="textInput-prompt_pre"
            type="text"
            id="prePrompt"
            onChange={change_handler}
            value={props.model.prePrompt()}
            rows="3"
            cols="50"
          />
        </p>
        <p>
          <label for="textInput-prompt_post">Post Prompt (optional)</label>
          <br />
          <textarea
            name="textInput-prompt_post"
            type="text"
            id="postPrompt"
            onChange={change_handler}
            value={props.model.postPrompt()}
            rows="3"
            cols="50"
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
          />
          {/* disabled="disabled" */}
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
        <label for="echo-sourceInput">Echo Source Field</label>
        <br />
        <select
          className="form-control"
          name="echo-sourceInput"
          type={props.model.type()}
          value={props.model.sourceInput()}
          onChange={change_handler}
          id="sourceInput"
        >
          {utility
            .findAll(props.form, e => e instanceof FormInput)
            .map(formInput => (
              <option value={formInput.promptNumber()}>
                {`${formInput.promptNumber()} - ${formInput.type()}`}
              </option>
            ))}
        </select>

        <div />
        <br />
      </div>
    </div>
  );
};
