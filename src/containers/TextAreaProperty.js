import React from 'react';
import { address } from '../address';

export const TextAreaProperty = props => {
  const change_handler = event => {
    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: event.target.value
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
          <label for="textArea-prompt_pre">
            Pre Prompt (optional){' '}
            <a
              class="tabnav-extra"
              href="https://guides.github.com/features/mastering-markdown/"
              target="_blank"
              data-ga-click="Markdown Toolbar, click, help"
            >

              {/* Markdown is supported */}
            </a>
          </label>
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
          <label for="textArea-prompt_post">
            Post Prompt (optional){' '}
            <a
              class="tabnav-extra"
              href="https://guides.github.com/features/mastering-markdown/"
              target="_blank"
              data-ga-click="Markdown Toolbar, click, help"
            >

              {/* Markdown is supported */}
            </a>
          </label>
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
            // disabled="disabled"
            />
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
        <br />
        <label for="textInput-QxQ">QxQ Content</label>

        <textarea
          name="textInput-QxQ"
          type="text"
          id="QxQ"
          onChange={change_handler}
          value={props.model.QxQ()}
          rows="3"
          cols="50"
        />
      </div>
    </div>
  );
};
