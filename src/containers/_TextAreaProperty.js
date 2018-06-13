import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';

// const form = new Form(defaultPropsFE.Form);

export const _TextAreaProperty = props => {
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
      <h1>Text Area</h1>
      <p>{props.model.UUID()}</p>
      <p>Total width: {calcTotal(props.model)}</p>
      <div>
        <p>
          <label for="textArea-name">Name</label>
          <br />
          <input type="text" id="name" name="textArea-name" onChange={change_handler} value={props.model.name()} />
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
          <label for="prePrompt">
            Prompt (optional){' '}
            <a
              class="tabnav-extra"
              href="https://guides.github.com/features/mastering-markdown/"
              target="_blank"
              data-ga-click="Markdown Toolbar, click, help"
            />
          </label>
          <br />
          <input
            disabled={props.model.prePromptWidth() < 1 ? true : false}
            name="prePrompt"
            type="text"
            id="prePrompt"
            onChange={change_handler}
            value={props.model.prePrompt()}
          />
        </p>
        <p>
          <label for="posPrompt">
            Post Prompt (optional){' '}
            <a
              class="tabnav-extra"
              href="https://guides.github.com/features/mastering-markdown/"
              target="_blank"
              data-ga-click="Markdown Toolbar, click, help"
            />
          </label>
          <br />
          <input
            disabled={props.model.postPromptWidth() < 1 ? true : false}
            value={props.model.postPrompt()}
            name="posPrompt"
            type="text"
            id="postPrompt"
            onChange={change_handler}
          />
        </p>
      </div>
      <p>
        <label for="numRows">
          Text Area Rows:
          <a
            href="https://guides.github.com/features/mastering-markdown/"
            data-ga-click="Markdown Toolbar, click, help"
          />
        </label>
        <br />
        <input
          value={props.model.numRows()}
          name="numRows"
          type="number"
          id="numRows"
          onChange={change_handler}
        />
      </p>{' '}
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
