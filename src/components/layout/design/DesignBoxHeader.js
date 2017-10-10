import React from 'react'
import {
  DesignBoxHeaderStyle,
  DesignBoxHeaderTabContainerStyle,
  DesignBoxHeaderButtonStyle
} from '../styles/DesignBox'

// import {
//   addTab
// } from '../auxillary/actions/design'

import DesignBoxHeaderTab from './DesignBoxHeaderTab'

class DesignBoxHeader extends React.Component {
  render(props) {
    // let { tabs, selected_tab, handleApplicationAction } = this.props;

    return (
      <div style={DesignBoxHeaderStyle}>

        <div style={DesignBoxHeaderTabContainerStyle}>

          {this.props.tabs.map((tab, index) =>
            <DesignBoxHeaderTab
              tab={index + 1}
              key={index} />
          )}

        </div>
        <button
          style={DesignBoxHeaderButtonStyle}
        >
          +
        </button>

      </div>
    );
  }
};

export default DesignBoxHeader;
