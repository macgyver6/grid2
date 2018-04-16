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
          />
          // disabled="disabled"
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
