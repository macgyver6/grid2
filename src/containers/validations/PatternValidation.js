import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';
import { utility } from '../../validation/val.utility';
import { FormInput } from '../../data/FormInput';
import { _dataDefined, locals } from '../_validations';
import AppliedValidator from './AppliedValidator';
import { PatternValidator } from './data/PatternValidator';
import FailureMessage from './FailureMessage';
import ConfigApplyMethod from './ConfigApplyMethod';

export const PatternValidation = props => (
  <div>
    <br />
    <label>
      Validation Pattern:
      <input type="text" size="25" name="value" id="value" value={props.value} onChange={props.handleChange} />
    </label>
    <div>
      <div id="edu_unc_tcrdms_model_form_validation_validators_PatternValidator">
        {/* begin AppliedValidator*/}
        <div>
          <ConfigApplyMethod
            handleChange={props.handleChange}
            handleSubmit={props.handleSubmit}
            handleAdd={props.handleAdd}
            allowSubmit={props.allowSubmit}
            loadExistingValidator={props.loadExistingValidator}
            handleUpdate={props.handleUpdate}
            validState={props.validState}
            strong={props.strong}
            nullIsValid={props.nullIsValid}
            failureMode={props.failureMode}
          />
          {props.failureMode === 'validation' ? (
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
              failureMode={props.failureMode}
            />
          ) : null}
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
