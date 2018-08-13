import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';
import { utility } from '../../validation/val.utility';
import { FormInput } from '../../data/FormInput';
import { _dataDefined, locals } from '../_validations';
import AppliedValidator from './AppliedValidator';
import { PatternValidator } from './data/PatternValidator';

class ValidationWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // failMsg: '',
      // failLocal: '',
      // failLang: '',
      value: '',
      mode: 'add',
      currentValidator: _dataDefined[`${this.props.model.inputType()}`].userDefined[0],
      customFailureMessage: { failMsg: null, failLang: null, failLocal: null },
      nullIsValid: false,
      // currentIndex: '',
      // strong: null,
    };

    // Object.keys(
    //   address
    //     .hydrateValidator(this.state.currentValidator || 'Pattern', { type: 'PatternValidator' })
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
    this.getResetObj = this.getResetObj.bind(this);
  }

  // const change_handler = event => {   return
  // props.mutate(address.bySample(props.model, props.form), {     validations: {
  //   ...props.model.validations(),       [event.target.id]: event.target.value,
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
    if (name !== 'failMsg' && name !== 'failLang' && name !== 'failLocal' && name !== 'currentValidator') {
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
    return resetObj;
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
    console.log(this.props.model.validations()[event.target.id].type());
    this.setState({
      mode: 'update',
      currentIndex: event.target.id,
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
    // const test = Object.keys(this.props.model.validations()[event.target.id].properties()).map(value => ({
    //   [`${value}`]: this.props.model.validations()[event.target.id][`${value}`](),
    // }));

    this.setState(this.props.model.validations()[event.target.id].properties());

    // this.props.model.validations()[event.target.id].properties()['customFailureMessage'] !== ''
    //   ? Object.keys(this.props.model.validations()[event.target.id].properties()['customFailureMessage']).forEach(
    //       value =>
    //         this.setState({
    //           [`${value}`]: this.props.model.validations()[event.target.id].properties()['customFailureMessage'][
    //             `${value}`
    //           ],
    //         })
    //     )
    //   : null;
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
    //     ...props.model.validations(),
    //     [event.target.id]: event.target.value
    //   }
    // };
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
    //     .hydrateValidator(this.state.currentValidator, {
    //       type: this.state.currentValidator,
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
    this.setState({ ...this.getResetObj(this.state.currentValidator), mode: 'add' });
  }

  render() {
    const getBadge = validatorType => {
      console.log(address.getHumanValidatorName(validatorType));
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
                  {getDataTypeBadge(this.props.model.inputType())}
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
          onChange={this.handleChange}
          id="currentValidator"
        >
          {/* <option selected value>
              {' '}
              -- select an option --{' '}
      </option> */}
          {_dataDefined[`${this.props.model.inputType()}`].userDefined.map(userDefinedVal => (
            <option value={userDefinedVal}>{address.getHumanValidatorName(userDefinedVal)}</option>
          ))}
        </select>

        <form>
          {/* <form onSubmit={this.handleSubmit}> */}
          <div id="validation">
            {this.state.currentValidator
              ? React.createElement(address.whichValidationComponent(this.state.currentValidator), {
                  value: this.state.value,
                  model: address.byPath(this.props.form, this.props.currententity),
                  form: this.props.form,
                  currententity: this.props.currententity,
                  mutate: this.props.mutate,
                  appState: this.props.appState,
                  temporalStateChange: this.props.temporalStateChange,
                  handleChange: this.handleChange,
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
