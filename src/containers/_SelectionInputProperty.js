import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';
import { Input_Property_Template } from './Input_Property_Template';
import { DataDefinedValidation } from './DataDefinedValidation';
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

  let onDragOverHandler = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  let dragstart_handler = (event, index) => {
    event.dataTransfer.setData('index', event.target.id);
    console.log(index);
  };

  let drop_handler = event => {
    event.stopPropagation();
    // const dropData = Number(event.dataTransfer.getData('index'));
    // const destinationAddress = event.target.id;
    // const _children = [...props.model.options()];
    // const entityRemoved = _children.splice(dropData, 1);
    // const entityInsertedAtNewIndex = _children.splice(destinationAddress, 0, entityRemoved[0]);

    const indexOfSource = Number(event.dataTransfer.getData('index'));
    const indexOfDestination = event.target.id;
    const _options = [...props.model.options()];
    const entityRemoved = _options.splice(indexOfSource, 1);
    const entityInsertedAtNewIndex = _options.splice(indexOfDestination, 0, entityRemoved[0]);

    props.mutate(address.bySample(props.model, props.form), {
      options: _options,
    });
  };

  return (
    <div>
      <Input_Property_Template
        model={address.byPath(props.form, props.currententity)}
        form={props.form}
        currententity={props.currententity}
        mutate={props.mutate}
        appState={props.appState}
        temporalStateChange={props.temporalStateChange}
        add={props.add}
      />

      <hr />

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
          {props.model.options().map((option, index) => (
            <li
              className="flexbox-container"
              onDragStart={dragstart_handler}
              onDragOver={onDragOverHandler}
              onDrop={drop_handler}
              id={index}
              draggable="true"
            >
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
      <hr />
      <DataDefinedValidation
        model={address.byPath(props.form, props.currententity)}
        form={props.form}
        currententity={props.currententity}
        mutate={props.mutate}
        appState={props.appState}
        temporalStateChange={props.temporalStateChange}
      />
    </div>
  );
};
