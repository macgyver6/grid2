import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';
import { utility } from '../../validation/val.utility';
import { FormInput } from '../../data/FormInput';
import { _dataDefined, locals } from '../_validations';
import AppliedValidator from './AppliedValidator';
import { PatternValidator } from './data/PatternValidator';
import FailureMessage from './FailureMessage';

export const PatternValidation = props => (
  <div>
    <label>
      Validation Pattern:
      <input type="text" size="25" name="value" id="value" onChange={props.handleChange} value={props.value} />
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
              <input
                type="checkbox"
                name="strong"
                id="strong-pattern"
                checked={props.strong}
                onChange={props.handleChange}

                // checked={props.model.validations().defaultUserVal.Pattern.strong}
              />
              <label for="strong-pattern">Cannot be overridden</label>
            </p>
          </div>
          <FailureMessage
            handleChange={props.handleChange}
            handleSubmit={props.handleSubmit}
            handleAdd={props.handleAdd}
            allowSubmit={props.allowSubmit}
            loadExistingValidator={props.loadExistingValidator}
            handleUpdate={props.handleUpdate}
            failMsg={props.failMsg}
            failLocal={props.failLocal}
            failLang={props.failLang}
          />
        </div>
        {/* end AppliedValidator*/}
      </div>
    </div>
    <div id="validators">
      <ul />
    </div>
    <p>
      {props.mode === 'add' ? (
        <button disabled={props.allowSubmit()} value="PatternValidator" onClick={props.handleAdd}>
          Add
        </button>
      ) : (
        <button value="PatternValidator" onClick={props.handleUpdate}>
          Update
        </button>
      )}
    </p>
    <div>
      <label>
        <span>*</span>
        Indicates a required field
      </label>
    </div>
  </div>
);

export default PatternValidation;
