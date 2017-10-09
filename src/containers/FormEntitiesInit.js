import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import FormComponent from '../components/FormEntities/Form';

import {
  backgroundPanelStyle,
  leftPanelStyle,
  middlePanelStyle,
  rightPanelStyle,
  headerPanelStyle,
} from '../components/layout/styles/Layout';

import DesignBoxHeader from '../components/layout/design/DesignBoxHeader';

// let dragover_handler = function (event) {
//   event.preventDefault();
// }

let dragstart_handler = function (event) {
  event.dataTransfer.setData("text/plain", event.target.dataset.type);
}

let dragend_handler = function (event) {
  event.preventDefault();
}

// let dragleave_handler = function (event) {
//   event.preventDefault();
// }

const BackgroundPanel = (props) =>
  <div style={backgroundPanelStyle}>
    <LeftPanel
      form={props.form}
      removeformentity={props.removeformentity}
      addformentity={props.addformentity} />
    <MiddlePanel
      form={props.form}
      removeformentity={props.removeformentity}
      addformentity={props.addformentity} />
    <RightPanel />
  </div>

const selectionStyles = {
  TextInput: {
    background: "#ff3f3f",
    padding: "20px",
    margin: "20px"
  },

  TextArea: {
    background: "#2bd1fc",
    padding: "20px",
    margin: "20px"
  },

  Checkbox: {
    background: "#ff48c4",
    padding: "20px",
    margin: "20px"
  },

  FormSection: {
    background: "#f3ea5f",
    padding: "20px",
    margin: "20px"
  }
}

let entityTypes = ['FormSection', 'Checkbox', 'TextArea', 'TextInput']

const LeftPanel = (props) =>
  <div style={leftPanelStyle}>
    {entityTypes.map((entity, index) => {
      return (
        <div
          key={index}
          draggable="true"
          onDragEnd={dragend_handler}
          onDragStart={dragstart_handler}
          style={selectionStyles[entity]}
          data-type={entity}>
          <p>{entity}</p>
        </div>
      )
    })}
  </div>

const MiddlePanel = (props) => {
  return <div
    style={middlePanelStyle}>
    <div style={{
      ...headerPanelStyle, backgroundColor: "#EB7265", border: '6px dashed #f3ea5f', margin: '0px 20px 0px'
    }}>
      <DesignBoxHeader />
    </div>
    <FormComponent
      form={props.form}
      removeformentity={props.removeformentity}
      addformentity={props.addformentity}
    />
  </div>
}

const RightPanel = () =>
  <div
    style={rightPanelStyle}>
  </div>

class FormEntityInit extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <h1>FormEntitiesInit</h1>

        <BackgroundPanel
          form={this.props.store.model.form}
          removeformentity={this.props.removeformentity}
          addformentity={this.props.addformentity}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { store: state };
}
FormEntityInit = connect(mapStateToProps, actions)(FormEntityInit)
export default FormEntityInit;