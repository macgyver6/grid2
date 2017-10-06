import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { initFE } from '../constants/defaultPropsFE';
import FormComponent from '../components/FormEntities/Form';
import { FormSection } from '../data/FormSection';
import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';
import { Checkbox } from '../data/Checkbox';
import { utility } from '../utility';

import {
  backgroundPanelStyle,
  leftPanelStyle,
  middlePanelStyle,
  rightPanelStyle,
  headerPanelStyle,
  bodyPanelStyle
} from '../components/layout/styles/Layout';

import DesignBoxHeader from '../components/layout/design/DesignBoxHeader';

let dragover_handler = function (event) {
  event.preventDefault();
  console.log('dragover_handler hit')
}

let dragstart_handler = function (event) {
  event.dataTransfer.setData("text/plain", event.target.dataset.type);
}

let dragend_handler = function (event) {
  event.preventDefault();
  console.log('dragend_handler hit')
}
let dragleave_handler = function (event) {
  event.preventDefault();
  console.log('dragleave_handler hit')
}


const BackgroundPanel = (props) =>
  <div style={backgroundPanelStyle}>
    <LeftPanel
      form={props.form}
      removeformentity={props.removeformentity}
      addformentity={props.addformentity} />
    <MiddlePanel
      form={props.form}
      removeformentity={props.removeformentity}
      addformentity={props.addformentity}/>
    <RightPanel />
  </div>
const selectionStyles = {
  TextInput: {
    background: "green",
    padding: "20px",
    margin: "20px"
  },
  TextArea: {
    background: "purple",
    padding: "20px",
    margin: "20px"
  },
  Checkbox: {
    background: "red",
    padding: "20px",
    margin: "20px"
  },
  FormSection: {
    background: "orange",
    padding: "20px",
    margin: "20px"
  }
}

let entityTypes = ['FormSection', 'Checkbox', 'TextArea', 'TextInput']

const LeftPanel = (props) =>
  <div style={leftPanelStyle}>
    {entityTypes.map((entity) => {
      return (
        <div
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

const HeaderPanel = () =>
  <div style={headerPanelStyle}>
  </div>
let mouseup_handler = function (event) {
  event.preventDefault();
  console.log('mouseup_handler hit')
}

const MiddlePanel = (props) => {
  return <div
    style={middlePanelStyle}>
    <div style={{ ...headerPanelStyle, backgroundColor: "green" }}>
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