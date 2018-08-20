import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';
import FailureMessage from './FailureMessage';
import ConfigApplyMethod from './ConfigApplyMethod';

export const SubjectInputValidation = props => (
  // const change_handler = event => {   return
  // props.mutate(address.bySample(props.model, props.form), {     validations: {
  //      ...props.model.validations(),       [event.target.id]:
  // event.target.value,     },   }); };
  <div>
    <br />
    <label for="value">Subject Input Validation Script</label>
    <br />
    <select name="properties" id="value" value={props.properties.value} onChange={props.handleStateSet}>
      <option selected value>
        {' '}
        -- select a script --{' '}
      </option>{' '}
      <option value="sample script"> Sample scipt </option>{' '}
    </select>
    {/* <label>
        Validation Pattern:
      <input type="text" size="25" name="value" id="value" onChange={props.handleStateSet} value={props.value} />
      </label> */}
    <div>
      <div id="edu_unc_tcrdms_model_form_validation_validators_PatternValidator">
        {/* begin AppliedValidator*/}
        <div>
          <ConfigApplyMethod
            handleStateSet={props.handleStateSet}
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
              handleStateSet={props.handleStateSet}
              handleSubmit={props.handleSubmit}
              handleAdd={props.handleAdd}
              allowSubmit={props.allowSubmit}
              loadExistingValidator={props.loadExistingValidator}
              handleUpdate={props.handleUpdate}
              customFailureMessage={props.customFailureMessage}
              // failMsg={props.failMsg}
              // failLocal={props.failLocal}
              // failLang={props.failLang}
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
    <div>
      <label>
        <span>*</span>
        Indicates a required field
      </label>
    </div>
  </div>
);

export default SubjectInputValidation;
