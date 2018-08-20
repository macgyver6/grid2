import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';
import { valUtility } from '../../validation/val.utility';
import { FormInput } from '../../data/FormInput';
import { _dataDefined, locals, inputDefinedValidator } from '../_validations';
import AppliedValidator from './AppliedValidator';
import { PatternValidator } from './data/PatternValidator';

class ValidationWrapper extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.model.inputType);
    this.state = {
      // failMsg: '',
      // failLocal: '',
      // failLang: '',
      properties: {
        name: '',
        value: '',
      },
      mode: 'add',
      currentValidator: null,
      nullIsValid: false,
      // currentIndex: '',
      // strong: null,
    };

    this.handleStateSet = this.handleStateSet.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    // this.addFailureMessage = this.addFailureMessage.bind(this);
    this.allowSubmit = this.allowSubmit.bind(this);
    this.loadExistingValidator = this.loadExistingValidator.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getResetObj = this.getResetObj.bind(this);
  }

  handleStateSet(event) {
    console.log(event.target);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const id = target.id;
    if (name === 'properties') {
      console.log({
        properties: {
          ...this.state.properties,
          [id]: value,
        },
      });
      this.setState(prevState => ({
        properties: {
          ...prevState.properties,
          [id]: value,
        },
      }));
    } else if (name !== 'failMsg' && name !== 'failLang' && name !== 'failLocal' && name !== 'currentValidator') {
      this.setState({
        [name]: value,
      });
    } else if (name === 'currentValidator') {
      this.setState({
        ...this.getResetObj(value),
        mode: 'add',
        [name]: value,
      });
    } else {
      this.setState({
        customFailureMessage: {
          ...this.state.customFailureMessage,
          [name]: value,
        },
      });
    }
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  handleAdd(event) {
    event.stopPropagation();
    event.preventDefault();

    const customFailureMessage = () =>
      this.state.customFailureMessage.failMsg !== '' &&
      this.state.customFailureMessage.failLocal !== '' &&
      this.state.customFailureMessage.failLang !== ''
        ? {
            customFailureMessage:
              // ...this.state.customFailureMessage,
              {
                failMsg: this.state.customFailureMessage.failMsg,
                failLocal: this.state.customFailureMessage.failLocal,
                failLang: this.state.customFailureMessage.failLang,
              },
          }
        : { customFailureMessage: '' };
    console.log(
      address.hydrateValidator(this.state.currentValidator, {
        ...this.state,
        ...customFailureMessage(),
        type: this.state.currentValidator,
      })
    );
    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      validations: [
        ...this.props.model.validations(),
        address.hydrateValidator(this.state.currentValidator, {
          ...this.state,
          ...customFailureMessage(),
          type: this.state.currentValidator,
        }),
      ],
    });

    this.setState(this.getResetObj(this.state.currentValidator));
  }

  getResetObj(validatorType) {
    const resetObj = {
      customFailureMessage: {
        failMsg: '',
        failLocal: '',
        failLang: '',
      },
    };

    Object.keys(
      address
        .hydrateValidator(validatorType, {
          type: validatorType,
        })
        .properties()
    ).forEach(
      property =>
        property !== 'customFailureMessage'
          ? (resetObj[property] = '')
          : (resetObj['customFailureMessage'] = {
              failMsg: '',
              failLocal: '',
              failLang: '',
            })
    );
    resetObj['properties'] = { name: '', value: '' };
    resetObj['nullIsValid'] = false;
    resetObj['validState'] = false;
    resetObj['strong'] = false;
    return resetObj;
  }

  allowSubmit() {
    // if (
    //   this.state.failMsg !== '' &&
    //   this.state.failLocal !== '' &&
    //   this.state.failLang !== '' &&
    //   this.state.value !== ''
    // ) {
    //   return false;
    // } else if (
    //   this.state.failMsg === '' &&
    //   this.state.failLocal === '' &&
    //   this.state.failLang === '' &&
    //   this.state.value !== ''
    // ) {
    //   return false;
    // } else {
    //   return true;
    // }
    return false;
  }

  loadExistingValidator(event) {
    this.setState({
      mode: 'update',
      currentIndex: event.target.id,
      currentValidator: this.props.model.validations()[event.target.id].type(),
    });

    this.setState(this.props.model.validations()[event.target.id].properties());
  }

  handleUpdate(event) {
    event.preventDefault();
    console.log(this.state);
    const index = this.state.currentIndex;
    const originalValidators = [...this.props.model.validations()];

    const customFailureMessage = () =>
      this.state.customFailureMessage.failMsg !== '' &&
      this.state.customFailureMessage.failLocal !== '' &&
      this.state.customFailureMessage.failLang !== ''
        ? {
            customFailureMessage:
              // ...this.state.customFailureMessage.customFailureMessage,
              {
                failMsg: this.state.customFailureMessage.failMsg,
                failLocal: this.state.customFailureMessage.failLocal,
                failLang: this.state.customFailureMessage.failLang,
              },
          }
        : { customFailureMessage: '' };

    originalValidators.splice(
      this.state.currentIndex,
      1,
      // ...this.props.model.validations(),
      address.hydrateValidator(this.props.model.validations()[this.state.currentIndex].type(), {
        ...this.state,
        ...customFailureMessage(),
      })
    );

    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      validations: originalValidators,
    });

    this.setState({
      ...this.getResetObj(this.state.currentValidator),
      mode: 'add',
      currentIndex: event.target.id,
    });
  }

  handleDelete(event) {
    event.preventDefault();
    console.log(this.state);
    const index = this.state.currentIndex;
    const originalValidators = [...this.props.model.validations()];

    originalValidators.splice(this.state.currentIndex, 1);

    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      validations: originalValidators,
    });
    this.setState({ ...this.getResetObj(this.state.currentValidator), mode: 'add' });
  }

  render() {
    const getBadge = validatorType => {
      if (validatorType === 'PatternValidator') {
        return <span className="badge badge-primary">{address.getHumanValidatorName(validatorType)}</span>;
      } else if (validatorType === 'NoOpValidator') {
        return <span className="badge badge-danger">{address.getHumanValidatorName(validatorType)}</span>;
      } else if (validatorType === 'EnumerationValidator') {
        return <span className="badge badge-success">{address.getHumanValidatorName(validatorType)}</span>;
      } else if (validatorType === 'RangeValidator') {
        return <span className="badge badge-light">{address.getHumanValidatorName(validatorType)}</span>;
      } else if (validatorType === 'SubjectInputValidator') {
        return <span className="badge badge-info">{address.getHumanValidatorName(validatorType)}</span>;
      }
    };
    const getDataTypeBadge = validatorType => <span className="badge badge-primary">{validatorType}</span>;
    return (
      <div>
        <div
          style={{
            margin: '20px',
            padding: '4px',
            minHeight: '60px',
            width: '80%',
            border: 'solid black 1px',
            background: 'orange',
          }}
        >
          {/* {JSON.stringify(this.props.model.validations())} */}
          <h4>Validations Applied to this Field</h4>
          <ul>
            {this.props.model.validations().length > 0 ? (
              this.props.model.validations().map((validation, index) => (
                <li>
                  {getBadge(validation.type())}
                  {` `}
                  {`${typeof validation.value === 'function' ? validation.value() : ''}`}
                  {` `}
                  <span id={index} onClick={this.loadExistingValidator}>
                    ✏️
                  </span>
                  {'        '}
                  <i className="far fa-trash-alt" style={{ color: 'red' }} id={index} onClick={this.handleDelete} />
                  {/* <span id={index} onClick={this.handleDelete}>
                    🗑️
                  </span> */}
                </li>
              ))
            ) : (
              <li>No validations on this field exist</li>
            )}
          </ul>
        </div>
        <select
          value={this.state.currentValidator}
          className="form-control"
          name="currentValidator"
          onChange={this.handleStateSet}
          id="currentValidator"
        >
          <option selected value>
            {' '}
            -- select a validator --{' '}
          </option>
          {typeof this.props.model.inputType === 'function'
            ? _dataDefined[`${this.props.model.inputType()}`].userDefined.map(userDefinedVal => (
                <option value={userDefinedVal}>{address.getHumanValidatorName(userDefinedVal)}</option>
              ))
            : inputDefinedValidator[`${this.props.model.type()}`].map(userDefinedVal => (
                <option value={userDefinedVal}>{address.getHumanValidatorName(userDefinedVal)}</option>
              ))}
        </select>

        <form>
          {/* <form onSubmit={this.handleSubmit}> */}
          <div id="validation">
            {this.state.currentValidator
              ? React.createElement(address.whichValidationComponent(this.state.currentValidator), {
                  properties: this.state.properties,
                  model: address.byPath(this.props.form, this.props.currententity),
                  form: this.props.form,
                  currententity: this.props.currententity,
                  mutate: this.props.mutate,
                  appState: this.props.appState,
                  temporalStateChange: this.props.temporalStateChange,
                  handleStateSet: this.handleStateSet,
                  handleSubmit: this.handleSubmit,
                  handleAdd: this.handleAdd,
                  allowSubmit: this.allowSubmit,
                  loadExistingValidator: this.loadExistingValidator,
                  handleUpdate: this.handleUpdate,
                  failMsg: this.state.failMsg,
                  failLocal: this.state.failLocal,
                  failLang: this.state.failLang,
                  mode: this.state.mode,
                  currentIndex: this.state.currentIndex,
                  validState: this.state.validState,
                  strong: this.state.strong,
                  nullIsValid: this.state.nullIsValid,
                  customFailureMessage: this.state.customFailureMessage,
                  failureMode: this.props.failureMode ? this.props.failureMode : 'validation',
                })
              : null}
          </div>
        </form>
      </div>
    );
  }
}

export default ValidationWrapper;
