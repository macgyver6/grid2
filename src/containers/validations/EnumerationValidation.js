import React from 'react';
import {address} from '../../address';
import {timeZones} from './timeZones';

export const EnumerationValidation = props => {
  // const change_handler = event => {   return
  // props.mutate(address.bySample(props.model, props.form), {     validations: {
  //      ...props.model.validations(),       [event.target.id]:
  // event.target.value,     },   }); };
  return (
    <div>
      <h2>Enumeration Validations</h2>
      <br/>
      <div id="edu_unc_tcrdms_model_form_validation_validators_EnumerationValidator">
        <form>
          <div>
            <div>
              <p>
                <a id="addEnum">Add enumeration value</a>
              </p>
              <div id="enumerationList"/>
              <input
                type="checkbox"
                name="validState"
                checked="checked"
                id="validState-enum"/>
              <label for="validState-enum">
                If checked values matching the (pattern, values, range) above satisfy the
                condition.
              </label>
              <br/>
              <input
                type="checkbox"
                name="nullIsValid"
                checked="checked"
                id="nullIsValid-enum"/>
              <label for="nullIsValid-enum">
                If checked blank values are included in the list of values that satisfy the
                condition.
              </label>
              <br/>
              <input type="checkbox" name="strong" id="strong-enum"/>
              <label for="strong-enum">Cannot be overridden</label>
              <p/>
              <p>
                <button value="EnumerationValidator">Add</button>
                <button value="EnumerationValidator">Update</button>
              </p>
            </div>
            <div>
              <label for="failureMessage-enum">
                <span>*</span>
                Custom failure message (optional):
              </label>
              <br/>
              <textarea name="failureMessage" id="failureMessage-enum"/>
              <br/>
              <label for="locale">
                <span>*</span>
                Language
              </label>
              <select name="locale">
                <option value=""/>
                <option value="ar">Arabic</option>
              </select>
              <label for="localeSpecific">Country</label>
              <select name="localeSpecific"/>
              <br/>
              <button>Add message</button>
              <button>Update Message</button>
              <div/>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnumerationValidation;
