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

import DesignBoxHeader from '../components/layout/design/DesignBoxHeader'
// import DesignBoxGrid from './design/DesignBoxGrid'

// import EditorBox from './editor/EditorBox'

const BackgroundPanel = (props) =>
  <div style={backgroundPanelStyle}>
    <LeftPanel
      form={props.form} removeformentity={props.removeformentity}
      addformentity={props.addformentity} />
    <MiddlePanel
      form={props.form} removeformentity={props.removeformentity}
      addformentity={props.addformentity}
    />
    <RightPanel />
  </div>
var divStyleTI = {
  background: "green",
  padding: "20px",
  margin: "20px"
};
var divStyleTA = {
  background: "purple",
  padding: "20px",
  margin: "20px"
};
var divStyleCB = {
  background: "red",
  padding: "20px",
  margin: "20px"
};
var divStyleFS = {
  background: "orange",
  padding: "20px",
  margin: "20px"
};
const TextInputSimple = () => <div draggable="true" style={divStyleTI}>
  <p>TextInput</p>
</div>

const TextAreaSimple = () => <div draggable="true" style={divStyleTA}>
  <p>TextArea</p>
</div>

const CheckboxSimple = () => <div draggable="true" style={divStyleCB}>
  <p>Checkbox</p>
</div>

const FormSectionSimple = () => <div draggable="true"
  onDragEnd={dragend_handler}
  onDragStart={dragstart_handler}
  onMouseUp={mouseup_handler}
  style={divStyleFS}>
  <p>FormSection</p>
</div>

const LeftPanel = (props) =>
  <div style={leftPanelStyle}>
    {/* {initFE.map((element, i) => {
      console.log(utility.lookupComponent(utility.resurrectEntity(element)))
      return React.createElement(utility.lookupComponent(utility.resurrectEntity(element)), { key: i, model: element, form: initFE.form })
    })} */}
    <FormSectionSimple />
    <TextInputSimple />
    <TextAreaSimple />
    <CheckboxSimple />
  </div>

const HeaderPanel = () =>
  <div style={headerPanelStyle}>
  </div>
let mouseup_handler = function (event) {
  event.preventDefault();
  console.log('mouseup_handler hit')
}

let dragover_handler = function (event) {
  event.preventDefault();
  console.log('dragover_handler hit')
}

let dragstart_handler = function (event) {
  // event.preventDefault();
  event.dataTransfer.setData("text/plain", 'testData');
  console.log('dragstart_handler hit')
}

let dragend_handler = function (event) {
  event.preventDefault();
  console.log('dragend_handler hit')
}
let dragleave_handler = function (event) {
  event.preventDefault();
  console.log('dragleave_handler hit')
}

const MiddlePanel = (props) => {
  const drop_handler = event => {
    console.log(props.form)
    event.preventDefault();
    // console.log(props.addformentity(event, new FormSection(defaultPropsFE.FormSection), [0]))
    let data = event.dataTransfer.getData("text");
    props.addformentity(new FormSection(defaultPropsFE.FormSection), props.form, [0])
    console.log('dataTransfer: ', data)
    console.log('drop_handler hit')
  }
  console.log(props)
  return <div
    onDrop={drop_handler}
    onDragOver={dragover_handler}
    onDragLeave={dragleave_handler}
    style={middlePanelStyle}>
    <div style={{ ...headerPanelStyle, backgroundColor: "green" }}>
      <DesignBoxHeader />
    </div>
    <FormComponent form={props.form}
      removeformentity={props.removeformentity}
      addformentity={props.addformentity}
    />
  </div>
}

const RightPanel = () =>
  <div style={rightPanelStyle}>
  </div>


class FormEntityInit extends Component {
  constructor(props) {
    super();
    // this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <h1>FormEntitiesInit</h1>

        {/* <button
          className="btn btn-info"
          onClick={this.props.addformentity.bind(this, new FormSection(defaultPropsFE.FormSection), [0])}>
          Add Form Section
        </button>

        <button
          className="btn btn-info"
          onClick={this.props.addformentity.bind(this,
            new Checkbox(defaultPropsFE.Checkbox), [0, 0])}>
          Add Checkbox
        </button>

        <button
          className="btn btn-success"
          onClick={this.props.addformentity.bind(this, new TextInput(defaultPropsFE.TextInput), [0, 0])}>
          Add Text Input
        </button>

        <button
          className="btn btn-danger"
          onClick={this.props.addformentity.bind(this, new TextArea(defaultPropsFE.TextArea), [0, 0])}>
          Add Text Area
        </button>

        <button
          className="btn btn-info"
          onClick={this.props.removeformentity.bind(this, [0, 0])}>
          Remove Entity
        </button> */}

        {/* <button
          className="btn btn-info"
          onClick={this.handleChange.bind(this, [0, 0])}>
          Modify Entity
        </button> */}

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