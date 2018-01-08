import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import FormComponent from '../components/FormEntities/Form';
import { utility } from '../utility';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import CheckBox from '../components/FormEntities/CheckBox.js'
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
  //event.stopPropagation();
  console.log({
    action: 'addEntity',
    model: defaultPropsFE[event.target.dataset.type]
  })
  event.dataTransfer.setData("text/plain",
    JSON.stringify({
      action: 'addEntity',
      model: defaultPropsFE[event.target.dataset.type]
    }));
  // var test = document.createElement('div');
  // test.style.width = '100px';
  // test.style.height = '100px';
  // // test.style.position = 'fixed';
  // // test.style.top = '-1000000px';
  // // test.style.left = '-1000000px';
  // test.style.border = '2px solid red';
  // document.body.appendChild(test);
  // event.dataTransfer.setDragImage(test, 0, 0)

  const type = event.target.dataset.type
  const div = document.createElement('div');
  div.id = "dmg";
  div.style.width = `${defaultPropsFE[type].width * 46}px`;
  div.style.height = '100px';
  div.style.backgroundColor = defaultPropsFE[type].render.backgroundColor
  div.style.position = "fixed";
  div.style.top = "-1000px";
  div.style.left = "-1000px";
  document.body.appendChild(div);

  // var p = document.getElementById("FormSectionComponent");

  // var p_prime = p.cloneNode(true);
  // p_prime.style.position = "fixed";
  // p_prime.id = "dmg";
  // p_prime.style.top = "-1000px";
  // p_prime.style.left = "-1000px";
  // console.log(p_prime)
  // document.body.appendChild(p_prime);

  event.dataTransfer.setDragImage(div, 0, 0);
}



//   var p = document.getElementById("FormSectionComponent");

//   var p_prime = p.cloneNode(true);
//   p_prime.style.position = "fixed";
//   p_prime.id = "dmg";
//   p_prime.style.top = "-1000px";
//   p_prime.style.left = "-1000px";
//   console.log(p_prime)
//   document.body.appendChild(p_prime);

//   event.dataTransfer.setDragImage(p_prime, 0, 0);
// }

let dragend_handler = function (event) {
  //event.preventDefault();
  // document.getElementById("dmg").remove();
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
      mutateformentity={props.mutateformentity}
      changetab={props.changetab}
      activeTab={props.activeTab} />
    <RightPanel />
  </div>

const selectionStyles = {
  TextInput: {
    background: "lightgrey",
    padding: "20px",
    margin: "20px",
    textAlign: 'center'
  },

  TextArea: {
    background: "lightgrey",
    padding: "20px",
    margin: "20px",
    textAlign: 'center'
  },

  CheckBox: {
    background: "lightgrey",
    padding: "20px",
    margin: "20px",
    textAlign: 'center'
  },

  RadioButton: {
    background: "lightgrey",
    padding: "20px",
    margin: "20px",
    textAlign: 'center'
  },

  FormSection: {
    background: "#f3ea5f",
    padding: "20px",
    margin: "20px",
    textAlign: 'center'
  },

  Remove: {
    background: "red",
    padding: "20px",
    margin: "20px",
    textAlign: 'center',
    textAlign: 'center'
  }
}

let entityTypes = ['FormSection', 'CheckBox', 'TextArea', 'TextInput', 'RadioButton']



let dragover_handler = (event) => {
  event.preventDefault();
}

let dragleave_handler = (event) => {
  event.preventDefault();
}

const DeleteBtn = (props) => {
  let drop_handler = (event) => {
    let test = JSON.parse(event.dataTransfer.getData("address"))
    props.removeformentity(test.address)
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
      ...headerPanelStyle, backgroundColor: "lightgrey", border: '0px dashed #f3ea5f', margin: '0px 20px 0px'
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
      mutateformentity={props.mutateformentity}
      activeTab={props.activeTab}
    />
    {console.log(props.form.children())}
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
          mutateformentity={this.props.mutateformentity}
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