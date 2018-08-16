import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';
import { valUtility } from '../../validation/val.utility';
import { FormInput } from '../../data/FormInput';
import { _dataDefined, locals } from '../_validations';
import AppliedValidator from './AppliedValidator';
import { PatternValidator } from './data/PatternValidator';
import FailureMessage from './FailureMessage';

export const ConfigApplyMethod = props => (
  <div>
    <p>
      <input
        type="checkbox"
        name="validState"
        checked={props.validState}
        onChange={props.handleChange}
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
        checked={props.nullIsValid}
        onChange={props.handleChange}
        // checked={props.model.validations().defaultUserVal.Pattern.nullIsValid}
        // id="nullIsValid-pattern"
      />
      <label for="nullIsValid-pattern">
        If checked blank values are included in the list of values that satisfy the condition.
      </label>
      <br />
      {props.failureMode === 'validation'
        ? [
            <input
              type="checkbox"
              name="strong"
              id="strong-pattern"
              checked={props.strong}
              onChange={props.handleChange}
            />,
            <label for="strong-pattern">Cannot be overridden</label>,
          ]
        : null}
    </p>
  </div>
);

export default ConfigApplyMethod;
