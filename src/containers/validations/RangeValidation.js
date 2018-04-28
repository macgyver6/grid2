import React from 'react';
import {address} from '../../address';
import {timeZones} from './timeZones';

export const RangeValidation = props => {
  // const change_handler = event => {   return
  // props.mutate(address.bySample(props.model, props.form), {     validations: {
  //  ...props.model.validations(),       [event.target.id]: event.target.value,
  //  },   }); };
  return (
    <div>
      <h2>Range Validations</h2>
      <br/>
      <div id="edu_unc_tcrdms_model_form_validation_validators_RangeValidator">
        <form>
          <div>
            <div>
              <p/>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label for="min-val">
                        <span>*</span>
                        Min:{' '}
                      </label>
                      <input type="text" size="15" name="min" id="min-val"/>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="min-inclusive"
                        checked="checked"
                        id="min-inclusive"/>
                      <label for="min-inclusive">Min Inclusive</label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label for="max-val">
                        <span>*</span>
                        Max:{' '}
                      </label>
                      <input type="text" size="15" name="max" id="max-val"/>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="max-inclusive"
                        checked="checked"
                        id="max-inclusive"/>
                      <label for="max-inclusive">Max Inclusive</label>
                    </td>
                  </tr>
                </tbody>
              </table>
              <input
                type="checkbox"
                name="validState"
                checked="checked"
                id="validState-range"/>
              <label for="validState-range">
                If checked values matching the (pattern, values, range) above satisfy the
                condition.
              </label>
              <br/>
              <input
                type="checkbox"
                name="nullIsValid"
                checked="checked"
                id="nullIsValid-range"/>
              <label for="nullIsValid-range">
                If checked blank values are included in the list of values that satisfy the
                condition.
              </label>
              <br/>
              <input type="checkbox" name="strong" id="strong-range"/>
              <label for="strong-range">Cannot be overridden</label>

              <p>
                <button value="RangeValidator">Add</button>
                <button value="RangeValidator">Update</button>
              </p>
            </div>
            <div>
              <label for="failureMessage-range">
                <span>*</span>
                Custom failure message (optional):
              </label>
              <br/>
              <textarea name="failureMessage" id="failureMessage-range"/>
              <br/>
              <label for="locale">
                <span>*</span>
                Language
              </label>
              <select name="locale">
                <option value=""/>
                <option value="sq">Albanian</option>
                <option value="ar">Arabic</option>
              </select>
              <label for="locale">Country</label>
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

export default RangeValidation;
