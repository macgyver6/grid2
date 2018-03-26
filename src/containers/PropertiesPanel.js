import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../node_modules/react-tabs/style/react-tabs.css';
import { properties } from './properties';
import { TextInputProperty } from './TextInputProperty';
import { address } from '../address';

const PropertiesPanelStyle = {
  width: '20%',
  height: '100%',
  backgroundColor: 'lightgrey',
  border: '0px solid black'
};

export const PropertiesPanel = props => {
  console.log(props.currententity);

  return (
    <div style={PropertiesPanelStyle}>
      <Tabs>
        <TabList>
          <Tab>Properties</Tab>
          <Tab>Dependencies</Tab>
        </TabList>
        <TabPanel>
          {props.currententity ? (
            <TextInputProperty
              model={address.byPath(props.form, props.currententity)}
              form={props.form}
              currententity={props.currententity}
              mutate={props.mutate}
            />
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
};
