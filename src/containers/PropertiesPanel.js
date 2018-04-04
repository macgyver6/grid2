import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../node_modules/react-tabs/style/react-tabs.css';
import { properties } from './properties';
import { TextInputProperty } from './TextInputProperty';
import { FormProperty } from './FormProperties';
import { address } from '../address';

const PropertiesPanelStyle = {
  width: '20%',
  height: '100%',
  backgroundColor: 'lightgrey',
  border: '0px solid black',
};

export const PropertiesPanel = props => {
  return (
    <div style={PropertiesPanelStyle}>
      <Tabs>
        <TabList>
          <Tab>Properties</Tab>
          <Tab>Dependencies</Tab>
          <Tab>Form</Tab>
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
            }
          )}
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <FormProperty model={props.form} />
        </TabPanel>
      </Tabs>
      {/* <h1>Uploaded Files</h1>
    <ul>{fileNames ? fileNames.map(name => <li>{name}</li>) : null}</ul> */}
    </div>
  );
};
