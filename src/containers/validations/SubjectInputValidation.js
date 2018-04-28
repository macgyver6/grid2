import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';

export const SubjectInputValidation = props => {
  // const change_handler = event => {   return
  // props.mutate(address.bySample(props.model, props.form), {     validations: {
  //      ...props.model.validations(),       [event.target.id]:
  // event.target.value,     },   }); };
  return (
    <div>
      <h2>SubjectInputValidation Validations</h2>
      <br />
      <div id="edu_unc_tcrdms_model_form_validation_validators_SubjectInputValidator">
        <form>
          <div>
            <div>
              <p>
                <label for="subjectValidator">
                  Subject Input Validation Script
                </label>
                <br />
                <select id="subjectValidator" name="subjectValidator">
                  <option />
                </select>
                <br />
                <br />
                <input
                  type="checkbox"
                  name="validState"
                  checked="checked"
                  id="validState-subjectValidator"
                />
                <label for="validState-subjectValidator">
                  If checked values matching the (pattern, values, range) above
                  satisfy the condition.
                </label>
                <br />
                <input
                  type="checkbox"
                  name="nullIsValid"
                  checked="checked"
                  id="nullIsValid-subjectValidator"
                />
                <label for="nullIsValid-subjectValidator">
                  If checked blank values are included in the list of values
                  that satisfy the condition.
                </label>
                <br />
                <input
                  type="checkbox"
                  name="strong"
                  id="strong-subjectValidator"
                />
                <label for="strong-subjectValidator">
                  Cannot be overridden
                </label>
              </p>
              <p>
                <button value="SubjectInputValidator">Add</button>
                <button value="SubjectInputValidator">Update</button>
              </p>
            </div>
            <div>
              <label for="failureMessage-subjectValidator">
                <span>*</span>
                Custom failure message (optional):
              </label>
              <br />
              <textarea
                name="failureMessage"
                id="failureMessage-subjectValidator"
              />
              <br />
              <label for="locale">
                <span>*</span>
                Language
              </label>
              <select name="locale">
                <option value="" />
                <option value="sq">Albanian</option>
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
  );
};

export default SubjectInputValidation;
