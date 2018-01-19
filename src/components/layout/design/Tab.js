import React from 'react';

import {
  TabStyle,
  TabButtonStyle
} from '../styles/DesignBox'
import { aux } from '../../../constants/aux';


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
    props.removeformentity([props.currentTab])
    console.log('remove this one: ', [props.currentTab], 'change active tab to: ', whichTab())
    props.changetab(whichTab())
  }
  // props.changetab(props.activeTab - 1 >= 0 ? props.activeTab : props.currentTab - 1)  }

  let dragstart_handler = function (event) {
    console.log(event, props.model, props.form, 'move')
    aux.dragStart_handler(event, props.model, props.form, 'move')
  }

  let onDragOverHandler = (event) => {
    // event.preventDefault();
    event.stopPropagation();
    setTimeout(function () { props.changetab(props.currentTab) }, 1000);
  }
  return (

    <div
      style={{
        ...TabStyle,
        backgroundColor: (props.currentTab === props.activeTab) ? "#0275D8" : TabStyle.backgroundColor,
        fontWeight: (props.currentTab === props.activeTab) ? '900' : '100'
      }}
      onClick={onClickHandler}
      // draggable="true"
      onDragStart={dragstart_handler}
      onDragOver={onDragOverHandler}
    >
      Tab # {props.currentTab + 1}
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