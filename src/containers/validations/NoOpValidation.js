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
    // props.handleChange({});
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
  // const change_handler = event => {   return
  // props.mutate(address.bySample(props.model, props.form), {     validations: {
  // ...props.model.validations(),       [event.target.id]: event.target.value,
  // },   }); };

  <div>
    <br />

    <select value={props.value} className="form-control" name="value" onChange={props.handleChange} id="value">
      {/* <option selected value>
              {' '}
              -- select an option --{' '}
      </option> */}

      <option value={true}>Field Is Empty</option>
      <option value={false}>Any Value</option>
    </select>

    {/* <div>
      <input type="radio" id="empty" name="empty" checked={props.value === true} value={true} />
      <label for="empty">Field is empty</label>

      <input type="radio" id="any" name="any" checked={props.value === false} value={false} />
      <label for="any">Field has any value</label>
    </div> */}

    <div className="fancy-radio-wrapper">
      <fieldset className="fancy-radio-inner">
        <input type="radio" id="empty" name="empty" checked={props.value === true} />
        <label for="empty" id={true}>
          Field Is Empty
        </label>
        <input type="radio" id="any" name="any" value={false} />
        <label for="any" id={false}>
          Field Has Any Value
        </label>

        {/* {[
          { label: 'Field is empty', value: false, operator: 0 },
          { label: 'Field has any value', value: true, operator: 1 },
        ].map(option => [
          <input
            type="radio"
            id={option.value}
            name={option.value}
            value={option.value}
            checked={this.state.value === true}
          />,
          <label className="label" for={option.value} id={option.value}>
            {option.label}
          </label>,
        ])} */}
      </fieldset>
    </div>

    {/* <div className="fancy-radio-wrapper" style={fancyRadioStyle}>
      <div className="fancy-radio-inner">
        {[{ label: 'Field is empty', value: false }, { label: 'Field has any value', value: true }].map(option => [
          <input type="radio" id={option.value} name={option.value} value={option.value} />,
          <label className="label" for="gl1" onClick={click_handler}>
            {option.label}
          </label>,
        ])}
      </div>
    </div> */}

    {/* <label>
      Validation Pattern:
      <input type="text" size="25" name="value" id="value" onChange={props.handleChange} value={props.value} />
    </label> */}

    <div>
      <div id="edu_unc_tcrdms_model_form_validation_validators_PatternValidator">
        {/* begin AppliedValidator*/}

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
        <div>
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

export default NoOpValidation;
