import React from 'react'

import {
  DesignBoxHeaderTabStyle,
  DesignBoxHeaderTabButtonStyle
} from '../styles/DesignBox'

// import {
//   addTab,
//   selectTab,
//   deleteTab
// } from '../auxillary/actions/design'

class DesignBoxHeaderTab extends React.Component {
  render(props) {
    let { tab, selected, handleApplicationAction } = this.props;
    return (
      <div
        style={{ ...DesignBoxHeaderTabStyle, backgroundColor: (selected) ? "white" : DesignBoxHeaderTabStyle.backgroundColor }}
        >
        Tab # {this.props.tab}
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
  }
};

export default DesignBoxHeaderTab;