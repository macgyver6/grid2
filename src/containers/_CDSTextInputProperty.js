import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';

// const form = new Form(defaultPropsFE.Form);

export const _CDSTextInputProperty = props => {
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
      <div>
        <p>
          <label for="textInput-name">Name</label>
          <br />
          <input type="text" id="name" name="textInput-name" onChange={change_handler} value={props.model.name()} />
        </p>
        PrePromptWidth:
        <input type="number" id="prePromptWidth" onChange={layoutChange_handler} value={props.model.prePromptWidth()} />
        PostPromptWidth:
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
            />
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
            />
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
        <p>
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
            name="textInput-length"
            size="2"
            type="number"
            id="length"
            onChange={change_handler}
            value={props.model.validations().maxLength}
          />
          <br />
          <label for="textInput-script">Script</label>
          <br />
          <textarea
            type="text"
            name="textInput-script"
            id="script"
            onChange={change_handler}
            value={props.model.script()}
            rows="10"
            cols="50"
          />
        </div>
        <br />
      </div>
    </div>
  );
};
