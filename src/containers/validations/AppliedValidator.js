import React from 'react';
import { _dataDefined, locals } from '../_validations';

export const AppliedValidator = props => (
  <div>
    <div>
      <p>
        <label for="validationPattern">Validation Pattern:</label>
        <br />
        <input
          type="checkbox"
          name="validState"
          // checked={props.model.validations().defaultUserVal.Pattern.validState}
          // id="validState-pattern"
        />
        <label for="validState-pattern">
          If checked values matching the (pattern, values, range) above satisfy the condition.
        </label>
        <br />
        <input
          type="checkbox"
          name="nullIsValid"
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
          // checked={props.model.validations().defaultUserVal.Pattern.strong}
        />
        <label for="strong-pattern">Cannot be overridden</label>
      </p>
    </div>
    <div>
      <label for="customFailureMessage-pattern">
        <span>*</span>
        Custom failure message (optional):
      </label>
      <br />
      <textarea
        name="customFailureMessage"
        // value={props.model.validations().defaultUserVal.Pattern.customFailureMessage}
      />
      <br />
      <label for="locale">
        <span>*</span>
        Language
      </label>
      <select name="locale">{locals.map(local => <option>{local}</option>)}</select>
      <label for="localeSpecific">Country</label>
      <select name="localeSpecific" />
      <br />
      <button>Add message</button>
      <button>Update Message</button>
      <div />
      <br />
      <div style={{ minHeight: '60px', width: '90%', border: 'solid black 1px', background: 'lightblue' }}>
        <p>Map through and render all messages</p>
      </div>
    </div>
  </div>
);

export default AppliedValidator;
