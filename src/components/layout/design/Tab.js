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
    props.changetab(props.currentTab)  }

  let deleteTab_handler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('remove this tab: ', props.activeTab)
    props.removeformentity([props.currentTab])
    props.changetab(props.activeTab - 1 >= 0 ? props.activeTab - 1 : props.currentTab - 1)  }

  let dragstart_handler = function (event) {
    console.log(event, props.model, props.form, 'move')
    aux.dragStart_handler(event, props.model, props.form, 'move')
  }

  let onDragEnterHandler = (event) => {
    // event.preventDefault();
    event.stopPropagation();
    setTimeout(function () { props.changetab(props.currentTab) }, 1000);
      }
  return (

    <div
      style={{ ...TabStyle, backgroundColor: (props.currentTab === props.activeTab) ? "white" : TabStyle.backgroundColor }}
      onClick={onClickHandler}
      draggable="true"
      onDragStart={dragstart_handler}
      onDragEnter={onDragEnterHandler}
      removeformentity={props.removeformentity}
    >
      Tab # {props.currentTab + 1}
      <button
        style={TabButtonStyle}
        onClick={deleteTab_handler}
        removeformentity={props.removeformentity}
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