import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';

// const form = new Form(defaultPropsFE.Form);

export const _SelectionInputProperty = props => {
  const change_handler = event => {
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

  const addOption_handler = event => {
    const labelToAdd = document.getElementById('si-label').value;
    const valueToAdd = document.getElementById('si-value').value;
    var existing = [...props.model.options()];
    return props.mutate(address.bySample(props.model, props.form), {
      options: existing.concat({
        label: labelToAdd,
        value: valueToAdd,
      }),
    });
  };

  return (
    <div>
      <div>
        <p>
          <label for="selectionInput-name">Name</label>
          <br />
          <input
            disabled={props.model.postPromptWidth() < 1 ? true : false}
            type="text"
            id="name"
            name="selectionInput-name"
            onChange={change_handler}
            value={props.model.name()}
          />
        </p>
        Prompt Width:
        <input type="number" id="prePromptWidth" onChange={layoutChange_handler} value={props.model.prePromptWidth()} />
        Post Prompt Width:
        <input
          disabled={props.model.postPromptWidth() < 1 ? true : false}
          type="number"
          id="postPromptWidth"
          onChange={layoutChange_handler}
          value={props.model.postPromptWidth()}
        />
        <p>
          <label for="selectionInput-append">Append</label>
          <input
            type="number"
            name="selectionInput-append"
            id="append"
            onChange={change_handler}
            value={props.model.append()}
          />
        </p>
        <p>
          <label for="selectionInput-tabOrder">Tab Order</label>
          <br />
          <input
            type="number"
            name="selectionInput-tabOrder"
            id="tabOrder"
            size="2"
            onChange={change_handler}
            value={props.model.tabOrder()}
          />
        </p>
        <p>
          <label for="selectionInput-prompt_pre">
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
            name="selectionInput-prompt_pre"
            type="text"
            id="prePrompt"
            onChange={change_handler}
            value={props.model.prePrompt()}
          />
        </p>
        <p>
          <label for="selectionInput-prompt_post">
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
            name="selectionInput-prompt_post"
            type="text"
            id="postPrompt"
            onChange={change_handler}
            value={props.model.postPrompt()}
          />
        </p>
        {/* <p>
          <label for="selectionInput-qbq">Q-by-Q (optional)</label>
          <br />
          <textarea name="selectionInput-qbq" />
        </p> */}
      </div>
      <div>
        <p>
          <label for="selectionInput-tabOrder">Tab Order</label>
          <br />
          <input
            type="number"
            name="selectionInput-tabOrder"
            id="tabOrder"
            size="2"
            onChange={change_handler}
            value={props.model.tabOrder()}
          />
        </p>
        <p>
          <label for="selectionInput-sasCodeLabel">SAS Code Label</label>
          <br />
          <input
            type="text"
            name="selectionInput-sasCodeLabel"
            id="sasCodeLabel"
            onChange={change_handler}
            value={props.model.sasCodeLabel()}
          />
        </p>
      </div>

      <hr />
      <label htmlFor="textInput-val-type">Input Type</label>
      <br />
      <select
        value={props.model.inputType()}
        className="form-control"
        name="textInput-val-type"
        onChange={change_handler}
        id="inputType"
      >
        {/* <option selected value>
              {' '}
              -- select an option --{' '}
      </option> */}
        {Object.keys(_dataDefined)
          .map(val => val)
          .map(item => <option value={item}>{item}</option>)}
      </select>
      <br />
      <br />

      <div>
        <label for="renderMode">Selection Item Mode</label>

        <br />
        <br />
        <select name="renderMode" id="renderMode" onChange={change_handler}>
          <option value="selection">Selection</option>
          <option value="radio">Radio</option>
        </select>
        <br />

        <label for="label">Label</label>
        <input type="text" id="si-label" name="label" class="text" />

        <label for="value">Value</label>
        <input type="text" id="si-value" name="value" class="text" />

        <button id="addSi" onClick={addOption_handler}>
          +
        </button>
        <ul id="selectionOptions">
          {props.model.options().map(option => (
            <li className="flexbox-container">
              <div>
                <label for="input">Label</label>
                <input name="input" type="text" value={option.label} />
              </div>
              <div>
                <label for="value">Value</label>
                <input name="value" type="text" value={option.value} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
