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

  let currentSelectedValidator = 'Pattern'
  const validationSelector_handler2 = event => currentSelectedValidator =  event.target.value;

  console.log(currentSelectedValidator)

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
          <Tab>Properties</Tab>
        </TabList>
        <TabPanel>
          <h2 id="validations" onClick={collapse_handler}>
            User Defined Validations{props.appState.validations ? ' ⬇️ (Click to collpase)' : ' ↕️ (Click to Expand)'}
          </h2>
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
            {_dataDefined[`${props.model.validations().valType}`].userDefined.map(userDefinedVal => (
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
        <TabPanel>
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
                value={props.model.validations().maxLength}
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
                value={props.model.validations().valType}
                className="form-control"
                name="textInput-val-type"
                onChange={validationSelector_handler}
                id="valType"
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
              {React.createElement(address.whichValidation(props.model.validations().valType), {
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
