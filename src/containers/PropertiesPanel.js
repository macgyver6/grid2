import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../node_modules/react-tabs/style/react-tabs.css';
import { properties } from './properties';
import { TextInputProperty } from './TextInputProperty';
import { FormProperty } from './FormProperties';
import { address } from '../address';

const PropertiesPanelStyle = {
  width: '40%',
  height: '100%',
  backgroundColor: 'lightgrey',
  border: '0px solid black'
};

export const PropertiesPanel = props => {
  return (
    <div style={PropertiesPanelStyle}>
      <Tabs dtLocalFilesSaved={props.dtLocalFilesSaved}>
        <TabList>
          <Tab>Entity</Tab>
          <Tab dtLocalFilesSaved={props.dtLocalFilesSaved}>Form</Tab>
        </TabList>
        <TabPanel>
          {React.createElement(
            address.whichEntity(
              address.byPath(props.form, props.currententity)
            ),
            {
              model: address.byPath(props.form, props.currententity),
              form: props.form,
              currententity: props.currententity,
              mutate: props.mutate,
              appState: props.appState,
              temporalStateChange: props.temporalStateChange
            }
          )}
        </TabPanel>
        <TabPanel dtLocalFilesSaved={props.dtLocalFilesSaved}>
          <FormProperty
            mutate={props.mutate}
            model={props.form}
            dtLocalFilesSaved={props.dtLocalFilesSaved}
          />
        </TabPanel>
      </Tabs>
      {/* <h1>Uploaded Files</h1>
    <ul>{fileNames ? fileNames.map(name => <li>{name}</li>) : null}</ul> */}
    </div>
  );
};
