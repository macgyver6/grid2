import React from 'react';
import { address } from '../address';
import { calcTotal } from '../components/FormEntities/feStyles';

export const SelectionInputProperty = props => {
  console.log('props.model.renderMode', props.model.renderMode())
  const change_handler = event => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: value
    });
  };
  const addOption_handler = event => {
    const labelToAdd = document.getElementById('si-label').value;
    const valueToAdd = document.getElementById('si-value').value;
    var existing = [...props.model.options()];
    return props.mutate(address.bySample(props.model, props.form), {
      options: existing.concat({
        label: labelToAdd,
        value: valueToAdd
      })
    });
  };
  return (
    <div>
      <h1>Selection Input</h1>
      <p>{props.model.UUID()}</p>
      <p>Total width: {calcTotal(props.model)}</p>

      <div>
        <p>
          <label for="selectionInput-name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="selectionInput-name"
            onChange={change_handler}
            value={props.model.name()}
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
            // disabled="disabled"
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

      <div>
        <label for="renderMode">Selection Item Mode</label>
        <br />
        <select name="renderMode" id="renderMode"             onChange={change_handler}
        >
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
                <label for="input">Value</label>
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
