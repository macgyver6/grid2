import React from 'react';
import { address } from '../address';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { _dataDefined, userDefined } from './_validations';
import DateValidationUI from './validations/dateValidationUI';
import StringValidationUI from './validations/stringValidationUI';
import IntegerValidationUI from './validations/integerValidationUI';
import FloatValidationUI from './validations/floatValidationUI';
import { Collapse } from 'react-collapse';
import Expand from '../assets/expand.js';
import { calcTotal } from '../components/FormEntities/feStyles';
import { utility } from '../validation/val.utility';
import { FormInput } from '../data/FormInput';
import PatternValidator from './validations/PatternValidation';
// './validations/PatternValidation'
import DropToSelect from './DropToSelect';

export const TextInputProperty = props => {
  const change_handler = event =>
    props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: event.target.value,
    });

  const layoutChange_handler = event => {
    props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: parseFloat(event.target.value),
      append:
        24 -
        props.model.prepend() -
        (event.target.id === 'prePromptWidth' ? parseFloat(event.target.value) : props.model.prePromptWidth()) -
        props.model.width() -
        (event.target.id === 'postPromptWidth' ? parseFloat(event.target.value) : props.model.postPromptWidth()),
      // function that calcs total width and subtracts all OTHER elements, returningt what the value should be
    });
  };

  const validationSelector_handler = event =>
    // return {
    //   validations: {
    //     ...props.model.validations(),
    //     [event.target.id]: event.target.value
    //   }
    // };

    props.mutate(address.bySample(props.model, props.form), {
      ...props.model,
      [event.target.id]: event.target.value,
    });
  // props.mutate(address.bySample(props.model, props.form), {
  //   validations: {
  //     ...props.model.validations(),
  //     [event.target.id]: event.target.value,
  //   },
  // });

  const collapse_handler = event => {
    props.temporalStateChange({
      [event.target.id]: !props.appState[event.target.id],
    });
  };

  // const dataDefined = {
  //   String: ['Pattern', 'NoOp', 'Enumeration', 'SubjectInputValidation'],
  //   Date: ['NoOp', 'Enumeration', 'Range'],
  //   Integer: ['Pattern', 'NoOp', 'Enumeration', 'Range'],
  //   Float: ['Pattern', 'NoOp', 'Enumeration', 'Range']
  // };

  const userDefinedValOptionsArr = Object.keys(_dataDefined).map(userDefinedValOption => (
    <option value={userDefinedValOption}>{userDefinedValOption}</option>
  ));

  let currentSelectedValidator = 'Pattern';
  const validationSelector_handler2 = event => (currentSelectedValidator = event.target.value);

  console.log(currentSelectedValidator);

  // return {
  //   validations: {
  //     ...props.model.validations(),
  //     [event.target.id]: event.target.value
  //   }
  // };

  // const collapse_handler = event => {
  //   props.temporalStateChange({
  //     [event.target.id]: !props.appState[event.target.id],
  //   });
  // };

  const tabPanelStyle = {
    padding: '10px',
  };

  return (
    <div>
      <h1 style={{ marginBottom: '0px' }}>Text Input</h1>
      <p style={{ fontSize: 8, margin: '0px' }}>{props.model.UUID()}</p>
      <p style={{ fontSize: 8, margin: '0px 0px 4px 0px' }}>
        prePromptWidth: {props.model.prePromptWidth()} Append: Total width: {calcTotal(props.model)} PrePend:{' '}
        {props.model.prePrompt()} Width: {props.model.width()} Append:
        {props.model.append()}
      </p>
      <Tabs>
        <TabList>
          <Tab>Validations</Tab>
          <Tab>Dependencies</Tab>
          <Tab>Properties</Tab>
        </TabList>
        <TabPanel style={tabPanelStyle}>
          {/* <h2 id="validations" onClick={collapse_handler}>
            User Defined Validations{props.appState.validations ? ' ⬇️ (Click to collpase)' : ' ↕️ (Click to Expand)'}
          </h2> */}
          <div
            style={{
              margin: '20px',
              padding: '4px',
              minHeight: '60px',
              width: '80%',
              border: 'solid black 1px',
              background: 'orange',
            }}
          >
            {/* {JSON.stringify(this.props.model.validations())} */}
            <h4>Validations Applied to this Field</h4>
            <ul>
              {props.model.validations().length > 0 ? (
                props.model.validations().map(validation => (
                  <li>
                    {props.model.inputType()} {validation.type()} {validation.value()}
                  </li>
                ))
              ) : (
                <li>No validations on this field exist</li>
              )}
            </ul>
          </div>
          <br />
          <select
            value={props.model.currentValidator()}
            className="form-control"
            name="textInput-val-type"
            onChange={validationSelector_handler}
            id="currentValidator"
          >
            {/* <option selected value>
              {' '}
              -- select an option --{' '}
      </option> */}
            {_dataDefined[`${props.model.inputType()}`].userDefined.map(userDefinedVal => (
              <option value={userDefinedVal}>{userDefinedVal}</option>
            ))}
          </select>

          <Collapse isOpened={props.appState.validations}>
            {React.createElement(address.whichValidator(props.model.currentValidator()), {
              model: address.byPath(props.form, props.currententity),
              form: props.form,
              currententity: props.currententity,
              mutate: props.mutate,
              appState: props.appState,
              temporalStateChange: props.temporalStateChange,
            })}
          </Collapse>
        </TabPanel>
        <TabPanel style={tabPanelStyle}>
          <h3>Configure dependencies here</h3>
          <div
            style={{
              margin: '20px',
              padding: '4px',
              minHeight: '60px',
              width: '80%',
              border: 'solid black 1px',
              background: 'orange',
            }}
          >
            {/* {JSON.stringify(this.props.model.validations())} */}
            <h4>Dependencies Applied to this Field</h4>
            <ul>
              <li>
                Any of the following
                <ul>
                  <li>a1 - Text Input Patient Age Range (min inclusive): 10 (max inclusive): 60</li>
                  <li>a2 - Text Input Patient Gender Female</li>
                </ul>
              </li>
            </ul>

            {/* {props.model.validations().length > 0 ? (
                props.model.validations().map(validation => (
                  <li>
                    {props.model.inputType()} {validation.type()} {validation.value()}
                  </li>
                ))
              ) : (
                <li>None</li>
              )} */}
          </div>
          <h3>1. Select dependency input</h3>
          <select>
            <option>All</option>
            <option>Any</option>
            <option>Exactly One</option>
          </select>
          <h3>2. Select Entity to Apply Dependency To (implement eye-dropper - future)</h3>
          <br />
          <DropToSelect form={props.form} model={props.model} />

          {/* <select
            className="form-control"
            name="dependency-selection"
            type={props.model.type()}
            // value={props.model.sourceInput()}
            onChange={change_handler}
            id="sourceInput"
          >
            {utility
              .findAll(props.form, e => e instanceof FormInput)
              .map(formInput => (
                <option value={formInput.promptNumber()}>{`${formInput.promptNumber()} - ${formInput.type()}`}</option>
              ))}
          </select> */}
          <h3>3. Select validator to apply</h3>
          <select>
            <option>Pattern</option>
            <option>NoOp</option>
          </select>
          <h3>4. Configure validator</h3>
          <PatternValidator />
        </TabPanel>
        <TabPanel style={tabPanelStyle}>
          <div>
            <p>
              <label htmlFor="textInput-name">Name</label>
              <br />
              <input type="text" id="name" name="textInput-name" onChange={change_handler} value={props.model.name()} />
            </p>
            PrePromptWidth:
            <input
              type="number"
              id="prePromptWidth"
              onChange={layoutChange_handler}
              value={props.model.prePromptWidth()}
            />
            PostPromptWidth:
            <input
              type="number"
              id="postPromptWidth"
              onChange={layoutChange_handler}
              value={props.model.postPromptWidth()}
            />
            <p>
              <label htmlFor="textInput-prompt_pre">
                Pre Prompt (optional){' '}
                <a
                  className="tabnav-extra"
                  href="https://guides.github.com/features/mastering-markdown/"
                  target="_blank"
                  data-ga-click="Markdown Toolbar, click, help"
                >
                  {/* Markdown is supported */}
                </a>
              </label>
              <br />
              <textarea
                name="textInput-prompt_pre"
                type="text"
                id="prePrompt"
                onChange={change_handler}
                value={props.model.prePrompt()}
                rows="3"
                cols="50"
              />
            </p>
            <p>
              <label htmlFor="textInput-prompt_post">
                Post Prompt (optional){' '}
                <a
                  className="tabnav-extra"
                  href="https://guides.github.com/features/mastering-markdown/"
                  target="_blank"
                  data-ga-click="Markdown Toolbar, click, help"
                >
                  {/* Markdown is supported */}
                </a>
              </label>
              <br />
              <textarea
                name="textInput-prompt_post"
                type="text"
                id="postPrompt"
                onChange={change_handler}
                value={props.model.postPrompt()}
                rows="3"
                cols="50"
              />
            </p>
            {/* <p>
        <label for="textInput-qbq">Q-by-Q (optional)</label>
        <br />
        <textarea name="textInput-qbq" />
      </p> */}
          </div>
          <div>
            <p>
              <label htmlFor="textInput-tabOrder">Tab Order</label>
              <br />
              <input
                type="number"
                name="textInput-tabOrder"
                id="tabOrder"
                size="2"
                onChange={change_handler}
                value={props.model.tabOrder()}
              />
            </p>
            <p>
              <label htmlFor="textInput-sasCodeLabel">SAS Code Label</label>
              <br />
              <input
                type="text"
                name="textInput-sasCodeLabel"
                id="sasCodeLabel"
                onChange={change_handler}
                value={props.model.sasCodeLabel()}
              />
            </p>
            <p>
              <input
                type="checkbox"
                name="textInput-autoTab"
                id="autoTab"
                onChange={change_handler}
                checked={props.model.autoTab()}
              />
              <label htmlFor="textInput-autoTab">Enable Auto Tabbing</label>
            </p>
            <div>
              <label htmlFor="textInput-length">Max Length</label>
              <br />
              <input
                name="textInput-length"
                size="2"
                type="number"
                id="length"
                onChange={change_handler}
                value={props.model.maxLength()}
              />
              <br />
              <label htmlFor="textInput-QxQ">QxQ Content</label>

              <textarea
                name="textInput-QxQ"
                type="text"
                id="QxQ"
                onChange={change_handler}
                value={props.model.QxQ()}
                rows="3"
                cols="50"
              />
              <br />
              <label htmlFor="textInput-defaultContent">Default Content</label>
              <br />
              <input
                type="text"
                name="textInput-defaultContent"
                type="text"
                id="defaultContent"
                onChange={change_handler}
                value={props.model.defaultContent()}
              />
            </div>
            <hr />
            <h2 id="dataDefinedValidationPane" onClick={collapse_handler}>
              Data Defined Validation{props.appState.dataDefinedValidationPane
                ? ' ⬇️ (Click to collpase)'
                : ' ↕️ (Click to Expand)'}{' '}
            </h2>
            <Collapse isOpened={props.appState.dataDefinedValidationPane}>
              <label htmlFor="textInput-val-type">Input Type</label>
              <br />
              <select
                value={props.model.inputType()}
                className="form-control"
                name="textInput-val-type"
                onChange={change_handler}
                id="inputType"
              >
                {/* <option selected value>
              {' '}
              -- select an option --{' '}
      </option> */}
                {Object.keys(_dataDefined)
                  .map(val => val)
                  .map(item => <option value={item}>{item}</option>)}
              </select>
              <br />
              {/*    <label for="textInput-val-length">Input Max Length</label>

          <input
            name="textInput-val-length"
            type="number"
            id="maxLength"
            onChange={change_handler}
            value={props.model.validations().maxLength}
            />
            size="2"
          */}
              {/* {address.whichValidation(props.model.validations().type)} */}
              {React.createElement(address.whichValidation(props.model.inputType()), {
                // key: i,
                model: props.model,
                form: props.form,
                // remove: props.remove,
                // add: props.add,
                mutate: props.mutate,
                // temporalStateChange: props.temporalStateChange
              })}
              <hr />
            </Collapse>{' '}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};
