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

  let dragstart_handler = function (event) {
    console.log(event, props.model, props.form, 'move')
    helpers.dragStart_handler(event, props.model, props.form, 'move')
  }

  let onDragOverHandler = (event) => {
    // event.preventDefault();
    event.stopPropagation();
    let element = event.target.style.backgroundColor
    const alternateInterval = (event) => setInterval(alternate(event, 1000));
    const alternate = (event) => {
      // console.log(event.target)
      element === 'grey' ? event.target.style.backgroundColor = 'rgb(2, 117, 216)' : event.target.style.backgroundColor = 'grey'
    }
    console.log(event.target.style.backgroundColor)
    alternateInterval(event)
    setTimeout(() => {
      clearInterval(alternateInterval);
      props.changetab(props.currentTab)
    }, 1000);
  }

  let dragLeave_handler = (event) => {
    event.target.style.backgroundColor = 'rgb(2, 117, 216)';
  }

  let change_handler = (event) => {
    // event.target.style.backgroundColor = 'rgb(2, 117, 216)';
    const location = address.bySample(props.model, props.form)
    props.mutate(location,
      {
        legend: event.target.value
      })
  }
  return (

    <div
      style={{
        ...TabStyle,
        backgroundColor: (props.currentTab === props.activeTab) ? "#0275D8" : TabStyle.backgroundColor,
        fontWeight: (props.currentTab === props.activeTab) ? '900' : '100'
      }}
      id={props.form.children()[props.currentTab].UUID()}
      onClick={onClickHandler}
      // draggable="true"
      onDragStart={dragstart_handler}
      onDragOver={onDragOverHandler}
      onDragLeave={dragLeave_handler}
    >
      {/* {props.form.children()[props.currentTab].UUID().slice(props.form.children()[props.currentTab].UUID().length - 4, props.form.children()[props.currentTab].UUID().length)} */}
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