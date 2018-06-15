import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';
import { entityActions } from '../components/FormEntities/actions.entities';

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

  const copyHandler = event => {
    event.preventDefault();
    console.log('copyHandler');

    const entityAddress = address.bySample(props.model, props.form);
    let sectionAddress = entityAddress.slice(0, entityAddress.length - 1);
    const howManyChildren = address.byPath(props.form, sectionAddress).children().length;
    const combinedAddress = sectionAddress.concat(howManyChildren);
    props.add(combinedAddress, props.model);
    console.log(combinedAddress);
  };

  return (
    <div>
      <p style={{ fontSize: 8, margin: '0px' }}>{props.model.UUID()}</p>
      <p style={{ fontSize: 8, margin: '0px 0px 4px 0px' }}>
        prePromptWidth: {props.model.prePromptWidth()} Append: Total width: {calcTotal(props.model)} PrePend:
        {props.model.prePrompt()} Width: {props.model.width()} Append:
        {props.model.append()}
      </p>
      <button onClick={copyHandler}>📋 Copy This Entity</button>
      <div>
        <p>
          <label htmlFor="textInput-name">Name</label>
          <br />
          <input type="text" id="name" name="textInput-name" onChange={change_handler} value={props.model.name()} />
        </p>
        <p>
          <label htmlFor="externalIdentifier">Field Identifier</label>
          <br />
          <input
            type="text"
            id="externalIdentifier"
            name="externalIdentifier"
            onChange={change_handler}
            value={props.model.externalIdentifier()}
          />
        </p>

        <label htmlFor="prePromptWidth">Prompt Width: </label>
        <input
          name="prePromptWidth"
          type="number"
          id="prePromptWidth"
          onChange={layoutChange_handler}
          value={props.model.prePromptWidth()}
        />

        <label htmlFor="prePrompt">
          {' '}
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
          </a>{' '}
          Prompt (optional):{' '}
        </label>
        <textarea
          disabled={props.model.prePromptWidth() < 1 ? true : false}
          name="prePrompt"
          type="text"
          id="prePrompt"
          onChange={change_handler}
          value={props.model.prePrompt()}
        />
        <br />

        <label htmlFor="postPromptWidth"> Post Prompt Width: </label>
        <input
          name="postPromptWidth"
          type="number"
          id="postPromptWidth"
          onChange={layoutChange_handler}
          value={props.model.postPromptWidth()}
        />

        <label htmlFor="postPrompt">
          {' '}
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
          </a>{' '}
          Post Prompt (optional):{' '}
        </label>
        <textarea
          disabled={props.model.postPromptWidth() < 1 ? true : false}
          value={props.model.postPrompt()}
          name="posPrompt"
          type="text"
          id="postPrompt"
          onChange={change_handler}
        />
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
          <label htmlFor="textInput-sasCodeLabel">Field Label: </label>
          <br />
          <input
            type="text"
            name="textInput-sasCodeLabel"
            id="sasCodeLabel"
            onChange={change_handler}
            value={props.model.sasCodeLabel()}
          />
        </p>
        <div>
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
      </div>
    </div>
  );
};
