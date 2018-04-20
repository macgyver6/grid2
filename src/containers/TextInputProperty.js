import React from 'react';
import { address } from '../address';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { _validations } from './_validations';
import DateValidationUI from './validations/dateValidationUI';
import StringValidationUI from './validations/stringValidationUI';
import IntegerValidationUI from './validations/integerValidationUI';
import FloatValidationUI from './validations/floatValidationUI';

export const TextInputProperty = props => {
  const change_handler = event => {
    console.log(event.target.value);
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    console.log(props.model.validations());
    return props.mutate(
      address.bySample(props.model, props.form),

      {
        validations: { ...props.model.validations(), [event.target.id]: value }
      }
    );
  };

  const validationSelector_handler = event => {
    console.log(event.target.value);
    return props.mutate(
      address.bySample(props.model, props.form),

      { validations: _validations[event.target.value] }
    );
  };

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Properties</Tab>
          <Tab>Validations</Tab>
        </TabList>
        <h1>Text Input</h1>
        <p>{props.model.UUID()}</p>
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
                  <svg
                    class="octicon octicon-markdown v-align-bottom"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"
                    />
                  </svg>
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
                  <svg
                    class="octicon octicon-markdown v-align-bottom"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"
                    />
                  </svg>
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
              {/* disabled="disabled" */}
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
            <br />
          </div>
        </TabPanel>
        <TabPanel>
          <h2>{props.model.type()} Validations</h2>
          <label for="textInput-val-type">Input Type</label>
          <br />
          <select
            value={props.model.validations().valType}
            className="form-control"
            name="textInput-val-type"
            onChange={validationSelector_handler}
            id="valType"
          >
            <option selected value>
              {' '}
              -- select an option --{' '}
            </option>
            {['String', 'Date', 'Integer', 'Float'].map(item => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <br />
          {/*    <label for="textInput-val-length">Input Max Length</label>

          <input
            name="textInput-val-length"
            size="2"
            type="number"
            id="maxLength"
            onChange={change_handler}
            value={props.model.validations().maxLength}
          />
          */}
          {/* {address.whichValidation(props.model.validations().type)} */}
          {console.log(props.model.validations())}
          {React.createElement(
            address.whichValidation(props.model.validations().type),
            {
              // key: i,
              model: props.model.validations()
              // form: props.form,
              // remove: props.remove,
              // add: props.add,
              // mutate: props.mutate,
              // changeentity: props.changeentity
            }
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};
