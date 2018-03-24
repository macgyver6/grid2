import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../node_modules/react-tabs/style/react-tabs.css';
import { properties } from './properties';
import { TextInputProperty } from './TextInputProperty';

const PropertiesPanelStyle = {
  width: '20%',
  height: '100%',
  backgroundColor: 'lightgrey',
  border: '0px solid black'
};

export const PropertiesPanel = props => (
  <div style={PropertiesPanelStyle}>
    <Tabs>
      <TabList>
        <Tab>Properties</Tab>
        <Tab>Dependencies</Tab>
      </TabList>
      <TabPanel>
        {props.currententity ? (
          <TextInputProperty model={props.currententity} />
        ) : null}
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
    </Tabs>
    {/* <h1>Uploaded Files</h1>
    <ul>{fileNames ? fileNames.map(name => <li>{name}</li>) : null}</ul> */}
  </div>
);
