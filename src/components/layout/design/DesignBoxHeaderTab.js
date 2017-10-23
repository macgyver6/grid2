import React from 'react';

import {
  DesignBoxHeaderTabStyle,
  DesignBoxHeaderTabButtonStyle
} from '../styles/DesignBox'

// import {
//   addTab,
//   selectTab,
//   deleteTab
// } from '../auxillary/actions/design'

const DesignBoxHeaderTab = (props) => {
  let onClickHandler = (event) => { props.changetab(props.tab)  }
  return (

    <div
      style={{ ...DesignBoxHeaderTabStyle, backgroundColor: (props.tab === props.activeTab) ? "white" : DesignBoxHeaderTabStyle.backgroundColor }}
      onClick={onClickHandler}
    >
      Tab # {props.tab}
      <button
        style={DesignBoxHeaderTabButtonStyle}
      >
        {/* <button
          style={DesignBoxHeaderTabButtonStyle}
          onClick={(e) => { e.stopPropagation(); handleApplicationAction(deleteTab(tab)) }}> */}
        X
        </button>
    </div>
  );
};

export default DesignBoxHeaderTab;