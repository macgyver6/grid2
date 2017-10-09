import React from 'react'
import {
  DesignBoxHeaderStyle,
  DesignBoxHeaderTabContainerStyle,
  DesignBoxHeaderButtonStyle
} from '../styles/DesignBox'

// import {
//   addTab
// } from '../auxillary/actions/design'

// import DesignBoxHeaderTab from './DesignBoxHeaderTab'

class DesignBoxHeader extends React.Component {
  render() {
    // let { tabs, selected_tab, handleApplicationAction } = this.props;

    return (
      <div style={DesignBoxHeaderStyle}>

        <div style={DesignBoxHeaderTabContainerStyle}>
          {/* {
            tabs.map((tab) => {
              return <DesignBoxHeaderTab
                key={tab} tab={tab}
                selected={tab === selected_tab}
                handleApplicationAction={this.props.handleApplicationAction} />
            })
          } */}
        </div>

        {/* <button
          style={DesignBoxHeaderButtonStyle}
          onClick={() => handleApplicationAction(addTab())}>
          +
        </button> */}
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
