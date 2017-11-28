import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import FormComponent from '../components/FormEntities/Form';
import { utility } from '../utility';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import {
  backgroundPanelStyle,
  leftPanelStyle,
  middlePanelStyle,
  rightPanelStyle,
  headerPanelStyle,
} from '../components/layout/styles/Layout';
import DesignBoxHeader from '../components/layout/design/DesignBoxHeader';

let dragstart_handler = function (event) {
  // event.preventDefault();
  event.stopPropagation();
  event.dataTransfer.setData("text/plain",
    JSON.stringify({
      action: 'addEntity',
      model: defaultPropsFE[event.target.dataset.type]
    }))
}

let dragend_handler = function (event) {
  event.preventDefault();
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
      addformentity={props.addformentity}
      changetab={props.changetab}
      activeTab={props.activeTab} />
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
  },

  Remove: {
    background: "red",
    padding: "20px",
    margin: "20px",
    textAlign: 'center'
  }
}

let entityTypes = ['FormSection', 'Checkbox', 'TextArea', 'TextInput']



let dragover_handler = (event) => {
  event.preventDefault();
}

let dragleave_handler = (event) => {
  event.preventDefault();
}

const DeleteBtn = (props) => {
  let drop_handler = (event) => {
    console.log(event.dataTransfer.getData("text"))
    event.preventDefault();
    event.stopPropagation();
    let entityModel = utility.resurrectEntity(JSON.parse(event.dataTransfer.getData("text")))
    console.log(utility.findNode(entityModel, props.form))
    props.removeformentity(utility.findNode(entityModel, props.form))
  }
  return <div
    style={selectionStyles.Remove}
    onDrop={drop_handler}
    onDragOver={dragover_handler}
    onDragLeave={dragleave_handler}
  >
    <h1>🗑</h1>
  </div>
}

const LeftPanel = (props) =>
  <div style={leftPanelStyle}
    form={props.form}
  >
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
    < DeleteBtn
      form={props.form}
      removeformentity={props.removeformentity}
    />
  </div>

const MiddlePanel = (props) => {
  return <div
    style={middlePanelStyle}
    addformentity={props.addformentity} >
    <div style={{
      ...headerPanelStyle, backgroundColor: "#EB7265", border: '6px dashed #f3ea5f', margin: '0px 20px 0px'
    }}>
      {props.form.sectionTabs() ?
        <DesignBoxHeader
          tabs={props.form.children()}
          addformentity={props.addformentity}
          changetab={props.changetab}
          activeTab={props.activeTab}
        />
        : <DesignBoxHeader
        />
      }

    </div>
    <FormComponent
      form={props.form}
      removeformentity={props.removeformentity}
      addformentity={props.addformentity}
      activeTab={props.activeTab}
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
        <BackgroundPanel
          form={this.props.store.model.form}
          removeformentity={this.props.removeformentity}
          addformentity={this.props.addformentity}
          changetab={this.props.changetab}
          activeTab={this.props.store.model.app.activeTab}
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