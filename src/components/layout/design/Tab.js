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
    props.changetab(props.tab)  }

  let dragstart_handler = function (event) {
    console.log(event, props.model, props.form, 'move')
    aux.dragStart_handler(event, props.model, props.form, 'move')
  }

  let onDragEnterHandler = (event) => {
    // event.preventDefault();
    event.stopPropagation();
    setTimeout(function () { props.changetab(props.tab) }, 1000);
      }
  return (

    <div
      style={{ ...TabStyle, backgroundColor: (props.tab === props.activeTab) ? "white" : TabStyle.backgroundColor }}
      onClick={onClickHandler}
      draggable="true"
      onDragStart={dragstart_handler}
      onDragEnter={onDragEnterHandler}
    >
      Tab # {props.tab}
      <button
        style={TabButtonStyle}
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