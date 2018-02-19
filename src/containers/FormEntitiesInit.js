import React, { Component } from 'react';
import { FileData } from '../data/FileData';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import FormComponent from '../components/FormEntities/Form';
import { utility } from '../utility';
import { address } from '../address';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { helpers } from '../helpers';
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
      remove={props.remove}
      add={props.add}
      mutate={props.mutate}
      changetab={props.changetab}
      activeTab={props.activeTab}
    />
    <MiddlePanel
      form={props.form}
      remove={props.remove}
      add={props.add}
      mutate={props.mutate}
      formmutate={props.formmutate}
      changetab={props.changetab}
      activeTab={props.activeTab} />
    <RightPanel />
  </div>

const selectionStyles = {
  TextInput: {
    background: "#6C788F",
    padding: "20px",
    margin: "20px",
    textAlign: 'center'
  },

  TextArea: {
    background: "#205EE2",
    padding: "20px",
    margin: "20px",
    textAlign: 'center'
  },

  CheckBox: {
    background: "#00C5EC",
    padding: "20px",
    margin: "20px",
    textAlign: 'center'
  },

  RadioButton: {
    background: "#304061",
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
    background: "#ff5f56",
    padding: "20px",
    margin: "20px",
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
    console.log(event.dataTransfer.getData("address"))
    let data = JSON.parse(event.dataTransfer.getData("address"))
    const draggedEntity = address.byPath(props.form, data.address)






    /* Begin */

    const total = (entity) => entity.prepend() + entity.width() + entity.append();

    // const _parentChildren = [...parentEntity.children()]
    /**returns true if entity path provided is firstInRow; false if not
     * * @param {array} before - Path of the current entity
    */
    const firstInRow = (entityAddress) => {
      const section = address.byPath(props.form, entityAddress.slice(0, entityAddress.length - 1))
      // console.log(entityAddress )
      const _entityAddress = (entityAddress.slice(entityAddress.length - 1, entityAddress.length + 1) - 1)
      var runningTotal = 0;
      // console.log(_entityAddress, section.children())
      for (var i = 0; i <= _entityAddress; ++i) {
        // console.log(section)
        runningTotal += total(section.children()[i]);
      }
      return (runningTotal % section.width() === 0) ? true : false;
    }


    const restoreDonorSiblingAddress = (arr, props, draggedEntity) => {
      // get donor's parent
      const donorParent = address.byPath(props.form, arr.slice(0, arr.length - 1))
      console.log(arr, props, draggedEntity)
      const toLeft = (arr) => {
        const _toLeft = [...arr]
        console.log({ address: _toLeft, entity: address.byPath(props.form, _toLeft) })
        _toLeft[arr.length - 1] = _toLeft[arr.length - 1] - 1
        return ({ address: _toLeft, entity: address.byPath(props.form, _toLeft) })
      }
      const toRight = (arr) => {
        const _toRight = [...arr]
        _toRight[arr.length - 1] = _toRight[arr.length - 1] + 1
        return ({
          address: _toRight,
          entity: address.byPath(props.form, _toRight)
        })
      }
      console.log((donorParent.children().length - 1 === arr[arr.length - 1]) && firstInRow(arr))
      /** if only 1 child in section or the donor entity is the last entity in section */
      if (donorParent.children().length === 1 || (donorParent.children().length - 1 === arr[arr.length - 1]) && firstInRow(arr)) {
        // if (donorParent.children().length === 1 || (donorParent.children().length - 1 === arr[arr.length - 1])) {
        return false
      } else if (firstInRow(arr)) {
        console.log('firstInRow: ', toRight(arr))
        return ({
          address: toRight(arr).address,
          properties:
            { prepend: toRight(arr).entity.prepend() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append() }
        })
      } else {
        return ({
          address: toLeft(arr).address,
          properties: {
            append: toLeft(arr).entity.append() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append()
          }
        })
      }
    }

    /* End */
    const toBeMutatedRestore = restoreDonorSiblingAddress(data.address, props, draggedEntity);

    if (toBeMutatedRestore) {
      props.mutate(toBeMutatedRestore.address, toBeMutatedRestore.properties)
    }

    console.log('remove entity at this address: ', data.address, address.byPath(props.form, data.address))
    console.log(JSON.parse(event.dataTransfer.getData('address')).address)
    props.remove(data.address)
    const currentTab = JSON.parse(event.dataTransfer.getData('address')).address;
    console.log(currentTab[0])

    if (currentTab.length === 1) {
      const whichTab = () => {
        if (props.activeTab === 0) {
          console.log('here')
          return 0
        }
        if (props.activeTab === currentTab[0] && props.form.children().length - 1 !== currentTab[0]) {
          console.log('here')
          return props.form.children().length
        }
        console.log(props.activeTab, currentTab[0], props.form.children().length - 1)
        if (props.activeTab === currentTab[0] && props.form.children().length - 1 === currentTab[0]) {
          console.log('here')
          return props.form.children().length - 1
        }
        if (props.activeTab !== currentTab[0]) {
          console.log('here: ', props.form.children().length)
          return props.form.children().length - 1
        }
        // return currentTab[0]
      }
      console.log(event.target, currentTab[0])
      console.log('change current tab to: ', whichTab() - 1)
      props.changetab(whichTab() - 1)
    }

    // console.log(props.activeTab)
    // console.log((props.activeTab - 1 >= 0 ? props.activeTab - 1 : currentTab[0] - 1))
    // props.changetab(props.activeTab - 1 >= 0 ? props.activeTab - 1 : currentTab[0] - 1)
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

const LeftPanel = (props) => {
  console.log(props.form)
  const dragstart_handler = (event) => {
    helpers.dragStart_handler(event, defaultPropsFE[event.target.dataset.type], props.form, 'addEntity')

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

  return <div
    style={leftPanelStyle}
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
      remove={props.remove}
      mutate={props.mutate}
    />
  </div>
}

const MiddlePanel = (props) => {
  return <div
    style={middlePanelStyle}
  >
    <div >

      <DesignBoxHeader
        form={props.form}
        add={props.add}
        remove={props.remove}
        mutate={props.mutate}
        formmutate={props.formmutate}
        changetab={props.changetab}
        activeTab={props.activeTab}
      />

    </div>
    <FormComponent
      form={props.form}
      remove={props.remove}
      add={props.add}
      mutate={props.mutate}
      activeTab={props.activeTab}
    />
  </div>
}

const dragOverFile_handler = (event) => {
  event.preventDefault()
}

const saveFileToLocal = (file, name) => {
  var fileReader = new FileReader();
  const existing = localStorage.getItem('FILE')
  fileReader.readAsDataURL(file);
  fileReader.onload = (evt) => {
    var result = evt.target.result;
    if (existing === null) {
      try {
        console.log([{ [name]: result }])
        localStorage.setItem('FILE', JSON.stringify([{ [name]: result }]))
      } catch (e) {
        console.log("Storage failed: " + e);
      }
    } else {
      // console.log(JSON.parse(existing).concat([{ [name]: result }]))
      // console.log(existing)
      localStorage.setItem('FILE', JSON.stringify(JSON.parse(existing).concat([{ [name]: result }])))
    }
  }
}

const handleFiles = (files) => {
  const item = files.getAsFile()

  // Create XHR, Blob and FileReader objects
  var xhr = new XMLHttpRequest()
  var blob
  var fileReader = new FileReader();

  xhr.open("GET", "/pdf/download?id=");
  xhr.responseType = "blob";
  xhr.onload = () => {
    console.log(files) // response as a blob
    if (xhr.status && xhr.status === 200) {
      console.log(20)
      saveFileToLocal(xhr.response, item.name);
      // console.log({ [item.name]: xhr.response })
      // return { [item.name]: xhr.response }
    }
  }

  xhr.send();
}

// const handleArray = (item) => {

// }

const dropFile_handler = (event) => {
  console.log("Drop");
  event.preventDefault();
  // If dropped items aren't files, reject them
  var dt = event.dataTransfer;
  if (dt.items) {
    // Use DataTransferItemList interface to access the file(s)
    console.log(dt.items[0].getAsFile())
    const f = []
    for (var i = 0; i < dt.items.length; i++) {
      if (dt.items[i].kind == "file") {
        console.log(handleFiles(dt.items[i]))
        f.push(handleFiles(dt.items[i]));
        // f.push(dt.items[i].getAsFile());
        console.log("... file[" + i + "].name = " + f.name);
        // handleFiles(dt.items)
      }
    }
    console.log(f)



  }
}
const stringOfFiles = localStorage.getItem('FILE')
const fileNames = stringOfFiles ? JSON.parse(stringOfFiles).map(file => { return Object.keys(file)[0] }) : null;
console.log(fileNames)
const RightPanel = () =>
  <div
    style={rightPanelStyle}
    onDragOver={dragOverFile_handler}
    onDrop={dropFile_handler}>
    <h1>Uploaded Files</h1>
    <ul>
      {fileNames ? fileNames.map(name => <li>{name}</li>) : null}
    </ul>
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
          remove={this.props.remove}
          add={this.props.add}
          formmutate={this.props.formmutate}
          mutate={this.props.mutate}
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