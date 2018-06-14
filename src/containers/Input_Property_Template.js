import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';

// const form = new Form(defaultPropsFE.Form);

export const Input_Property_Template = props => {
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
      </p>
      <div>
        <p>
          <label htmlFor="textInput-name">Name</label>
          <br />
          <input type="text" id="name" name="textInput-name" onChange={change_handler} value={props.model.name()} />
        </p>
        Prompt Width: {'    '}
        <input type="number" id="prePromptWidth" onChange={layoutChange_handler} value={props.model.prePromptWidth()} />
        {'    '}
        Post Prompt Width:
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
      <div>
        <p>
          <label htmlFor="textInput-tabOrder">Tab Order</label>
          <br />
          <input
            type="number"
            name="textInput-tabOrder"
            id="tabOrder"
            size="2"
            onChange={change_handler}
            value={props.model.tabOrder()}
          />
        </p>
        <p>
          <label htmlFor="textInput-sasCodeLabel">SAS Code Label</label>
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
          <label htmlFor="textInput-autoTab">Enable Auto Tabbing</label>
        </p>
        <div>
          <label htmlFor="textInput-length">Max Length</label>
          <br />
          <input
            name="textInput-length"
            size="2"
            type="number"
            id="length"
            onChange={change_handler}
            value={props.model.maxLength()}
          />
          <br />
          <label htmlFor="textInput-QxQ">QxQ Content</label>
          <br /> <br />
          <textarea
            name="textInput-QxQ"
            type="text"
            id="QxQ"
            onChange={change_handler}
            value={props.model.QxQ()}
            rows="3"
            cols="50"
          />
          <br /> <br />
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
        {/*    <label for="textInput-val-length">Input Max Length</label>

          <input
            name="textInput-val-length"
            type="number"
            id="maxLength"
            onChange={change_handler}
            value={props.model.validations().maxLength}
            />
            size="2"
          */}
        {/* {address.whichValidation(props.model.validations().type)} */}
        {React.createElement(address.whichValidation(props.model.inputType()), {
          // key: i,
          model: props.model,
          form: props.form,
          // remove: props.remove,
          // add: props.add,
          mutate: props.mutate,
          // temporalStateChange: props.temporalStateChange
        })}
        <hr />
      </div>
    </div>
  );
};
