import React, { Component } from 'react';
import { EntityTypes } from '../../../../model/types';
import Accordion from './Accordion';
import { translate } from '../../../../lib/translate';

const entityProperties = {
  // marginBottom: '16px',
  margin: '0px 6px 0px 6px',
  // border: '1px solid green',
  padding: '6px',
};

const TabTypes = {
  Properties: 0,
  Validations: 1,
  Depenendecies: 2,
};

const EntityExplorerRenderDef = {
  Default: [TabTypes.Properties],
  [EntityTypes.CDSTextInput]: [
    TabTypes.Properties,
    TabTypes.Validations,
    TabTypes.Depenendecies,
  ],
  [EntityTypes.TextInput]: [
    TabTypes.Properties,
    TabTypes.Validations,
    TabTypes.Depenendecies,
  ],
  [EntityTypes.TextArea]: [TabTypes.Properties],
  [EntityTypes.CheckBox]: [TabTypes.Properties, TabTypes.Depenendecies],
  [EntityTypes.SelectionInput]: [
    TabTypes.Properties,
    TabTypes.Validations,
    TabTypes.Depenendecies,
  ],
  [EntityTypes.TextBlock]: [TabTypes.Properties],
  [EntityTypes.ImageBlock]: [TabTypes.Properties],
  [EntityTypes.AutoSuggestInput]: [TabTypes.Properties, TabTypes.Depenendecies],
  [EntityTypes.FormSection]: [TabTypes.Properties],
  [EntityTypes.Form]: [TabTypes.Properties],
  [EntityTypes.Padding]: [TabTypes.Properties],
  [EntityTypes.EchoInput]: [TabTypes.Properties, TabTypes.Depenendecies],
};

const TestComponent = props => <p>{props.prePromptWidth}</p>;

class EntityExplorer extends Component {
  render() {
    const {
      model: { type },
    } = this.props;
    const renderDef =
      EntityExplorerRenderDef[type] || EntityExplorerRenderDef['Default'];

    return (
      <div style={entityProperties}>
        {this.props.model ? (
          <div>
            <Accordion>
              <div label={'Properties'} show isOpen>
                {translate.entityTypeToDescriptor(this.props.model.type)}
              </div>

              <div
                label="Validators"
                show={renderDef.includes(TabTypes.Validations)}
              >
                <p>This is where the validators will go</p>
                <TestComponent
                  prePromptWidth={this.props.model.prePromptWidth}
                />
              </div>
              <div
                label="Dependencies"
                show={renderDef.includes(TabTypes.Depenendecies)}
              >
                <p>This is where the dependencies will go</p>
              </div>
            </Accordion>
          </div>
        ) : (
          <p>Please select an entity</p>
        )}
      </div>
    );
  }
}

export default EntityExplorer;
