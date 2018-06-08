import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';
import { utility } from '../../validation/val.utility';
import { FormInput } from '../../data/FormInput';
import { _dataDefined, locals } from '../_validations';
import AppliedValidator from './AppliedValidator';
import { PatternValidator } from './data/PatternValidator';

class PatternValidation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _failMsg: '',
      _failLocal: '',
      _failLang: '',
    };
    Object.keys(new PatternValidator({ type: 'PatternValidator' }).properties()).forEach(
      property => (this.state[property] = '')
    );
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.addFailureMessage = this.addFailureMessage.bind(this);
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
    console.log(this.props.model.validations());
    const test = Object.keys(this.state).map(property => ({ [property]: this.state[property] }));
    console.log(test);

    console.log([...this.props.model.validations(), new PatternValidator(this.state)][0].value());

    // alert('A pattern was submitted: ' + this.validationPattern.value);
    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      validations: [...this.props.model.validations(), new PatternValidator(this.state)],
    });

    const resetObj = {
      _failMsg: '',
      _failLocal: '',
      _failLang: '',
    };

    Object.keys(new PatternValidator({ type: 'PatternValidator' }).properties()).forEach(
      property => (resetObj[property] = '')
    );
    this.setState(resetObj);
  }

  addFailureMessage(event) {
    //  case target.id === 'customFailureMessage':
    //     [...state.customFailureMessage, { message: 'test2', language: 'spansh' }]
    //     return [this.state.customFailtureMessages, target.value];
    //     break;
    this.setState({
      customFailureMessage: [
        ...this.state.customFailureMessage,
        {
          failMsg: this.state._failMsg,
          failLocal: this.state._failLocal,
          failLang: this.state._failLang,
        },
      ],
      _failMsg: '',
      _failLocal: '',
      _failLang: '',
    });

    // this.setState({
    //   customFailureMessage: [
    //     ...this.state.customFailureMessage,
    //     {
    //       [this.state._failMsg]: this.state._failMsg,
    //       [this.state._failLocal]: this.state._failLocal,
    //       [this.state._failLang]: this.state._failLang,
    //     },
    //   ],
    // });
    event.preventDefault();
  }

  //    this.state = {
  //   value: '',
  //   validationPattern: '',
  //   validState: false,
  // };
  render() {
    const test = {};

    // Object.keys(new PatternValidator({ validState: 'test', validationPattern: 'test' }).properties()).forEach(
    //   property => (test[property] = '')
    // );
    console.log(test);
    return (
      <div>
        <form>
          {/* <form onSubmit={this.handleSubmit}> */}
          <div id="validation">
            <br />
            <label>
              Validation Pattern:
              <input
                type="text"
                size="25"
                name="value"
                id="value"
                onChange={this.handleChange}
                value={this.state.value}
              />
            </label>
            <div>
              <div id="edu_unc_tcrdms_model_form_validation_validators_PatternValidator">
                {/* begin AppliedValidator*/}
                <div>
                  <div>
                    <p>
                      <label for="validationPattern">Validation Pattern:</label>
                      <br />
                      <input
                        type="checkbox"
                        name="validState"
                        checked={this.state.validState}
                        onChange={this.handleChange}
                        // checked={props.model.validations().defaultUserVal.Pattern.validState}
                        id="validState"
                      />
                      <label for="validState-pattern">
                        If checked values matching the (pattern, values, range) above satisfy the condition.
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        name="nullIsValid"
                        checked={this.state.nullIsValid}
                        onChange={this.handleChange}
                        // checked={props.model.validations().defaultUserVal.Pattern.nullIsValid}
                        // id="nullIsValid-pattern"
                      />
                      <label for="nullIsValid-pattern">
                        If checked blank values are included in the list of values that satisfy the condition.
                      </label>
                      <br />
                      <input
                        type="checkbox"
                        name="strong"
                        id="strong-pattern"
                        checked={this.state.strong}
                        onChange={this.handleChange}

                        // checked={props.model.validations().defaultUserVal.Pattern.strong}
                      />
                      <label for="strong-pattern">Cannot be overridden</label>
                    </p>
                  </div>
                  <div style={{ border: '1px solid blue' }}>
                    <label for="_failMsg-pattern">
                      <span>*</span>
                      Custom failure message (optional):
                    </label>
                    <br />
                    <textarea name="_failMsg" id="_failMsg" onChange={this.handleChange} value={this.state._failMsg} />
                    <br />
                    <label for="_failLang">
                      <span>*</span>
                      Language
                    </label>
                    <select name="_failLang" id="_failLang" onChange={this.handleChange} value={this.state._failLang}>
                      {locals.map(local => <option>{local}</option>)}
                    </select>
                    <label for="_failLocal">Country</label>
                    <select
                      name="_failLocal"
                      id="_failLocal"
                      onChange={this.handleChange}
                      value={this.state._failLocal}
                    >
                      <option>Brazil</option>
                      <option>Chile</option>
                    </select>
                    <br />
                    {this.state._failMsg !== '' && this.state._failLocal !== '' && this.state._failLang !== '' ? (
                      <p onMouseDown={this.addFailureMessage}>Add message</p>
                    ) : (
                      'To add message, complete all 3 fields'
                    )}
                    <br />
                    {/* <button>Update Message</button> */}
                    <div />
                    <br />
                    <div
                      style={{ minHeight: '60px', width: '90%', border: 'solid black 1px', background: 'lightblue' }}
                    >
                      <ul>
                        {this.state.customFailureMessage.length > 0 ? (
                          this.state.customFailureMessage.map(message => (
                            <li>
                              {message.failMsg} {message.failLocal} {message.failLang}
                            </li>
                          ))
                        ) : (
                          <p>Map through and render all messages</p>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* end AppliedValidator*/}
              </div>
            </div>
            <div id="validators">
              <ul />
            </div>
          </div>
          <p>
            <button value="PatternValidator" onClick={this.handleAdd}>
              Add
            </button>
            <button value="PatternValidator">Update</button>
          </p>
          <div style={{ minHeight: '60px', width: '90%', border: 'solid black 1px', background: 'orange' }}>
            {/* {JSON.stringify(this.props.model.validations())} */}
            <ul>
              {this.props.model.validations().length > 0 ? (
                this.props.model.validations().map(validation => (
                  <li>
                    {this.props.model.inputType()} {validation.type()} {validation.value()}
                  </li>
                ))
              ) : (
                <p>No validations added to this field</p>
              )}
            </ul>
          </div>
          {/* <button type="submit" id="finish">
            Finish
          </button> */}
        </form>
        <div>
          <label>
            <span>*</span>
            Indicates a required field
          </label>
        </div>
      </div>
    );
  }
}

export default PatternValidation;
