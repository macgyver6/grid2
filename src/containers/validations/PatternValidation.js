import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';

export const PatternValidation = props => {
  // const change_handler = event => {
  //   return props.mutate(address.bySample(props.model, props.form), {
  //     validations: {
  //       ...props.model.validations(),
  //       [event.target.id]: event.target.value,
  //     },
  //   });
  // };
  return (
    <div>
      <h2>Pattern Validations</h2>
      <br />

      <div id="validation">
        <h3>Form Input Validators</h3>
        <div>
          <div id="dependencyElems">
            <label for="externalId">Dependency Form:</label>
            <select name="dependencyForm">
              <option value="-1">Current Form</option>
              <option value="test">test</option>
            </select>
            <label for="externalId">Dependency Input ID:</label>
            <select name="externalId" />
            <hr />
            <h5>(For Remote Dependencies only)</h5>
            <label for="eventDef">Event Definition:</label>
            <span role="status" aria-live="polite" />
            <input id="eventDef" autocomplete="off" />
            <label for="occurrence">Occurrence:</label>
            <select id="occurrence" disabled="disabled">
              <option value="-1">First</option>
              <option value="-99">Specify</option>
            </select>
            <label for="occurrenceNumber">Occurrence #:</label>
            <input
              type="text"
              id="occurrenceNumber"
              size="2"
              disabled="disabled"
            />
          </div>

          <div id="edu_unc_tcrdms_model_form_validation_validators_PatternValidator">
            <form>
              <div>
                <div>
                  <p>
                    <label for="pattern">Validation Pattern: </label>
                    <br />
                    <input type="text" size="25" name="pattern" id="pattern" />
                    <br />
                    <br />
                    <input
                      type="checkbox"
                      name="validState"
                      checked="checked"
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
                      checked="checked"
                      id="nullIsValid-pattern"
                    />
                    <label for="nullIsValid-pattern">
                      If checked blank values are included in the list of values
                      that satisfy the condition.
                    </label>
                    <br />
                    <input type="checkbox" name="strong" id="strong-pattern" />
                    <label for="strong-pattern">Cannot be overridden</label>
                  </p>
                  <p>
                    <button value="PatternValidator">Add</button>
                    <button value="PatternValidator">Update</button>
                  </p>
                </div>
                <div>
                  <label for="failureMessage-pattern">
                    <span>*</span> Custom failure message (optional):
                  </label>
                  <br />
                  <textarea name="failureMessage" />
                  <br />
                  <label for="locale">
                    <span>*</span> Language
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
                    <input type="radio" name="empty" id="empty1" value="1" />
                    <label for="empty1">Field is empty</label>
                    <br />
                    <input type="radio" name="empty" id="empty2" value="2" />
                    <label for="empty2">Field has any value</label>
                  </p>
                  <p>
                    <button value="NoOpValidator">Add</button>
                    <button value="NoOpValidator">Update</button>
                  </p>
                </div>
                <div>
                  <label for="failureMessage-empty">
                    <span>* </span> Custom failure message (optional):
                  </label>
                  <br />
                  <textarea name="failureMessage" id="failureMessage-empty" />
                  <br />
                  <label for="locale">
                    <span>*</span> Language
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
          <div id="edu_unc_tcrdms_model_form_validation_validators_EnumerationValidator">
            <form>
              <div>
                <div>
                  <p>
                    <a id="addEnum">Add enumeration value</a>
                  </p>
                  <div id="enumerationList" />
                  <input
                    type="checkbox"
                    name="validState"
                    checked="checked"
                    id="validState-enum"
                  />
                  <label for="validState-enum">
                    If checked values matching the (pattern, values, range)
                    above satisfy the condition.
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    name="nullIsValid"
                    checked="checked"
                    id="nullIsValid-enum"
                  />
                  <label for="nullIsValid-enum">
                    If checked blank values are included in the list of values
                    that satisfy the condition.
                  </label>
                  <br />
                  <input type="checkbox" name="strong" id="strong-enum" />
                  <label for="strong-enum">Cannot be overridden</label>
                  <p />
                  <p>
                    <button value="EnumerationValidator">Add</button>
                    <button value="EnumerationValidator">Update</button>
                  </p>
                </div>
                <div>
                  <label for="failureMessage-enum">
                    <span>*</span> Custom failure message (optional):
                  </label>
                  <br />
                  <textarea name="failureMessage" id="failureMessage-enum" />
                  <br />
                  <label for="locale">
                    <span>*</span> Language
                  </label>
                  <select name="locale">
                    <option value="" />
                    <option value="ar">Arabic</option>
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
                      If checked values matching the (pattern, values, range)
                      above satisfy the condition.
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
                    <span>*</span> Custom failure message (optional):
                  </label>
                  <br />
                  <textarea
                    name="failureMessage"
                    id="failureMessage-subjectValidator"
                  />
                  <br />
                  <label for="locale">
                    <span>*</span> Language
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
          <div id="edu_unc_tcrdms_model_form_validation_validators_RangeValidator">
            <form>
              <div>
                <div>
                  <p />
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <label for="min-val">
                            <span>*</span> Min:{' '}
                          </label>
                          <input
                            type="text"
                            size="15"
                            name="min"
                            id="min-val"
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="min-inclusive"
                            checked="checked"
                            id="min-inclusive"
                          />
                          <label for="min-inclusive">Min Inclusive</label>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <label for="max-val">
                            <span>*</span> Max:{' '}
                          </label>
                          <input
                            type="text"
                            size="15"
                            name="max"
                            id="max-val"
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            name="max-inclusive"
                            checked="checked"
                            id="max-inclusive"
                          />
                          <label for="max-inclusive">Max Inclusive</label>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <input
                    type="checkbox"
                    name="validState"
                    checked="checked"
                    id="validState-range"
                  />
                  <label for="validState-range">
                    If checked values matching the (pattern, values, range)
                    above satisfy the condition.
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    name="nullIsValid"
                    checked="checked"
                    id="nullIsValid-range"
                  />
                  <label for="nullIsValid-range">
                    If checked blank values are included in the list of values
                    that satisfy the condition.
                  </label>
                  <br />
                  <input type="checkbox" name="strong" id="strong-range" />
                  <label for="strong-range">Cannot be overridden</label>

                  <p>
                    <button value="RangeValidator">Add</button>
                    <button value="RangeValidator">Update</button>
                  </p>
                </div>
                <div>
                  <label for="failureMessage-range">
                    <span>*</span> Custom failure message (optional):
                  </label>
                  <br />
                  <textarea name="failureMessage" id="failureMessage-range" />
                  <br />
                  <label for="locale">
                    <span>*</span> Language
                  </label>
                  <select name="locale">
                    <option value="" />
                    <option value="sq">Albanian</option>
                    <option value="ar">Arabic</option>
                  </select>
                  <label for="locale">Country</label>
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
            <span>*</span> Indicates a required field
          </label>
        </div>
      </div>
    </div>
  );
};

export default PatternValidation;
