import React from 'react';
import { address } from '../address';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export const CDSTextInputProperty = props => {
  const change_handler = event => {
    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Properties</Tab>
          <Tab>Dependencies</Tab>
        </TabList>
        <h1>CDS Text Input</h1>
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
              <label for="textInput-script">Script</label>
              <br />
              <textarea
                type="text"
                name="textInput-script"
                id="script"
                onChange={change_handler}
                value={props.model.script()}
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

          <select
            value={props.model.validations().valType}
            className="form-control"
            name="textInput-val-type"
            onChange={change_handler}
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
          <label for="textInput-val-length">Input Max Length</label>

          <input
            name="textInput-val-length"
            size="2"
            type="number"
            id="maxLength"
            onChange={change_handler}
            value={props.model.validations().maxLength}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
};
