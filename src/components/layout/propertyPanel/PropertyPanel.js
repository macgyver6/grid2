import React, { Component } from 'react';
// import FormSection from '../../../data/FormSection';
// import Tab from './Tab';
import { setActiveTab, reorderFormTabs } from '../../../redux-modules/actions';
import { connect } from 'react-redux';
import Tabs from '../../common/Tabs';
import Tab from '../../common/Tab';
// import { helpers } from '../../../lib/helpers';
// import { TabContent } from "./TabContent";
import { TabContent } from './TabContent';
import { translate } from '../../../lib/translate';
const propertyPanelStyle = {
  width: '46%',
  // display: 'grid',
  // gridTemplateColumns: '80% 20%',
  position: 'relative',
  marginBottom: '16px',
  // marginLeft: '20px',
  // border: '1px solid blue',
  filter: 'drop-shadow(0 0 0.2rem grey)',
  padding: '6px',
  backgroundColor: 'white',
};

class PropertyPanel extends Component {
  constructor(props) {
    super(props);

    this.activeRef = React.createRef();
    this.state = {
      currentTab: 'EntityExplorer',
    };
  }

  mouseDownHandler = tabUUID => {
    // const id = parseInt(event.target.id, 10);
    // console.log(event.target.id);
    this.setState({ currentTab: tabUUID });
  };

  dragOverHandler(event) {
    event.preventDefault();
  }

  componentDidMount() {
    if (this.activeRef.current) {
      this.activeRef.current.scrollIntoView();
    }
  }

  render() {
    const { model } = this.props;
    const { currentTab } = this.state;

    return (
      <div style={propertyPanelStyle}>
        <Tabs style={{ width: '100%', border: 'green', padding: '6px' }}>
          <Tab
            mouseDownHandler={() => this.mouseDownHandler('EntityExplorer')}
            active={currentTab === 'EntityExplorer'}
            uuid={'EntityExplorer'}
            legend={
              model
                ? `${translate.entityTypeToDescriptor(model.type)}`
                : 'Entity'
            }
            style={{
              width: '100px',
              height: '100px',
              border: '1px solid blue',
            }}
          />
          <Tab
            mouseDownHandler={() => this.mouseDownHandler('FormProperty')}
            active={currentTab === 'FormProperty'}
            uuid={'FormProperty'}
            legend="Form"
            style={{
              width: '100px',
              height: '100px',
              border: '1px solid blue',
            }}
          />
        </Tabs>
        <TabContent activeTab={currentTab} model={model} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { activeEntityUUID } = state.app;
  const model = activeEntityUUID ? state.form.byId[activeEntityUUID] : null;
  return {
    model,
  };
};

PropertyPanel = connect(
  mapStateToProps,
  { setActiveTab, reorderFormTabs }
)(PropertyPanel);
export default PropertyPanel;
