import React, { Component } from 'react';
// import FormSection from '../../../data/FormSection';
// import Tab from './Tab';
import { setActiveTab, reorderFormTabs } from '../../../redux-modules/actions';
import { connect } from 'react-redux';
import Tabs from "../../common/Tabs";
import Tab from "../../common/Tab";
// import { helpers } from '../../../lib/helpers';
// import { TabContent } from "./TabContent";
import { TabContent } from "./TabContent";
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
  backgroundColor: 'white'
};





class PropertyPanel extends Component {
  constructor(props) {
    super(props);

    this.activeRef = React.createRef();
    this.state = {
      currentTab: 'TextInput'
    }
  }

  mouseDownHandler = event => {
    // const id = parseInt(event.target.id, 10);
    console.log(event.target.id);

    this.setState({
      currentTab: event.target.id
    })
  }

  dragOverHandler(event) {
    event.preventDefault();
  }

  componentDidMount() {
    if (this.activeRef.current) {
      this.activeRef.current.scrollIntoView();
    }
  }

  render() {
    const { activeEntity } = this.props
    const { currentTab } = this.state


    return (
      <div style={propertyPanelStyle}>
        <Tabs style={{ width: '100%', border: 'green', padding: '6px' }}>
          <Tab mouseDownHandler={this.mouseDownHandler} active={currentTab === 'TextInput'} uuid={'TextInput'} legend={activeEntity ? `${activeEntity.type} Properties` : 'Entity Properties'} style={{ width: '100px', height: '100px', border: '1px solid blue' }}>
          </Tab>
          <Tab mouseDownHandler={this.mouseDownHandler} active={currentTab === 'FormProperty'} uuid={'FormProperty'} legend='Form Properties' style={{ width: '100px', height: '100px', border: '1px solid blue' }} />
        </Tabs>
        {/* {console.log(TabContent activeTab={currentTab})} */}
        <TabContent activeTab={currentTab} />
      </div>
    );
  }
}

const mapStateToProps = state => {

  const { activeEntityUUID } = state.app
  const activeEntity = state.form.byId[activeEntityUUID]
  return ({
    activeEntity: activeEntityUUID ? activeEntity : null,
  })
};

PropertyPanel = connect(
  mapStateToProps,
  { setActiveTab, reorderFormTabs }
)(PropertyPanel);
export default PropertyPanel;
