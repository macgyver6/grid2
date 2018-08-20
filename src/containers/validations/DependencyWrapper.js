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
import JSONPretty from 'react-json-pretty';
import { getBadge } from './ValidationWrapper';

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
      nullIsValid: false,
      relativeInput: null,
      // currentIndex: '',
      // strong: true,
      currentValidator: null,
      currentInput: null,
      conditions: [],
    };

    this.handleStateSet = this.handleStateSet.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddValidator = this.handleAddValidator.bind(this);
    // this.addFailureMessage = this.addFailureMessage.bind(this);
    this.allowSubmit = this.allowSubmit.bind(this);
    this.loadExistingValidator = this.loadExistingValidator.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.validationSelector_handler = this.validationSelector_handler.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getResetObj = this.getResetObj.bind(this);
    this.allowSubmit = this.allowSubmit.bind(this);
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

  handleStateSet(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(event.target.name, event.target.value);
    const name = target.name;
    const id = target.id;
    if (name === 'properties') {
      this.setState(prevState => ({
        properties: {
          ...prevState.properties,
          [id]: value,
        },
      }));
    } else if (name === 'relativeInput') {
      const addressToAdd = address.byPath(this.props.form, JSON.parse(value));
      this.setState({
        relativeInput: addressToAdd,
        relativeEntity: value,
      });
    } else if (name !== 'failMsg' && name !== 'failLang' && name !== 'failLocal' && name !== 'currentValidator') {
      this.setState({
        [name]: value,
      });
    } else if (name === 'currentValidator') {
      console.log({
        ...this.getResetObj(value),
        mode: 'add',
        [name]: value,
      });
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

    const dependencyToAdd = {
      dependencies: [
        ...this.props.model.dependencies(),
        new DependencyExpression({
          operator: this.state.currentOperator,
          conditions: this.state.conditions,
          // ...customFailureMessage(),
          // type: this.state.currentValidator,
        }),
      ],
    };

    console.log(this.props.model.dependencies());
    console.log(dependencyToAdd);

    // this.props.mutate(address.bySample(this.props.model, this.props.form), dependencyToAdd);

    this.setState(this.getResetObj(this.state.currentValidator));
  }

  handleAddValidator(event) {
    event.stopPropagation();
    event.preventDefault();

    const resultingConditions = [
      ...this.state.conditions,
      address.hydrateValidator(this.state.currentValidator, {
        properties: this.state.properties,
        validState: this.state.validState,
        strong: this.state.strong,
        nullIsValid: this.state.nullIsValid,
      }),
    ];
    this.setState({ ...this.getResetObj(this.state.currentValidator), conditions: resultingConditions });
  }

  handleUpdate(event) {
    event.preventDefault();
    console.log(this.state);
    const index = this.state.currentIndex;
    const originalConditions = [...this.state.conditions];

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
    originalConditions.splice(
      this.state.currentIndex,
      1,
      // ...this.props.model.validations(),
      address.hydrateValidator(this.state.currentValidator, {
        ...this.state,
      })
    );

    this.setState({
      ...this.getResetObj(this.state.currentValidator),
      mode: 'add',
      // currentIndex: event.target.id,
      conditions: originalConditions,
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
      currentValidator: this.state.conditions[event.target.id].type(),
    });

    this.setState(this.state.conditions[event.target.id].properties());
  }

  handleDelete(event) {
    event.preventDefault();
    console.log(this.state);
    const originalConditions = [...this.state.conditions];

    originalConditions.splice(this.state.currentIndex, 1);

    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      validations: originalConditions,
    });
    this.setState({ ...this.getResetObj(this.state.currentValidator), mode: 'add', conditions: originalConditions });
  }

  render() {
    const newDependecyExpression = new DependencyExpression({
      type: 'type',
      operator: 'OR',
      conditions: [{ type: 'ValidationWrapper' }],
    });
    // const newDependecyExpression = new DependencyExpression('type', 'OR', [{ type: 'appliedValidator' }]);
    console.log(newDependecyExpression);

    // const sample2 = new PatternValidator({ type: 'Pattern' });
    // console.log(sample2);

    // this.state.relativeInput
    //   ? typeof this.state.relativeInput.inputType === 'function'
    //     ? console.log(this.state.relativeInput.type())
    //     : null
    //   : null;

    return (
      <div>
        <JSONPretty id="json-pretty" json={JSON.stringify(this.state)} />
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
          <h4>Inputs this Input is Dependent Upon</h4>
          <ul>
            <li>
              Any of the following
              <ul>
                <li>a1 - Text Input Patient Age Range (min inclusive): 10 (max inclusive): 60</li>
                <li>a2 - Text Input Patient Gender Female</li>
              </ul>
            </li>
          </ul>
        </div>
        <h3>1. Select dependency input Operator</h3>
        <select
          name="currentOperator"
          value={this.state.currentOperator}
          onChange={this.handleStateSet}
          id="currentOperator"
        >
          <option>All</option>
          <option>Any</option>
          <option>Exactly One</option>
        </select>
        <h3>2. Select Entity to Apply Dependency To</h3>
        <select
          className="form-control"
          name="relativeInput"
          type={this.props.model.type()}
          value={this.state.relativeEntity}
          onChange={this.handleStateSet}
          id="validationSelector"
          // style={inputStyle(this.props.model)}
        >
          {valUtility.findAll(this.props.form, e => e instanceof FormInput && e !== this.props.model).map(formInput => (
            <option value={JSON.stringify(address.bySample(formInput, this.props.form))}>
              {/* ${formInput.externalIdentifier()} - */}
              {`
               ${formInput.type()}`}
            </option>
          ))}
        </select>

        <br />
        {/* <DropToSelect form={this.props.form} model={this.props.model} /> */}

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
          <h4>Validators currently added</h4>
          <ul>
            {this.state.conditions.length ? (
              this.state.conditions.map((validation, index) => (
                <li>
                  {/* {validation.type()} {validation.getProperties().value} */}

                  {getBadge(validation.type())}
                  {` `}
                  {`${typeof validation.getProperties === 'function' ? validation.getProperties().value : ''}`}
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
              <li>None</li>
            )}
          </ul>
        </div>

        <h3>3. Select validator to apply</h3>
        <select
          value={this.state.currentValidator}
          className="form-control"
          name="currentValidator"
          onChange={this.handleStateSet}
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

                handleStateSet: this.handleStateSet,
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
                properties: this.state.properties,
                mode: this.state.mode,
                currentIndex: this.state.currentIndex,
                validState: this.state.validState,
                strong: this.state.strong,
                nullIsValid: this.state.nullIsValid,
                failureMode: this.props.failureMode ? this.props.failureMode : 'dependency',
                addType: 'addValToDep',
              })
            : null}
          <p>
            {this.state.mode === 'add' ? (
              <button disabled={this.allowSubmit()} onClick={this.handleAddValidator}>
                Add Validator
              </button>
            ) : (
              <button value={this.state.currentValidator} onClick={this.handleUpdate}>
                Update
              </button>
            )}

            <button disabled={this.allowSubmit()} onClick={this.handleAdd}>
              Add Dependency
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default DependencyWrapper;
