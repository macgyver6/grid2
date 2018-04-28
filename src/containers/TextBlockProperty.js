import React from 'react';
import { address } from '../address';
import { log } from 'util';

export const TextBlockProperty = props => {
  const change_handler = event => {
    console.log({ [event.target.id]: event.target.value });
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
      <h1>Text Block</h1>
      <p>{props.model.UUID()}</p>

      <div />
      <div>
        <div>
          <br />
          <label for="textBlock-content">
            Content{' '}
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
            name="textBlock-content"
            type="text"
            id="content"
            onChange={change_handler}
            value={props.model.content()}
            rows="10"
            cols="42"
          />
        </div>
        <br />
      </div>
    </div>
  );
};
