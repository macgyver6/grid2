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
  border: '0px solid black',
};

export const PropertiesPanel = props => (
  <div style={PropertiesPanelStyle}>
    {props.currententity ? (
      <Tabs dtLocalFilesSaved={props.dtLocalFilesSaved}>
        <TabList>
          <Tab>Entity</Tab>
          <Tab dtLocalFilesSaved={props.dtLocalFilesSaved}>Form</Tab>
        </TabList>
        <TabPanel>
          {React.createElement(address.whichEntity(address.byPath(props.form, props.currententity)), {
            model: address.byPath(props.form, props.currententity),
            form: props.form,
            currententity: props.currententity,
            mutate: props.mutate,
            appState: props.appState,
            temporalStateChange: props.temporalStateChange,
          })}
        </TabPanel>
        <TabPanel dtLocalFilesSaved={props.dtLocalFilesSaved}>
          <FormProperty mutate={props.mutate} model={props.form} dtLocalFilesSaved={props.dtLocalFilesSaved} />
        </TabPanel>
      </Tabs>
    ) : (
      <Tabs dtLocalFilesSaved={props.dtLocalFilesSaved}>
        <TabList>
          <Tab>Entity</Tab>
        </TabList>
        <TabPanel>
          <h2>Select Form Entity to Access Properties</h2>
        </TabPanel>
      </Tabs>
    )}
  </div>
);
