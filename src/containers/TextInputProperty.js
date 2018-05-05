import React from 'react';
import { address } from '../address';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { _dataDefined } from './_validations';
import DateValidationUI from './validations/dateValidationUI';
import StringValidationUI from './validations/stringValidationUI';
import IntegerValidationUI from './validations/integerValidationUI';
import FloatValidationUI from './validations/floatValidationUI';
import { Collapse } from 'react-collapse';
import Expand from '../assets/expand.js';
import { calcTotal } from '../components/FormEntities/feStyles';

export const TextInputProperty = props => {
  const change_handler = event => {
    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: event.target.value
    });
  };

  const validationSelector_handler = event => {
    // return {
    //   validations: {
    //     ...props.model.validations(),
    //     [event.target.id]: event.target.value
    //   }
    // };

    return props.mutate(address.bySample(props.model, props.form), {
      validations: {
        ...props.model.validations(),
        [event.target.id]: event.target.value
      }
    });
  };

  const collapse_handler = event => {
    props.temporalStateChange({
      [event.target.id]: !props.appState[event.target.id]
    });
  };

  console.log(Object.keys(_dataDefined));

  // const dataDefined = {
  //   String: ['Pattern', 'NoOp', 'Enumeration', 'SubjectInputValidation'],
  //   Date: ['NoOp', 'Enumeration', 'Range'],
  //   Integer: ['Pattern', 'NoOp', 'Enumeration', 'Range'],
  //   Float: ['Pattern', 'NoOp', 'Enumeration', 'Range']
  // };

  const userDefinedValOptionsArr = dataDefinedSelection =>
    _dataDefined[dataDefinedSelection]['userDefined'].map(
      userDefinedValOption => (
        <option value={userDefinedValOption}>{userDefinedValOption}</option>
      )
    );

  return (
    <div>
      <h1 style={{ marginBottom: '0px' }}>Text Input</h1>
      <p style={{ fontSize: 8, margin: '0px' }}>{props.model.UUID()}</p>
      <p style={{ fontSize: 8, margin: '0px 0px 4px 0px' }}>
        Total width: {calcTotal(props.model)}
      </p>
      <Tabs>
        <TabList>
          <Tab>Validations</Tab>
          <Tab>Properties</Tab>
        </TabList>
        <TabPanel>
          <h2 id="validations" onClick={collapse_handler}>
            User Defined Validations{props.appState.validations
              ? ' ⬇️ (Click to collpase)'
              : ' ↕️ (Click to Expand)'}
          </h2>
          <Collapse isOpened={props.appState.validations}>
            <select
              className="form-control"
              name="textInput-val-type"
              onChange={
                validationSelector_handler // value={props.model.validations().valType}
              }
              id="userDefined"
            >
              {/* <option selected value>
            {' '}
            -- select an option --{' '}
    </option> */}

              {/*[
                'Pattern',
                'EmptyField',
                'Enumeration',
                'SubjectInputValidation',
                'Range',
                'NoOp'
              ].map(item => <option value={item}>{item}</option>)*/}
              {userDefinedValOptionsArr(props.model.validations().valType)}
            </select>
            {React.createElement(
              address.whichValidator(props.model.validations().userDefined),
              {
                model: address.byPath(props.form, props.currententity),
                form: props.form,
                currententity: props.currententity,
                mutate: props.mutate,
                appState: props.appState,
                temporalStateChange: props.temporalStateChange
              }
            )}
          </Collapse>
        </TabPanel>
        <TabPanel>
          <div>
            <p>
              <label for="textInput-name">Name</label>
              <br />
              <input
                type="text"
                id="name"
                name="textInput-name"
                onChange={change_handler}
                value={props.model.name()}
              />
            </p>
            <p>
              <label for="textInput-prompt_pre">
                Pre Prompt (optional){' '}
                <a
                  class="tabnav-extra"
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
              <label for="textInput-prompt_post">
                Post Prompt (optional){' '}
                <a
                  class="tabnav-extra"
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
              <label for="textInput-tabOrder">Tab Order</label>
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
              <label for="textInput-sasCodeLabel">SAS Code Label</label>
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
              <label for="textInput-autoTab">Enable Auto Tabbing</label>
            </p>
            <div>
              <label for="textInput-length">Max Length</label>
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
              <label for="textInput-QxQ">QxQ Content</label>

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
              <label for="textInput-defaultContent">Default Content</label>
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
              <label for="textInput-val-type">Input Type</label>
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
              {React.createElement(
                address.whichValidation(props.model.validations().valType),
                {
                  // key: i,
                  model: props.model,
                  form: props.form,
                  // remove: props.remove,
                  // add: props.add,
                  mutate: props.mutate
                  // temporalStateChange: props.temporalStateChange
                }
              )}
              <hr />
            </Collapse>{' '}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};
