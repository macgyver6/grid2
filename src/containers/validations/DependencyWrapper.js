import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';
import { valUtility } from '../../validation/val.utility';
import { FormInput } from '../../data/FormInput';
import { _dataDefined, locals, inputDefinedValidator, validatorsByInput } from '../_validations';
import AppliedValidator from './AppliedValidator';
import { DependencyExpression } from './data/DependencyExpression';
import Validator from './data/Validator';
import { PatternValidator } from './data/PatternValidator';
import { sample } from './data/PatternValidator';
import DropToSelect from '../DropToSelect';
import ValidationWrapper from './ValidationWrapper';

class DependencyWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // failMsg: '',
      // failLocal: '',
      // failLang: '',
      // value: '',
      value: '',
      mode: 'add',
      currentValidator: null,
      nullIsValid: false,
      relativeInput: null,
      // currentIndex: '',
      // strong: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    // this.addFailureMessage = this.addFailureMessage.bind(this);
    this.allowSubmit = this.allowSubmit.bind(this);
    this.loadExistingValidator = this.loadExistingValidator.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.validationSelector_handler = this.validationSelector_handler.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const name = target.name;
    if (name === 'relativeInput') {
      const addressToAdd = address.byPath(this.props.form, JSON.parse(value));
      this.setState({
        relativeInput: addressToAdd,
      });
    } else if (name !== 'failMsg' && name !== 'failLang' && name !== 'failLocal' && name !== 'currentValidator') {
      this.setState({
        [name]: value,
      });
    } else if (name === 'currentValidator') {
      console.log({
        mode: 'add',
        [name]: value,
      });
      this.setState({
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

  allowSubmit() {
    if (
      this.state.failMsg !== '' &&
      this.state.failLocal !== '' &&
      this.state.failLang !== '' &&
      this.state.value !== ''
    ) {
      return false;
    } else if (
      this.state.failMsg === '' &&
      this.state.failLocal === '' &&
      this.state.failLang === '' &&
      this.state.value !== ''
    ) {
      return false;
    } else {
      return true;
    }
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
      new PatternValidator({ ...this.state, ...customFailureMessage() })
    );

    console.log(originalValidators);

    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      validations: originalValidators,
    });

    this.setState({
      ...this.getResetObj(this.state.currentValidator),
      mode: 'add',
      currentIndex: event.target.id,
    });
  }

  validationSelector_handler(event) {
    // return {
    //   validations: {
    //     ...this.props.model.validations(),
    //     [event.target.id]: event.target.value
    //   }
    // };
    console.log(this.props.model, this.props.form);
    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      ...this.props.model,
      [event.target.id]: event.target.value,
    });

    const resetObj = {
      failMsg: '',
      failLocal: '',
      failLang: '',
    };

    // console.log(
    //   address
    //     .hydrateValidator(this.props.model.currentValidator(), {
    //       type: this.props.model.currentValidator(),
    //     })
    //     .properties()
    // );

    // Object.keys(
    //   address
    //     .hydrateValidator(event.target.value, {
    //       type: event.target.value,
    //     })
    //     .properties()
    // ).forEach(property => (resetObj[property] = ''));
    this.setState({
      // resetObj,
      failMsg: '',
      failLocal: '',
      failLang: '',
      value: '',
      strong: '',
      nullIsValid: '',
      validState: '',
      mode: 'add',
    });
    console.log(
      address
        .hydrateValidator(event.target.value, {
          type: event.target.value,
          resetObj,
        })
        .properties()
    );
  }

  loadExistingValidator(event) {
    this.setState({
      mode: 'update',
      currentIndex: event.target.id,
      currentValidator: this.props.model.validations()[event.target.id].type(),
    });

    this.setState(this.props.model.validations()[event.target.id].properties());
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
    const newDependecyExpression = new DependencyExpression({
      type: 'type',
      operator: 'OR',
      conditions: [{ type: 'appliedValidator' }],
    });
    // const newDependecyExpression = new DependencyExpression('type', 'OR', [{ type: 'appliedValidator' }]);
    console.log(newDependecyExpression);

    // const sample2 = new PatternValidator({ type: 'Pattern' });
    // console.log(sample2);

    this.state.relativeInput
      ? typeof this.state.relativeInput.inputType === 'function'
        ? console.log(this.state.relativeInput.type())
        : null
      : null;

    return (
      <div>
        <p>{JSON.stringify(this.state)}</p>
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
          <h4>Dependencies Applied to this Field</h4>
          <ul>
            <li>
              Any of the following
              <ul>
                <li>a1 - Text Input Patient Age Range (min inclusive): 10 (max inclusive): 60</li>
                <li>a2 - Text Input Patient Gender Female</li>
              </ul>
            </li>
          </ul>

          {/* {this.props.model.validations().length > 0 ? (
                this.props.model.validations().map(validation => (
                  <li>
                    {this.props.model.inputType()} {validation.type()} {validation.value()}
                  </li>
                ))
              ) : (
                <li>None</li>
              )} */}
        </div>
        <h3>1. Select dependency input Operator</h3>
        <select
          name="currentOperator"
          value={this.state.currentOperator}
          onChange={this.handleChange}
          id="currentOperator"
        >
          <option>All</option>
          <option>Any</option>
          <option>Exactly One</option>
        </select>
        <h3>2. Select Entity to Apply Dependency To (implement eye-dropper - future)</h3>
        <select
          className="form-control"
          name="relativeInput"
          type={this.props.model.type()}
          value={this.state.relativeInput}
          onChange={this.handleChange}
          id="validationSelector"
          // style={inputStyle(this.props.model)}
        >
          {valUtility
            .findAll(this.props.form, e => e instanceof FormInput)
            .map(formInput => (
              <option
                value={JSON.stringify(address.bySample(formInput, this.props.form))}
              >{`${formInput.externalIdentifier()} - ${formInput.type()}`}</option>
            ))}
        </select>

        <br />
        <DropToSelect form={this.props.form} model={this.props.model} />
        {/* <select
            className="form-control"
            name="dependency-selection"
            type={this.props.model.type()}
            // value={this.props.model.sourceInput()}
            onChange={change_handler}
            id="sourceInput"
          >
            {valUtility
              .findAll(this.props.form, e => e instanceof FormInput)
              .map(formInput => (
                <option value={formInput.promptNumber()}>{`${formInput.promptNumber()} - ${formInput.type()}`}</option>
              ))}
          </select> */}
        <h3>3. Select validator to apply</h3>
        <select
          value={this.state.currentValidator}
          className="form-control"
          name="currentValidator"
          onChange={this.handleChange}
          id="currentValidator"
        >
          {console.log(validatorsByInput)}
          {this.state.relativeInput
            ? this.state.relativeInput.type() === 'TextInput' ||
              this.state.relativeInput.type() === 'SelectionInput' ||
              this.state.relativeInput.type() === 'Echo'
              ? _dataDefined[`${this.state.relativeInput.inputType()}`].userDefined.map(userDefinedVal => (
                  <option value={userDefinedVal}>{address.getHumanValidatorName(userDefinedVal)}</option>
                ))
              : validatorsByInput.Any.map(validator => (
                  <option value={validator}>{address.getHumanValidatorName(validator)}</option>
                ))
            : null}
          {/* {this.state.relativeInput
            ? _dataDefined[`${this.props.model.inputType()}`].userDefined.map(userDefinedVal => (
                <option value={userDefinedVal}>{address.getHumanValidatorName(userDefinedVal)}</option>
              ))
            : inputDefinedValidator[`${this.props.model.type()}`].map(userDefinedVal => (
                <option value={userDefinedVal}>{address.getHumanValidatorName(userDefinedVal)}</option>
              ))} */}
        </select>
        <h3>4. Configure validator</h3>
        <div id="validation">
          {this.state.currentValidator
            ? React.createElement(address.whichValidationComponent(this.state.currentValidator), {
                model: this.state.relativeInput,
                form: this.props.form,
                currententity: this.props.currententity,
                mutate: this.props.mutate,
                appState: this.props.appState,
                temporalStateChange: this.props.temporalStateChange,

                handleChange: this.handleChange,
                handleSubmit: this.handleSubmit,
                handleAdd: this.handleAdd,
                // addFailureMessage: this.addFailureMessage,
                allowSubmit: this.allowSubmit,
                loadExistingValidator: this.loadExistingValidator,
                handleUpdate: this.handleUpdate,
                // mode: this.state.mode,
                // currentIndex: this.state.currentIndex,

                failMsg: this.state.failMsg,
                failLocal: this.state.failLocal,
                failLang: this.state.failLang,
                value: this.state.value,
                mode: this.state.mode,
                currentIndex: this.state.currentIndex,
                validState: this.state.validState,
                strong: this.state.strong,
                nullIsValid: this.state.nullIsValid,
                failureMode: this.props.failureMode ? this.props.failureMode : 'dependency',
              })
            : null}
        </div>
      </div>
    );
  }
}

export default DependencyWrapper;
