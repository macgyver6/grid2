import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';

// const form = new Form(defaultPropsFE.Form);

export const EchoProperty = props => {
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

  return (
    <div>
      <h1>Echo Input</h1>
      <p>{props.model.UUID()}</p>
      <p>Total width: {calcTotal(props.model)}</p>
      <p>prePrompt width: {JSON.stringify(props.model)}</p>

      <div>
        <p>
          <label for="textInput-name">Name</label>
          <br />
          <input type="text" id="name" name="textInput-name" onChange={change_handler} value={props.model.name()} />
        </p>
        Prompt Width:
        <input type="number" id="prePromptWidth" onChange={layoutChange_handler} value={props.model.prePromptWidth()} />
        Post Prompt Width:
        <input
          type="number"
          id="postPromptWidth"
          onChange={layoutChange_handler}
          value={props.model.postPromptWidth()}
        />
        <p>
          <label for="textInput-prompt_pre">
            Pre Prompt (optional){' '}
            <a
              class="tabnav-extra"
              href="https://guides.github.com/features/mastering-markdown/"
              target="_blank"
              data-ga-click="Markdown Toolbar, click, help"
            >
              <svg
                class="octicon octicon-markdown v-align-bottom"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"
                />
              </svg>
              {/* Markdown is supported */}
            </a>
          </label>
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
          <label for="textInput-prompt_post">
            Post Prompt (optional){' '}
            <a
              class="tabnav-extra"
              href="https://guides.github.com/features/mastering-markdown/"
              target="_blank"
              data-ga-click="Markdown Toolbar, click, help"
            >
              <svg
                class="octicon octicon-markdown v-align-bottom"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"
                />
              </svg>
              {/* Markdown is supported */}
            </a>
          </label>
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
              <option value={formInput.promptNumber()}>{`${formInput.promptNumber()} - ${formInput.type()}`}</option>
            ))}
        </select>

        <div />
        <br />
      </div>
    </div>
  );
};
