import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { valUtility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';

// const form = new Form(defaultPropsFE.Form);

export const _TextBlockProperty = props => {
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
            // style={{ whiteSpace: 'pre-line' }}
          />
        </div>
        <br />
      </div>
    </div>
  );
};
