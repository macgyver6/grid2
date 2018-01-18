import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import FormComponent from '../components/FormEntities/Form';
import { utility } from '../utility';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import CheckBox from '../components/FormEntities/CheckBox.js'
import { aux } from '../constants/aux';
import {
  backgroundPanelStyle,
  leftPanelStyle,
  middlePanelStyle,
  rightPanelStyle,
  headerPanelStyle,
} from '../components/layout/styles/Layout';
import DesignBoxHeader from '../components/layout/design/DesignBoxHeader';

const BackgroundPanel = (props) =>
  <div style={backgroundPanelStyle}>
    <LeftPanel
      form={props.form}
      removeformentity={props.removeformentity}
      addformentity={props.addformentity}            mutateformentity={props.mutateformentity}            />
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
    let data = JSON.parse(event.dataTransfer.getData("address"))
    const draggedEntity = utility.findEntityByPath(props.form, data.address)
    const restoreDonorSiblingAddress = (arr) => {
      // get donor's parent
      const donorParent = utility.findEntityByPath(props.form, arr.slice(0, arr.length - 1))
      if (arr.length <= 2) {return false}
      if (donorParent.children().length === 1) {
        return false
      } else {
        const toLeft = (arr) => {
          const _toLeft = [...arr]
          if (_toLeft[arr.length - 1] < 1) {
            return false
          }
          _toLeft[arr.length - 1] = _toLeft[arr.length - 1] - 1
          return ({ address: _toLeft, entity: utility.findEntityByPath(props.form, _toLeft) })
        }
        const toRight = (arr) => {
          const _toRight = [...arr]
          _toRight[arr.length - 1] = _toRight[arr.length - 1] + 1
          return ({
            address: _toRight,
            entity: utility.findEntityByPath(props.form, _toRight)
          })
        }

        if (toLeft(arr)) {
          console.log('previous entity exists, adding to append: ', toLeft(arr).address)
          return ({
            address: toLeft(arr).address,
            properties: {
              append: toLeft(arr).entity.append() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append()
            }
          })
        } else {
          console.log('no previous entity exists, adding to prepend')
          return ({
            address: toRight(arr).address,
            properties:
              { prepend: toRight(arr).entity.prepend() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append() }
          })
        }
      }
    }

    if (restoreDonorSiblingAddress(data.address)) {
      console.log('mutate this donor: ', utility.findEntityByPath(props.form, restoreDonorSiblingAddress(data.address).address), restoreDonorSiblingAddress(data.address).address, restoreDonorSiblingAddress(data.address).properties)

      props.mutateformentity(restoreDonorSiblingAddress(data.address).address, restoreDonorSiblingAddress(data.address).properties)
    }

    console.log(utility.findEntityByPath(props.form, data.address))
    props.removeformentity(data.address)
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
  {
    console.log(props.form)
    const dragstart_handler = (event) => {
  aux.dragStart_handler(event, defaultPropsFE[event.target.dataset.type], props.form, 'addEntity')

  // event.dataTransfer.setData("text/plain",
  //   JSON.stringify({
  //     action: 'addEntity',
  //     model: defaultPropsFE[event.target.dataset.type]
  //   }));
  // var test = document.createElement('div');
  // test.style.width = '100px';
  // test.style.height = '100px';
  // // test.style.position = 'fixed';
  // // test.style.top = '-1000000px';
  // // test.style.left = '-1000000px';
  // test.style.border = '2px solid red';
  // document.body.appendChild(test);
  // event.dataTransfer.setDragImage(test, 0, 0)
  let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8
  console.log(bgrndGrdWidth)
  const type = event.target.dataset.type
  const div = document.createElement('div');
  div.id = "dmg";
      div.style.width = `${defaultPropsFE[type].width * bgrndGrdWidth}px`;
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

    return <div style={leftPanelStyle}
    form={props.form}
  >
    {entityTypes.map((entity, index) => {
      return (
        <div
          key={index}
          draggable="true"
          form={props.form}
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
      mutateformentity={props.mutateformentity}
    />
  </div>}

const MiddlePanel = (props) => {
  return <div
    style={middlePanelStyle}
    addformentity={props.addformentity}
    removeformentity={props.removeformentity} >
    <div style={{
      ...headerPanelStyle, backgroundColor: "lightgrey", border: '0px dashed #f3ea5f', margin: '0px 20px 0px'
    }}>
      {props.form.sectionTabs() ?
        <DesignBoxHeader
          form={props.form}
          activeTab={props.form.children()}
          addformentity={props.addformentity}
          removeformentity={props.removeformentity}
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