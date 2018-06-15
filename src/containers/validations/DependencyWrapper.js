import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';
import { utility } from '../../validation/val.utility';
import { FormInput } from '../../data/FormInput';
import { _dataDefined, locals } from '../_validations';
import AppliedValidator from './AppliedValidator';
import { PatternValidator } from './data/PatternValidator';
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
      mode: 'add',
      // currentIndex: '',
      // strong: true,
    };

    // Object.keys(
    //   address
    //     .hydrateValidator(this.props.model.currentValidator() || 'Pattern', { type: 'PatternValidator' })
    //     .properties()
    // ).forEach(property => (this.state[property] = ''));
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

  // const change_handler = event => {   return
  // this.props.mutate(address.bySample(this.props.model, this.props.form), {     validations: {
  //   ...this.props.model.validations(),       [event.target.id]: event.target.value,
  //    },   }); };
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    // switch (target) {
    //   case target.type === 'checkbox':
    //     return target.checked;
    //     break;
    //   // case target.id === 'customFailureMessage':
    //   //   [...state.customFailureMessage, { message: 'test2', language: 'spansh' }]
    //   //   return [this.state.customFailtureMessages, target.value];
    //   //   break;
    //   default:
    //     return target.value;
    // }

    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  handleAdd(event) {
    event.stopPropagation();
    event.preventDefault();

    const customFailureMessage = () =>
      this.state.failMsg !== '' && this.state.failLocal !== '' && this.state.failLang !== ''
        ? {
            customFailureMessage:
              // ...this.state.customFailureMessage,
              {
                failMsg: this.state.failMsg,
                failLocal: this.state.failLocal,
                failLang: this.state.failLang,
              },
          }
        : { customFailureMessage: '' };

    // console.log(
    //   address.hydrateValidator(this.props.model.currentValidator(), {...this.state, type: this.props.model.currentValidator(), customFailureMessage })
    // );

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

    const resetObj = {
      failMsg: '',
      failLocal: '',
      failLang: '',
    };

    Object.keys(new PatternValidator({ type: 'PatternValidator' }).properties()).forEach(
      property => (resetObj[property] = '')
    );
    this.setState(resetObj);
  }

  // addFailureMessage(event) {
  //   //  case target.id === 'customFailureMessage':
  //   //     [...state.customFailureMessage, { message: 'test2', language: 'spansh' }]
  //   //     return [this.state.customFailtureMessages, target.value];
  //   //     break;

  //   this.setState({
  //     customFailureMessage: {
  //       failMsg: this.state._failMsg,
  //       failLocal: this.state._failLocal,
  //       failLang: this.state._failLang,
  //     },

  //     // _failMsg: '',
  //     // _failLocal: '',
  //     // _failLang: '',
  //   });

  //   // this.setState({
  //   //   customFailureMessage: [
  //   //     ...this.state.customFailureMessage,
  //   //     {
  //   //       [this.state._failMsg]: this.state._failMsg,
  //   //       [this.state._failLocal]: this.state._failLocal,
  //   //       [this.state._failLang]: this.state._failLang,
  //   //     },
  //   //   ],
  //   // });
  //   // event.preventDefault();
  // }

  edit_fail(failMsg) {
    const fail_set = this.props.model.validations().filter(element => element.failMsg === 'yolo');
    console.log(fail_set);
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

  loadExistingValidator(event) {
    this.setState({
      mode: 'update',
      currentIndex: event.target.id,
    });
    console.log(this.props.model.validations()[event.target.id].type());
    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      // ...this.props.model,
      currentValidator: this.props.model.validations()[event.target.id].type(),
    });

    const flattenObject = function(ob) {
      var toReturn = {};

      for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if (typeof ob[i] == 'object') {
          var flatObject = flattenObject(ob[i]);
          for (var x in flatObject) {
            if (!flatObject.hasOwnProperty(x)) continue;

            toReturn[i + '.' + x] = flatObject[x];
          }
        } else {
          toReturn[i] = ob[i];
        }
      }
      return toReturn;
    };

    // Object.keys(new PatternValidator({ type: 'PatternValidator' }).properties()).forEach(
    //   property => (this.state[property] = '')
    // );
    Object.keys(this.props.model.validations()[event.target.id].properties()).forEach(value =>
      this.setState({
        [`${value}`]: this.props.model.validations()[event.target.id].properties()[`${value}`],
      })
    );

    this.props.model.validations()[event.target.id].properties()['customFailureMessage'] !== ''
      ? Object.keys(this.props.model.validations()[event.target.id].properties()['customFailureMessage']).forEach(
          value =>
            this.setState({
              [`${value}`]: this.props.model.validations()[event.target.id].properties()['customFailureMessage'][
                `${value}`
              ],
            })
        )
      : null;
  }

  handleUpdate(event) {
    event.preventDefault();
    console.log(this.state);
    const index = this.state.currentIndex;
    const originalValidators = [...this.props.model.validations()];
    // months.splice(4, 1, 'May');
    // replaces 1 element at 4th index

    const customFailureMessage = () =>
      this.state.failMsg !== '' && this.state.failLocal !== '' && this.state.failLang !== ''
        ? {
            customFailureMessage:
              // ...this.state.customFailureMessage,
              {
                failMsg: this.state.failMsg,
                failLocal: this.state.failLocal,
                failLang: this.state.failLang,
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

    const resetObj = {
      failMsg: '',
      failLocal: '',
      failLang: '',
    };

    Object.keys(
      address
        .hydrateValidator(this.state.currentValidator(), {
          ...this.state,
          ...customFailureMessage(),
          type: this.state.currentValidator,
        })
        .properties()
    ).forEach(property => (resetObj[property] = ''));
    this.setState({
      resetObj,
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

  handleDelete(event) {
    event.preventDefault();
    console.log(this.state);
    const index = this.state.currentIndex;
    const originalValidators = [...this.props.model.validations()];

    // const customFailureMessage = () =>
    //   this.state.failMsg !== '' && this.state.failLocal !== '' && this.state.failLang !== ''
    //     ? {
    //       customFailureMessage:
    //         // ...this.state.customFailureMessage,
    //         {
    //           failMsg: this.state.failMsg,
    //           failLocal: this.state.failLocal,
    //           failLang: this.state.failLang,
    //         },
    //     }
    //     : { customFailureMessage: '' };

    originalValidators.splice(this.state.currentIndex, 1);

    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      validations: originalValidators,
    });

    const resetObj = {
      failMsg: '',
      failLocal: '',
      failLang: '',
    };

    // Object.keys(new PatternValidator({ type: 'PatternValidator' }).properties()).forEach(
    //   property => (resetObj[property] = '')
    // );
    // this.setState({
    //   resetObj,
    //   mode: 'add',
    //   currentIndex: event.target.id,
    // });
  }

  render() {
    // if (this.state._failMsg !== '' && this.state._failLocal !== '' && this.state._failLang !== '') {
    //   this.addFailureMessage();
    // }
    // console.log(address.hydrateValidator('Pattern'));

    return (
      <div>
        <h3>Configure dependencies here</h3>
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
        <select>
          <option>All</option>
          <option>Any</option>
          <option>Exactly One</option>
        </select>
        <h3>2. Select Entity to Apply Dependency To (implement eye-dropper - future)</h3>
        <select
          className="form-control"
          name="validationSelector"
          type={this.props.model.type()}
          value={this.state.validationSelector}
          onChange={this.handleChange}
          id="validationSelector"
          // style={inputStyle(this.props.model)}
        >
          {utility
            .findAll(this.props.form, e => e instanceof FormInput)
            .map(formInput => (
              <option
                value={JSON.stringify(address.bySample(this.props.model, this.props.form))}
              >{`${formInput.externalIdentifier()} - ${formInput.type()} - ${formInput.inputType()}`}</option>
            ))}
        </select>
        {/* {console.log(
          this.state.validationSelector
            ? address.byPath(this.state.validationSelector, this.props.form).inputType()
            : null
        )} */}
        {/* {console.log(
          this.state.validationSelector
            ? _dataDefined[address.byPath(this.props.form, this.state.validationSelector).inputType()]
            : null
        )} */}
        {/* {console.log(this.state.validationSelector)} */}
        {/* <p>{this.state.validationSelector}</p> */}
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
            {utility
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
          {/* <option selected value>
              {' '}
              -- select an option --{' '}
      </option> */}

          {this.state.validationSelector
            ? _dataDefined[
                address.byPath(this.props.form, JSON.parse(this.state.validationSelector)).inputType()
              ].userDefined.map(userDefinedVal => (
                <option value={userDefinedVal}>{address.getHumanValidatorName(userDefinedVal)}</option>
              ))
            : null}
        </select>
        <h3>4. Configure validator</h3>
        <div id="validation">
          {this.state.currentValidator
            ? React.createElement(address.whichValidationComponent(this.state.currentValidator), {
                model: address.byPath(this.props.form, JSON.parse(this.state.validationSelector)),
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
