import React, { Component } from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';
import Input_Property_Template from './Input_Property_Template';
import { DataDefinedValidation } from './DataDefinedValidation';
// const form = new Form(defaultPropsFE.Form);

class _SelectionInputProperty extends Component {
  constructor() {
    super();
    // this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      value: '',
      isValid: null,
    };
    this.change_handler = this.change_handler.bind(this);
    this.addOption_handler = this.addOption_handler.bind(this);
    this.dragstart_handler = this.dragstart_handler.bind(this);
    this.onDragOverHandler = this.onDragOverHandler.bind(this);
    this.drop_handler = this.drop_handler.bind(this);
    this.handleValue = this.handleValue.bind(this);
  }
  change_handler(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    return this.props.mutate(address.bySample(this.props.model, this.props.form), {
      [event.target.id]: value,
    });
  }

  layoutChange_handler(event) {
    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      [event.target.id]: parseFloat(event.target.value),
      append:
        24 -
        this.props.model.prepend() -
        (event.target.id === 'prePromptWidth' ? parseFloat(event.target.value) : this.props.model.prePromptWidth()) -
        this.props.model.width() -
        (event.target.id === 'postPromptWidth' ? parseFloat(event.target.value) : this.props.model.postPromptWidth()),
      // function that calcs total width and subtracts all OTHER elements, returningt what the value should be
    });
  }

  addOption_handler(event) {
    const labelToAdd = document.getElementById('si-label').value;
    const valueToAdd = document.getElementById('si-value').value;
    var existing = [...this.props.model.options()];
    return this.props.mutate(address.bySample(this.props.model, this.props.form), {
      options: existing.concat({
        label: labelToAdd,
        value: valueToAdd,
      }),
    });
  }

  onDragOverHandler(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  dragstart_handler(event, index) {
    event.dataTransfer.setData('index', event.target.id);
    console.log(index);
  }

  drop_handler(event) {
    event.stopPropagation();
    // const dropData = Number(event.dataTransfer.getData('index'));
    // const destinationAddress = event.target.id;
    // const _children = [...this.props.model.options()];
    // const entityRemoved = _children.splice(dropData, 1);
    // const entityInsertedAtNewIndex = _children.splice(destinationAddress, 0, entityRemoved[0]);

    const indexOfSource = Number(event.dataTransfer.getData('index'));
    const indexOfDestination = event.target.id;
    const _options = [...this.props.model.options()];
    const entityRemoved = _options.splice(indexOfSource, 1);
    const entityInsertedAtNewIndex = _options.splice(indexOfDestination, 0, entityRemoved[0]);

    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      options: _options,
    });
  }

  handleValue(event) {
    const value = event.target.value;
    const getRegex = () => {
      if (this.props.model.inputType() === 'Integer') {
        return /^\d+$/;
      } else if (this.props.model.inputType() === 'Float') {
        return /^[+-]?\d+(\.\d+)?$/;
      } else if (this.props.model.inputType() === 'String') {
        return /^[a-z]*$/;
      }
    };
    const validateValue = () => {
      // string, integer, float
      // var regex = /^\d+$/;
      if (getRegex().test(value)) {
        return true;
      } else {
        return false;
      }
    };
    this.setState({
      value: value,
      isValid: validateValue(),
    });
  }

  render() {
    return (
      <div>
        <Input_Property_Template
          model={address.byPath(this.props.form, this.props.currententity)}
          form={this.props.form}
          currententity={this.props.currententity}
          mutate={this.props.mutate}
          appState={this.props.appState}
          temporalStateChange={this.props.temporalStateChange}
          add={this.props.add}
        />

        <hr />

        <div>
          <label for="renderMode">Selection Item Mode</label>

          <br />
          <br />
          <select name="renderMode" id="renderMode" onChange={this.change_handler}>
            <option value="selection">Selection</option>
            <option value="radio">Radio</option>
          </select>
          <hr />
          <DataDefinedValidation
            model={address.byPath(this.props.form, this.props.currententity)}
            form={this.props.form}
            currententity={this.props.currententity}
            mutate={this.props.mutate}
            appState={this.props.appState}
            temporalStateChange={this.props.temporalStateChange}
          />
          <br />
          <hr />
          {this.state.isValid ? null : (
            <p style={{ color: 'red' }}>Invalid value - must be of type: {this.props.model.inputType()}</p>
          )}
          <label for="label">Label</label>
          <input type="text" id="si-label" name="label" class="text" />

          <label for="value">Value</label>
          <input type="text" id="si-value" name="value" class="text" onChange={this.handleValue} />

          <button id="addSi" onClick={this.addOption_handler} disabled={this.state.value !== '' && !this.state.isValid}>
            +
          </button>
          <ul id="selectionOptions">
            {this.props.model.options().map((option, index) => (
              <li
                className="flexbox-container"
                onDragStart={this.dragstart_handler}
                onDragOver={this.onDragOverHandler}
                onDrop={this.drop_handler}
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
                <i className="fas fa-ellipsis-v" />
                <i className="fas fa-ellipsis-v" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default _SelectionInputProperty;
