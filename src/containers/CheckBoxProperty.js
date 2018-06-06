import React from 'react';
import { address } from '../address';
import { calcTotal } from '../components/FormEntities/feStyles';

export const CheckBoxProperty = props => {
  const change_handler = event => {
    console.log(props.model.name());

    return props.mutate(address.bySample(props.model, props.form), {
      [`${event.target.id}`]: event.target.value,
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
      <h1>Checkbox</h1>
      <p>{props.model.UUID()}</p>
      <p>Total width: {calcTotal(props.model)}</p>

      <div>
        <p>
          <label for="checkBox-name">Name</label>
          <br />
          <input type="text" id="name" name="checkBox-name" onChange={change_handler} value={props.model.name()} />
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
          <label for="checkBox-prompt_pre">
            Pre Prompt (optional){' '}
            <a
              class="tabnav-extra"
              href="https://guides.github.com/features/mastering-markdown/"
              target="_blank"
              data-ga-click="Markdown Toolbar, click, help"
            />
          </label>
          <br />
          <input
            name="checkBox-prompt_pre"
            type="text"
            id="prePrompt"
            onChange={change_handler}
            value={props.model.prePrompt()}
          />
        </p>
        <p>
          <label for="checkBox-prompt_post">
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
            name="checkBox-prompt_post"
            type="text"
            id="postPrompt"
            onChange={change_handler}
            value={props.model.postPrompt()}
          />
        </p>
        {/* <p>
          <label for="checkBox-qbq">Q-by-Q (optional)</label>
          <br />
          <textarea name="checkBox-qbq" />
        </p> */}
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
          // disabled="disabled"
        </p>
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
