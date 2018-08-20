import React from 'react';
import { address } from '../../address';
import { timeZones } from './timeZones';
import FailureMessage from './FailureMessage';
import ConfigApplyMethod from './ConfigApplyMethod';
// import { index } from './index';

const fancyRadioStyle = {
  // position: 'absolute',
  // // right: 16,
  // bottom: '12.5',
  // height: '30px',
  // width: '98%',
};

const click_handler = event => {
  // event.target.checked = false;
  console.log(event.target.value);
  if (event.target.id === true) {
    event.target.style.backgroundColor = 'blue';
    // props.handleStateSet({});
  }
  // this.setState({
  //   value: event.target.id,
  // });
};

// const handleChange = event => {
//   const target = event.target;
//   const value = target.type === 'checkbox' ? target.checked : target.value;

//   // switch (target) {
//   //   case target.type === 'checkbox':
//   //     return target.checked;
//   //     break;
//   //   // case target.id === 'customFailureMessage':
//   //   //   [...state.customFailureMessage, { message: 'test2', language: 'spansh' }]
//   //   //   return [this.state.customFailtureMessages, target.value];
//   //   //   break;
//   //   default:
//   //     return target.value;
//   // }

//   const name = target.name;

//   this.setState({
//     [name]: value,
//   });
// };

export const NoOpValidation = props => (
  <div>
    <br />

    <select value={props.value} className="form-control" name="nullIsValid" onChange={props.handleStateSet} id="value">
      <option value={true}>Field Is Empty</option>
      <option value={false}>Any Value</option>
    </select>

    {/* <div className="fancy-radio-wrapper">
      <fieldset className="fancy-radio-inner">
        <input type="radio" id="empty" name="empty" checked={props.value === true} />
        <label for="empty" id={true}>
          Field Is Empty
        </label>
        <input type="radio" id="any" name="any" value={false} />
        <label for="any" id={false}>
          Field Has Any Value
        </label>
      </fieldset>
    </div>
  */}

    <div>
      <div id="edu_unc_tcrdms_model_form_validation_validators_PatternValidator">
        {/* begin AppliedValidator*/}

        <div>
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

export default NoOpValidation;
