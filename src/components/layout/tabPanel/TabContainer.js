import React, { Component } from 'react';
// import FormSection from '../../../data/FormSection';
import Tab from '../../common/Tab';
import { setActiveTab, reorderFormTabs } from '../../../redux-modules/actions';
import { connect } from 'react-redux';
import Tabs from '../../common/Tabs';

const AddTab = () => {
  const style_Add_Tab = {
    textAlign: 'center',
    borderBottom: '3px solid white',
    backgroundColor: 'white',
    justifySelf: 'center',
    width: '132px',
    border: '3px solid rgb(32, 94, 226)',
    borderRadius: '2px',
    draggable: 'false',
    margin: '8px 6px 6px 6px',
  };
  return (
    <button style={style_Add_Tab} className="add_tab">
      <p style={{ margin: '2px' }}>Add Tab</p>
    </button>
  );
};

const metaTabsStyle = {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '80% 20%',
  position: 'relative',
  // marginBottom: '16px',
  padding: '6px',
  // marginLeft: '20px',
};

class TabContainer extends Component {
  constructor(props) {
    super(props);
    this.activeRef = React.createRef();
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
    this.drop_handler = this.drop_handler.bind(this);
    this.dragEnd_handler = this.dragEnd_handler.bind(this);
    this.state = {
      isOver: null,
    };
  }

  dragOverHandler(event) {
    event.preventDefault();
    const { id } = event.target;

    if (id !== this.state.isOver) {
      this.setState({
        isOver: id,
      });
    }
  }

  drop_handler(event) {
    const draggedTabUUID = this.props.activeTab;
    const droppedTabUUID = event.target.id;
    this.props.reorderFormTabs(draggedTabUUID, droppedTabUUID);
    this.setState({ isOver: null });
  }

  dragEnd_handler(event) {
    this.setState({ isOver: null });
  }

  mouseLeave_handler(event) {
    const tabContainer = document.getElementById('tabcontainer');
    tabContainer.removeChild(
      tabContainer.children[tabContainer.children.length - 1]
    );
    document.getElementById('tabcontainer').style.backgroundColor =
      this.props.form.children().length > 1 ? 'darkgrey' : 'white';
  }

  componentDidMount() {
    if (this.activeRef.current) {
      this.activeRef.current.scrollIntoView();
    }
  }

  mouseDownHandler(event) {
    event.stopPropagation();
    const { id } = event.target;
    this.props.setActiveTab(id);
  }

  render() {
    return (
      <div style={metaTabsStyle}>
        <Tabs>
          {this.props.tabs.map(tab => (
            <span
              {...{
                key: `${tab.uuid}.formTab.span`,
                ...(tab.uuid === this.props.activeTab && {
                  ref: this.activeRef,
                }),
              }}
            >
              <Tab
                {...{
                  key: `${tab.uuid}.formTab`,
                  draggable: true,
                  uuid: tab.uuid,
                  legend: tab.legend,
                  active: tab.uuid === this.props.activeTab,
                  setActiveTab: this.props.setActiveTab,
                  dragOverHandler: this.dragOverHandler,
                  mouseDownHandler: this.mouseDownHandler,
                  dragEnd_handler: this.dragEnd_handler,
                  drop_handler: this.drop_handler,
                  // ...(tab.uuid === this.props.activeTab && {
                  //   ref: this.activeRef,
                  // }),
                  isOver: tab.uuid === this.state.isOver,
                }}
              />
            </span>
          ))}
        </Tabs>
        <AddTab />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tabs: state.form.topLevelIds.map(topLevelId => {
    return {
      uuid: state.form.byId[topLevelId].uuid,
      legend: state.form.byId[topLevelId].legend,
    };
  }),
  activeTab: state.app.activeTab,
});

TabContainer = connect(
  mapStateToProps,
  { setActiveTab, reorderFormTabs }
)(TabContainer);
export default TabContainer;
