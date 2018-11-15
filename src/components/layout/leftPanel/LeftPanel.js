import React, { Component } from 'react';
import { translate } from '../../../lib/translate';
import { _styles } from '../../styles/_styles';
import { widthSubWrapper } from '../../styles/formEntityStyles';
import DeleteBtn from './DeleteBtn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addStart, addEnd } from '../../../redux-modules/actions';
import { EntityTypes } from '../../../model/types';

export const leftPanelStyle = {
  width: '8%',
  height: '100%',
  backgroundColor: 'white',
  filter: 'drop-shadow(0 0 0.2rem grey)',
  padding: '0px 6px 0px 6px',
};

const selectionStyles = {
  [EntityTypes.TextInput]: {
    background: '#6C788F',
  },

  [EntityTypes.TextArea]: {
    background: '#205EE2',
  },

  [EntityTypes.CheckBox]: {
    background: '#00C5EC',
  },

  [EntityTypes.SelectionInput]: {
    background: 'red',
  },

  [EntityTypes.FormSection]: {
    background: '#f3ea5f',
  },
  [EntityTypes.TextBlock]: {
    background: 'purple',
  },
  [EntityTypes.ImageBlock]: {
    background: 'brown',
  },
  [EntityTypes.AutoSuggestInput]: {
    background: 'green',
  },
  [EntityTypes.EchoInput]: {
    background: 'orange',
  },
  [EntityTypes.CDSTextInput]: {
    background: 'blue',
  },
  // Remove: {
  //   paddingTop: '0px',
  //   paddingBottom: '12px',
  //   margin: '8px',
  //   textAlign: 'center',
  //   height: '42px',
  //   border: '3px solid #ff5f56',
  //   borderRadius: '2px',
  // },
};

const entityTypes = [
  {
    type: EntityTypes.FormSection,
    humanName: translate.entityTypeToDescriptor(EntityTypes.FormSection),
  },
  {
    type: EntityTypes.CheckBox,
    humanName: translate.entityTypeToDescriptor(EntityTypes.CheckBox),
  },
  {
    type: EntityTypes.TextArea,
    humanName: translate.entityTypeToDescriptor(EntityTypes.TextArea),
  },
  {
    type: EntityTypes.TextInput,
    humanName: translate.entityTypeToDescriptor(EntityTypes.TextInput),
  },
  {
    type: EntityTypes.SelectionInput,
    humanName: translate.entityTypeToDescriptor(EntityTypes.SelectionInput),
  },
  {
    type: EntityTypes.TextBlock,
    humanName: translate.entityTypeToDescriptor(EntityTypes.TextBlock),
  },
  {
    type: EntityTypes.ImageBlock,
    humanName: translate.entityTypeToDescriptor(EntityTypes.ImageBlock),
  },
  {
    type: EntityTypes.AutoSuggestInput,
    humanName: translate.entityTypeToDescriptor(EntityTypes.AutoSuggestInput),
  },
  { type: EntityTypes.EchoInput, humanName: 'Echo Input' },
  {
    type: EntityTypes.CDSTextInput,
    humanName: translate.entityTypeToDescriptor(EntityTypes.CDSTextInput),
  },
];

// const dragOverHandler = event => {
//     event.preventDefault();
// };

// const dragleave_handler = event => {
//     event.preventDefault();
// };

class LeftPanel extends Component {
  constructor(props) {
    super(props);
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
  }
  dragEndHandler(event) {
    this.props.addEnd();
  }
  dragStartHandler(event) {
    // console.log(
    //     event.target.dataset.type,
    //     _styles[event.target.dataset.type]_styles
    // );

    this.props.addStart(event.target.dataset.type);
    // helpers.dragStartHandler(
    //     event,
    //     _styles[event.target.dataset.type],_styles
    //     'addEntity'
    // );

    const gridWidth = this.props.gridWidth;
    const type = event.target.dataset.type;
    const div = document.createElement('div');
    div.id = 'dmg';
    div.style.width = `${widthSubWrapper(_styles[type]) * gridWidth}px`;
    //  gets the total width of the default entity minus the append and prepend widths. Note subtracting 12 accounts for the gap
    div.style.height = '40px';
    div.style.backgroundColor = _styles[type].render.backgroundColor;
    div.style.position = 'fixed';
    div.style.top = '-1000px';
    div.style.left = '-1000px';
    document.body.appendChild(div);

    event.dataTransfer.setDragImage(div, 0, 0);
  }
  render() {
    return (
      <div style={leftPanelStyle}>
        <DeleteBtn />
        {entityTypes.map((entity, index) => (
          <div
            key={index}
            draggable="true"
            onDragStart={this.dragStartHandler}
            onDragEnd={this.dragEndHandler}
            style={{
              // paddingBottom: '6px',
              marginBottom: '8px',
              textAlign: 'center',
              height: '42px',
              border: `3px solid ${selectionStyles[entity.type].background}`,
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            data-type={entity.type}
          >
            <span
            // style={{
            //   marginTop: '10px',
            // }}
            >
              {entity.humanName}
            </span>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addStart,
      addEnd,
    },
    dispatch
  );

const mapStateToProps = (state, ownProps) => ({
  gridWidth: state.app.gridWidth,
});

LeftPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftPanel);

export default LeftPanel;
