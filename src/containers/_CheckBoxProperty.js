import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';

// const form = new Form(defaultPropsFE.Form);

export const _CheckBoxProperty = props => {
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
      <p style={{ fontSize: 8, margin: '0px' }}>{props.model.UUID()}</p>
      <p style={{ fontSize: 8, margin: '0px 0px 4px 0px' }}>
        prePromptWidth: {props.model.prePromptWidth()} Append: Total width: {calcTotal(props.model)} PrePend:
        {props.model.prePrompt()} Width: {props.model.width()} Append:
        {props.model.append()}
      </p>{' '}
      <div>
        <p>
          <label for="checkBox-name">Name</label>
          <br />
          <input type="text" id="name" name="checkBox-name" onChange={change_handler} value={props.model.name()} />
        </p>
        Prompt Width:{' '}
        <input type="number" id="prePromptWidth" onChange={layoutChange_handler} value={props.model.prePromptWidth()} />
        Post Prompt Width:{' '}
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
        <br />
        <label htmlFor="checkBox-QxQ">QxQ Content</label>
        <br /> <br />
        <textarea
          name="checkBox-QxQ"
          type="text"
          id="QxQ"
          onChange={change_handler}
          value={props.model.QxQ()}
          rows="3"
          cols="50"
        />
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
        </p>
        <br />
        <label htmlFor="defaultState">Default State</label>
        <br />
        <select
          value={props.model.inputType()}
          className="form-control"
          name="defaultState"
          onChange={change_handler}
          id="defaultState"
        >
          {/* <option selected value>
              {' '}
              -- select an default state --{' '}
      </option> */}
          {[{ label: 'checked', value: true }, { label: 'unchecked', value: false }]
            .map(val => val)
            .map(item => <option value={item.value}>{item.label}</option>)}
        </select>
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
