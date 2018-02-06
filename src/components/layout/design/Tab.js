import React from 'react';

import {
  TabStyle,
  TabButtonStyle
} from '../styles/DesignBox'
import { helpers } from '../../../helpers';
import { address } from '../../../address';


// import {
//   addTab,
//   selectTab,
//   deleteTab
// } from '../auxillary/actions/design'
var dragged = null;

const Tab = (props) => {
  let onClickHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.changetab(props.currentTab)
  }

  let deleteTab_handler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('remove this tab: ', props.activeTab)

    console.log(props.currentTab)
    const whichTab = () => {
      if (props.activeTab === 0) {
        return 0
      }
      if (props.activeTab === props.currentTab && props.form.children().length - 1 !== props.currentTab) {
        return props.currentTab
      }
      if (props.activeTab === props.currentTab && props.form.children().length - 1 === props.currentTab) {
        return props.currentTab - 1
      }
      if (props.activeTab !== props.currentTab) {
        console.log('here: ', props.form.children().length)
        return props.form.children().length - 2
      }
    }
    props.remove([props.currentTab])
    console.log('remove this one: ', [props.currentTab], 'change active tab to: ', whichTab())
    props.changetab(whichTab())
  }
  // props.changetab(props.activeTab - 1 >= 0 ? props.activeTab : props.currentTab - 1)  }

  let obj = {
    origin: null,
    destination: null
  }

  let dragstart_handler = (event) => {
    // helpers.dragStart_handler(event, props.model, props.form)
    event.dataTransfer.setData("tab", JSON.stringify({
      // action: action,
      address: address.bySample(props.model, props.form),
    }));
    // obj.origin = address.bySample(props.model, props.form)
    // event.target.parentNode.children[1].removeEventListener("dragover", onDragOverHandler)
    // ((tab) => { tab.removeEventListener("dragover", onDragOverHandler)})
  }

  let onDragOverHandler = (event) => {
    // event.preventDefault();
    event.stopPropagation();
    // console.log(event.target.currentTarget)
    if (event.dataTransfer.types[0] !== 'tab') {

      let element = event.target.style.backgroundColor
      const alternateInterval = (event) => setInterval(alternate(event, 1000));
      const alternate = (event) => {
        // console.log(event.target)
        element === 'grey' ? event.target.style.backgroundColor = 'rgb(2, 117, 216)' : event.target.style.backgroundColor = 'grey'
      }
      alternateInterval(event)
      setTimeout(() => {
        clearInterval(alternateInterval);
        props.changetab(props.currentTab)
      }, 1000);
    } else {
      // rearrange the tabs
      event.preventDefault()
      const destination = address.bySample(props.model, props.form)
      const origin = address.bySample(props.model, props.form)

      const div = document.createElement('div');
      // // div.style = AddToEnd;
      // div.style.width = '20px',
      // div.style.height = '100px',
      // div.style.position = 'absolute',
      // div.style.left = '-20px',
      //       div.backgroundColor = 'red'
      // event.target.appendChild(div)
      obj.destination = address.bySample(props.model, props.form)

      // destinationAddress[0] > dropData.address[0] ? destinationAddress[0] - 1 : destinationAddress[0]
        event.target.style.backgroundColor = 'lightgreen'
        // event.target.style.borderRight = '10px solid lightgreen'
        // event.target.style.borderLeft = '6px solid blue'
    }
  }

  let dragLeave_handler = (event) => {
    event.target.style.backgroundColor = 'grey';
    // event.target.style.backgroundColor = 'rgb(2, 117, 216)';
    event.target.style.removeProperty('border')
  }

  let drop_handler = (event) => {
    event.stopPropagation();
    const dropData = JSON.parse(event.dataTransfer.getData('tab'));
    const droppedEntity = address.byPath(props.form, dropData.address)
    event.target.style.removeProperty('border')
    const _children = [...props.form.children()]
    const destinationAddress = address.bySample(props.model, props.form)



    const reorderArray = (event, originalArray) => {
      console.log(event, originalArray)
      const movedItem = originalArray.filter((item, index) => index === event.oldIndex);
      const remainingItems = originalArray.filter((item, index) => index !== event.oldIndex);

      const reorderedItems = [
        ...remainingItems.slice(0, event.newIndex),
        movedItem[0],
        ...remainingItems.slice(event.newIndex)
      ];

      return reorderedItems;
    }
    props.formmutate([], reorderArray(
      {
        newIndex: destinationAddress[0] > dropData.address[0] ? destinationAddress[0] - 1 : destinationAddress[0]
        , oldIndex: dropData.address[0]
      }, _children))
    props.changetab(destinationAddress[0])
    event.target.style.backgroundColor = 'lightgrey'
  }

  let dragEnter_handler = (event) => {
    console.log(event.dataTransfer.getData('address'))
  }

  let mouseDown_handler = (event) => {
    console.log(event.target)
  }

  let change_handler = (event) => {
    // event.target.style.backgroundColor = 'rgb(2, 117, 216)';
    const location = address.bySample(props.model, props.form)
    props.mutate(location,
      {
        legend: event.target.value
      })
  }
  { console.log(props.model) }

  return (
    <div
      style={{
        ...TabStyle,
        backgroundColor: (props.currentTab === props.activeTab) ? "#0275D8" : TabStyle.backgroundColor,
        fontWeight: (props.currentTab === props.activeTab) ? '900' : '100'
      }}
      id={`${props.form.children()[props.currentTab].UUID()}.tab`}
      className='tab'
      onClick={onClickHandler}
      draggable="true"
      onDragStart={dragstart_handler}
      onDragOver={onDragOverHandler}
      onDragEnter = {dragEnter_handler}
      onMouseDown = {mouseDown_handler}
      onDragLeave={dragLeave_handler}
      onDrop={drop_handler}

    >
      {/* {props.form.children()[props.currentTab].UUID().slice(props.form.children()[props.currentTab].UUID().length - 4, props.form.children()[props.currentTab].UUID().length)} */}
      {/* {props.activeTab === props.currentTab ? 'yes': 'no'} */}
      <input
        className="form-control"
        type={props.model.type()}
        onChange={change_handler}
        value={props.model.legend()}
        size={'6'}
      // maxlength={"4"}
      />
      <button
        style={TabButtonStyle}
        onClick={deleteTab_handler}
      >
        {/* <button
          style={TabButtonStyle}
          onClick={(e) => { e.stopPropagation(); handleApplicationAction(deleteTab(tab)) }}> */}
        X
        </button>
    </div>
  );
};

export default Tab;