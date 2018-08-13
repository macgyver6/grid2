import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';
import { utility } from '../../validation/val.utility';
import { FormInput } from '../../data/FormInput';
import { _dataDefined, locals } from '../_validations';
import AppliedValidator from './AppliedValidator';
import { PatternValidator } from './data/PatternValidator';

export const FailureMessage = props => (
  <div>
    <div style={{ border: '1px solid blue' }}>
      <label for="failMsg-pattern">
        <span>*</span>
        Custom failure message (optional):
      </label>
      <br />
      <textarea name="failMsg" id="failMsg" onChange={props.handleChange} value={props.customFailureMessage.failMsg} />
      <br />
      <label for="failLang">
        <span>*</span>
        Language
      </label>
      <select name="failLang" id="failLang" onChange={props.handleChange} value={props.customFailureMessage.failLang}>
        {locals.map(local => <option>{local}</option>)}
      </select>
      <label for="failLocal">Country</label>
      <select
        name="failLocal"
        id="failLocal"
        onChange={props.handleChange}
        value={props.customFailureMessage.failLocal}
      >
        <option value="" />
        <option value="Brazil">Brazil</option>
        <option value="Chile">Chile</option>
        <option value="China">China</option>
      </select>
      <br />

      {props.failMsg !== '' && props.failLocal !== '' && props.failLang !== '' ? (
        <p>✔️ Custom Failure Complete</p>
      ) : (
        <strong>To add custom failure message, complete all 3 fields</strong>
      )}
      <div />
    </div>
  </div>
);

export default FailureMessage;
