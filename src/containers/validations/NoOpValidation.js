import React from 'react';
import {address} from '../../address';
import {timeZones} from './timeZones';

export const NoOpValidation = props => {
  // const change_handler = event => {   return
  // props.mutate(address.bySample(props.model, props.form), {     validations: {
  // ...props.model.validations(),       [event.target.id]: event.target.value,
  // },   }); };
  return (
    <div>
      <h2>NoOp Validations</h2>
      <br/>
      <div id="edu_unc_tcrdms_model_form_validation_validators_NoOpValidator">
        <form>
          <div>
            <div>
              <p>
                {/* <!-- <input type = "checkbox" name="validState" checked="checked"  id="validState-empty"/>
									<label for="validState-empty">If checked values matching the (pattern, values, range) above satisfy the condition.</label><br />
									<input type = "hidden" name="nullIsValid" checked="checked" id="nullIsValid-empty"/>
									<input type = "checkbox" name="strong" id="strong-empty"/>
									<label for="strong-empty">Cannot be overridden</label>
									--> */}
                <input type="radio" name="empty" id="empty1" value="1"/>
                <label for="empty1">Field is empty</label>
                <br/>
                <input type="radio" name="empty" id="empty2" value="2"/>
                <label for="empty2">Field has any value</label>
              </p>
              <p>
                <button value="NoOpValidator">Add</button>
                <button value="NoOpValidator">Update</button>
              </p>
            </div>
            <div>
              <label for="failureMessage-empty">
                <span>*
                </span>
                Custom failure message (optional):
              </label>
              <br/>
              <textarea name="failureMessage" id="failureMessage-empty"/>
              <br/>
              <label for="locale">
                <span>*</span>
                Language
              </label>
              <select name="locale">
                <option value=""/>
                <option value="sq">Albanian</option>
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

export default NoOpValidation;
