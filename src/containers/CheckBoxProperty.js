import React from 'react';
import { address } from '../address';

export const CheckBoxProperty = props => {
  const change_handler = event => {
    console.log(props.model.name());

    return props.mutate(address.bySample(props.model, props.form), {
      name: event.target.value
    });
  };
  return (
    <div>
      <h1>Checkbox</h1>
      <p>{props.model.UUID()}</p>

      <div>
        <p>
          <label for="checkBox-name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="checkBox-name"
            onChange={change_handler}
            value={props.model.name()}
          />
        </p>
        <p>
          <label for="checkBox-prompt_pre">
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
            name="checkBox-prompt_pre"
            type="text"
            id="prePrompt"
            onChange={change_handler}
            value={props.model.prePrompt()}
          />
        </p>
        <p>
          <label for="checkBox-prompt_post">
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
            name="checkBox-prompt_post"
            type="text"
            id="postPrompt"
            onChange={change_handler}
            value={props.model.postPrompt()}
          />
        </p>
        {/* <p>
          <label for="checkBox-qbq">Q-by-Q (optional)</label>
          <br />
          <textarea name="checkBox-qbq" />
        </p> */}
      </div>
      <div>
        <p>
          <label for="checkBox-tabOrder">Tab Order</label>
          <br />
          <input
            type="number"
            name="checkBox-tabOrder"
            id="tabOrder"
            size="2"
            onChange={change_handler}
            value={props.model.tabOrder()}
          />
          // disabled="disabled"
        </p>
        <p>
          <label for="checkBox-sasCodeLabel">SAS Code Label</label>
          <br />
          <input
            type="text"
            name="checkBox-sasCodeLabel"
            id="sasCodeLabel"
            onChange={change_handler}
            value={props.model.sasCodeLabel()}
          />
        </p>
      </div>
    </div>
  );
};
