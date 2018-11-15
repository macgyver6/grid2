import React, { Component } from 'react';
import FormComponent from './Form';
import TabContainer from './tabPanel/TabContainer';
import PropertyPanel from './propertyPanel/PropertyPanel';
import LeftPanel from './leftPanel/LeftPanel';
export const backgroundPanelStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  width: window.screen.availWidth - 70,
  // height: window.screen.availHeight * 0.89,
  // margin: '20px 20px 0px 20px',
  padding: '20px',
  backgroundColor: 'white',
  // margin: '20px 20px',
};
export const middlePanelStyle = {
  width: '46%',
  height: '100%',
  backgroundColor: 'white',
  padding: '6px',
  filter: 'drop-shadow(0 0 0.2rem grey)',
  margin: '0px 20px 0px 20px',
};

class LayoutRoot extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div style={backgroundPanelStyle}>
        <LeftPanel />
        <div style={middlePanelStyle}>
          <TabContainer />
          <FormComponent />
        </div>
        <PropertyPanel />
      </div>
    );
  }
}

export default LayoutRoot;
