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
      failMsg: '',
      failLocal: '',
      failLang: '',
    };
    Object.keys(new PatternValidator({ type: 'PatternValidator' }).properties()).forEach(
      property => (this.state[property] = '')
    );
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.addFailureMessage = this.addFailureMessage.bind(this);
    this.allowSubmit = this.allowSubmit.bind(this);
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
      customFailureMessage: {
        failMsg: this.state._failMsg,
        failLocal: this.state._failLocal,
        failLang: this.state._failLang,
      },

      // _failMsg: '',
      // _failLocal: '',
      // _failLang: '',
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
    // event.preventDefault();
  }

  edit_fail(failMsg) {
    const fail_set = this.props.model.validations().filter(element => element.failMsg === 'yolo');
    console.log(fail_set);
  }

  allowSubmit() {
    if (this.state.failMsg !== '' && this.state.failLocal !== '' && this.state.failLang !== '') {
      return false;
    } else if (this.state.failMsg === '' && this.state.failLocal === '' && this.state.failLang === '') {
      return false;
    } else {
      return true;
    }
  }

  render() {
    // if (this.state._failMsg !== '' && this.state._failLocal !== '' && this.state._failLang !== '') {
    //   this.addFailureMessage();
    // }

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
                    <label for="failMsg-pattern">
                      <span>*</span>
                      Custom failure message (optional):
                    </label>
                    <br />
                    <textarea name="failMsg" id="failMsg" onChange={this.handleChange} value={this.state.failMsg} />
                    <br />
                    <label for="failLang">
                      <span>*</span>
                      Language
                    </label>
                    <select name="failLang" id="failLang" onChange={this.handleChange} value={this.state.failLang}>
                      {locals.map(local => <option>{local}</option>)}
                    </select>
                    <label for="failLocal">Country</label>
                    <select name="failLocal" id="failLocal" onChange={this.handleChange} value={this.state.failLocal}>
                      <option value="" />
                      <option value="Brazil">Brazil</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                    </select>
                    <br />

                    {this.state.failMsg !== '' && this.state.failLocal !== '' && this.state.failLang !== '' ? (
                      <p>✔️ Custom Failure Message Added</p>
                    ) : (
                      // <p onMouseDown={this.addFailureMessage}>Add message</p>
                      <strong>To add custom failure message, complete all 3 fields</strong>
                    )}
                    {/* <button>Update Message</button> */}
                    <div />
                    {/* <div
                      style={{ minHeight: '60px', width: '90%', border: 'solid black 1px', background: 'lightblue' }}
                    >
                      {/* {this.props.model.customFailureMessage() ? (
                        <p>
                          {this.props.model.customFailureMessage().failMsg}{' '}
                          {this.props.model.customFailureMessage().failLocal}{' '}
                          {this.props.model.customFailureMessage().failLang}
                        </p>
                      ) : (
                        <p>Map through and render all messages</p>
                      )}
                    </div> */}
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
            <p>{console.log(this.allowSubmit())}</p>
            <button disabled={this.allowSubmit()} value="PatternValidator" onClick={this.handleAdd}>
              Add
            </button>
            <button value="PatternValidator">Update</button>
          </p>
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
