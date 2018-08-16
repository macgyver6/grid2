import React, { Component } from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { valUtility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';
import Input_Property_Template from './Input_Property_Template';
import { DataDefinedValidation } from './DataDefinedValidation';
import { EventEmitter } from 'events';
// const form = new Form(defaultPropsFE.Form);

class _SelectionInputProperty extends Component {
  constructor() {
    super();
    // this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      value: '',
      isValid: true,
      label: '',
      value: '',
    };
    this.change_handler = this.change_handler.bind(this);
    this.addOption_handler = this.addOption_handler.bind(this);
    this.dragstart_handler = this.dragstart_handler.bind(this);
    this.onDragOverHandler = this.onDragOverHandler.bind(this);
    this.drop_handler = this.drop_handler.bind(this);
    this.editOption_handler = this.editOption_handler.bind(this);
    this.validateValue = this.validateValue.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  change_handler(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    this.setState({
      [event.target.name]: event.target.value,
      ...(event.target.id === 'si-value' ? { isValid: this.validateValue(event.target.value) } : {}),
    });
  }

  handleDelete(event) {
    const index = event.target.id;
    const originalOptions = [...this.props.model.options()];

    originalOptions.splice(index, 1);

    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      options: originalOptions,
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

  editOption_handler(event) {
    const indexToEdit = Number(event.currentTarget.id);
    const _options = [...this.props.model.options()];
    const _option = { ..._options[indexToEdit] };
    _option[event.target.name] = event.target.value;
    _options.splice(indexToEdit, 1, _option);
    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      options: _options,
    });
  }

  addOption_handler(event) {
    const labelToAdd = document.getElementById('si-label').value;
    const valueToAdd = document.getElementById('si-value').value;
    var existing = [...this.props.model.options()];
    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      options: existing.concat({
        label: labelToAdd,
        value: valueToAdd,
      }),
    });
    this.setState({
      value: '',
      label: '',
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
    const indexOfDestination = Number(event.currentTarget.id);
    console.log(indexOfSource, indexOfDestination);
    const _options = [...this.props.model.options()];
    const entityRemoved = _options.splice(indexOfSource, 1);
    console.log('entityRemoved: ', entityRemoved);
    const entitityInsertedAtNewIndex = _options.splice(indexOfDestination, 0, entityRemoved[0]);

    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      options: _options,
    });
  }

  validateValue(value) {
    const getRegex = () => {
      if (this.props.model.inputType() === 'Integer') {
        return /^\d+$/;
      } else if (this.props.model.inputType() === 'Float') {
        return /^[+-]?\d+(\.\d+)?$/;
      } else if (this.props.model.inputType() === 'String') {
        return /[\s\S]+/;
      }
    };
    if (value === '') {
      return true;
    } else if (getRegex().test(value)) {
      return true;
    } else {
      return false;
    }
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
                <i className="fas fa-ellipsis-v" />
                <i className="fas fa-ellipsis-v" />
                <div>
                  <label for="input">Label</label>
                  <input name="label" type="text" value={option.label} id={index} onChange={this.editOption_handler} />
                </div>
                <div>
                  <label for="value">Value</label>
                  <input name="value" type="text" value={option.value} id={index} onChange={this.editOption_handler} />
                </div>
                <i className="far fa-trash-alt" style={{ color: 'red' }} id={index} onClick={this.handleDelete} />
                <div> {this.validateValue(option.value) ? null : <p style={{ color: 'red' }}>invalid type</p>}</div>
              </li>
            ))}
          </ul>
          <ul id="selectionOptions">
            <li
              className="flexbox-container"
              onDragStart={this.dragstart_handler}
              onDragOver={this.onDragOverHandler}
              onDrop={this.drop_handler}
              // id={index}
              draggable="true"
            >
              <div>
                <label for="label">Label</label>
                <input
                  type="text"
                  id="si-label"
                  name="label"
                  class="text"
                  value={this.state.label}
                  onChange={this.change_handler}
                />
              </div>
              <div>
                <label for="value">Value</label>
                <input
                  type="text"
                  id="si-value"
                  name="value"
                  class="text"
                  onChange={this.change_handler}
                  value={this.state.value}
                  style={{
                    color: this.state.isValid ? 'black' : 'red',
                  }}
                />
              </div>
              <div>
                <button
                  id="addSi"
                  onClick={this.addOption_handler}
                  disabled={this.state.value !== '' && !this.state.isValid}
                >
                  +
                </button>
              </div>
              {this.state.isValid ? null : (
                <p style={{ color: 'red' }}>Invalid value - must be of type: {this.props.model.inputType()}</p>
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default _SelectionInputProperty;
