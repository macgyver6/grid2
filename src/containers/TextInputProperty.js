import React from 'react';
import { address } from '../address';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export const TextInputProperty = props => {
  const change_handler = event => {
    // console.log(event.target.value);
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: value
    });
  };
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Properties</Tab>
          <Tab>Dependencies</Tab>
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
              <label for="textInput-prompt_pre">Pre Prompt (optional)</label>
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
              <label for="textInput-prompt_post">Post Prompt (optional)</label>
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
                value={props.model.length()}
              />
              <br />
              <label for="textInput-defaultContent">Default Content</label>
              <br />
              <textarea
                type="text"
                name="textInput-defaultContent"
                type="text"
                id="defaultContent"
                onChange={change_handler}
                value={props.model.defaultContent()}
                rows="10"
                cols="50"
              />
            </div>
            <br />
          </div>
        </TabPanel>
        <TabPanel>
          <h2>{props.model.type()} Validations</h2>
          <label for="textInput-val-type">Input Type</label>
          <br />
          <input
            name="textInput-val-type"
            size="2"
            type={props.model.validations().valType}
            id="valType"
            onChange={change_handler}
            value={props.model.validations().valType}
          />

          <select
            value={props.model.validations().valType}
            className="form-control"
            name="textInput-val-type"
            onChange={change_handler}
            id="valType"
          >
            <option value="test">test</option>
            <option value={localStorage.getItem('smiley.gif')}>
              smiley.gif
            </option>
            {/*filesJSON.map(file => (
          <option value={localStorage.getItem('smiley.gif')}>
            {'smiley.gif'}
          </option>
        ))*/}
          </select>
        </TabPanel>
      </Tabs>
    </div>
  );
};
