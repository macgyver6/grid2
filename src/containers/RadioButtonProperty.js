import React from 'react';
import { address } from '../address';

export const RadioButtonProperty = props => {
  const change_handler = event => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: value
    });
  };
  return (
    <div>
      <h1>Radio Button</h1>
      <p>{props.model.UUID()}</p>

      <div>
        <p>
          <label for="radioButton-name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="radioButton-name"
            onChange={change_handler}
            value={props.model.name()}
          />
        </p>
        <p>
          <label for="radioButton-prompt_pre">
            Pre Prompt (optional){' '}
            <a
              class="tabnav-extra"
              href="https://guides.github.com/features/mastering-markdown/"
              target="_blank"
              data-ga-click="Markdown Toolbar, click, help"
            >
            </a>
          </label>
          <br />
          <input
            name="radioButton-prompt_pre"
            type="text"
            id="prePrompt"
            onChange={change_handler}
            value={props.model.prePrompt()}
          />
        </p>
        <p>
          <label for="radioButton-prompt_post">
            Post Prompt (optional){' '}
            <a
              class="tabnav-extra"
              href="https://guides.github.com/features/mastering-markdown/"
              target="_blank"
              data-ga-click="Markdown Toolbar, click, help"
            >
            </a>
          </label>
          <br />
          <input
            name="radioButton-prompt_post"
            type="text"
            id="postPrompt"
            onChange={change_handler}
            value={props.model.postPrompt()}
          />
        </p>
        {/* <p>
          <label for="radioButton-qbq">Q-by-Q (optional)</label>
          <br />
          <textarea name="radioButton-qbq" />
        </p> */}
      </div>
      <div>
        <p>
          <label for="radioButton-tabOrder">Tab Order</label>
          <br />
          <input
            type="number"
            name="radioButton-tabOrder"
            id="tabOrder"
            size="2"
            onChange={change_handler}
            value={props.model.tabOrder()}
            // disabled="disabled"
          />
        </p>
        <p>
          <label for="radioButton-sasCodeLabel">SAS Code Label</label>
          <br />
          <input
            type="text"
            name="radioButton-sasCodeLabel"
            id="sasCodeLabel"
            onChange={change_handler}
            value={props.model.sasCodeLabel()}
          />
        </p>
        <p />
        <br />
      </div>
    </div>
  );
};
