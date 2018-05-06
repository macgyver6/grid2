import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';
import { utility } from '../../validation/val.utility';
import { FormInput } from '../../data/FormInput';
import { _dataDefined, locals } from '../_validations';

export const PatternValidation = props => {
  // const change_handler = event => {   return
  // props.mutate(address.bySample(props.model, props.form), {     validations: {
  //   ...props.model.validations(),       [event.target.id]: event.target.value,
  //    },   }); };
  return (
    <div>
      <h2>Pattern Validations</h2>
      <br />

      <div id="validation">
        {/* <h3>Form Input Validators</h3> */}
        <div>
          <div id="dependencyElems">
            <label for="externalId">Dependency Form:</label>
            <select name="dependencyForm">
              <option value="-1">Current Form</option>
              <option value="test">
                future implementation - some remote form
              </option>
            </select>
            <br />
            <label for="dependencyInputID">Dependency Input ID</label>
            <select
              className="form-control"
              name="dependencyInputID"
              type={props.model.type()}
              value="{props.model.sourceInput()}"
              id="sourceInput"
            >
              {/* onChange={change_handler}*/}
              {utility
                .findAll(props.form, e => e instanceof FormInput)
                .map(formInput => (
                  <option value={formInput.promptNumber()}>
                    {`${formInput.promptNumber()} - ${formInput.type()}`}
                  </option>
                ))}
            </select>
            {/* <label for="externalId">Dependency Input ID:</label>
            <select name="externalId" /> */}
            {/*JSON.stringify(_dataDefined[props.model.validations().valType])*/}
            <hr />
            <h5>(For Remote Dependencies only)</h5>
            <label for="eventDef">Event Definition:</label>
            <span role="status" aria-live="polite" />
            <input
              id="eventDef"
              autocomplete="off"
              value={props.model.validations().defaultUserVal.Pattern.eventDef}
            />
            <label for="occurrence">Occurrence:</label>
            <select id="occurrence">
              <option value="-1">First</option>
              <option value="-99">Specify</option>
            </select>
            <label for="occuranceNum">Occurrence #:</label>
            <input
              type="text"
              id="occuranceNum"
              size="2"
              value={
                props.model.validations().defaultUserVal.Pattern.occuranceNum
              }
            />
          </div>

          <div id="edu_unc_tcrdms_model_form_validation_validators_PatternValidator">
            <form>
              <div>
                <div>
                  <p>
                    <label for="validationPattern">Validation Pattern:</label>
                    <br />
                    <input
                      type="text"
                      size="25"
                      name="validationPattern"
                      id="validationPattern"
                      value={
                        props.model.validations().defaultUserVal.Pattern
                          .validationPattern
                      }
                    />
                    {/*JSON.stringify(

                    )*/}
                    <br />
                    <br />
                    <input
                      type="checkbox"
                      name="validState"
                      checked={
                        props.model.validations().defaultUserVal.Pattern
                          .validState
                      }
                      id="validState-pattern"
                    />
                    <label for="validState-pattern">
                      If checked values matching the (pattern, values, range)
                      above satisfy the condition.
                    </label>
                    <br />
                    <input
                      type="checkbox"
                      name="nullIsValid"
                      checked={
                        props.model.validations().defaultUserVal.Pattern
                          .nullIsValid
                      }
                      id="nullIsValid-pattern"
                    />
                    <label for="nullIsValid-pattern">
                      If checked blank values are included in the list of values
                      that satisfy the condition.
                    </label>
                    <br />
                    <input
                      type="checkbox"
                      name="strong"
                      id="strong-pattern"
                      checked={
                        props.model.validations().defaultUserVal.Pattern.strong
                      }
                    />
                    <label for="strong-pattern">Cannot be overridden</label>
                  </p>
                  <p>
                    <button value="PatternValidator">Add</button>
                    <button value="PatternValidator">Update</button>
                  </p>
                </div>
                <div>
                  <label for="customFailureMessaage-pattern">
                    <span>*</span>
                    Custom failure message (optional):
                  </label>
                  <br />
                  <textarea
                    name="customFailureMessaage"
                    value={
                      props.model.validations().defaultUserVal.Pattern
                        .customFailureMessaage
                    }
                  />
                  <br />
                  <label for="locale">
                    <span>*</span>
                    Language
                  </label>
                  <select name="locale">
                    {locals.map(local => <option>{local}</option>)}
                  </select>
                  <label for="localeSpecific">Country</label>
                  <select name="localeSpecific" />
                  <br />
                  <button>Add message</button>
                  <button>Update Message</button>
                  <div />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div id="validators">
          <ul />
        </div>
        <br />
        <button id="finish">Finish</button>
        <div>
          <label>
            <span>*</span>
            Indicates a required field
          </label>
        </div>
      </div>
    </div>
  );
};

export default PatternValidation;
