import React from 'react'
import {
  DesignBoxHeaderStyle,
  DesignBoxHeaderTabContainerStyle,
  DesignBoxHeaderButtonStyle
} from '../styles/DesignBox'
import { FormSection } from '../../../data/FormSection';

// import {
//   addTab
// } from '../auxillary/actions/design'

import DesignBoxHeaderTab from './DesignBoxHeaderTab';

let DesignBoxHeader = (props) => {
// console.log(props.tabs.length)
  let onClickHandler = (event) => {
    // adds new FormSection at the end
    props.addformentity(new FormSection({
      uuid: undefined, type: 'FormSection', width: 24, children: [], legend: 'string', prepend: 3, append: 4
    }), [props.tabs.length])
  }

  return (
    <div style={DesignBoxHeaderStyle}>

      <div style={DesignBoxHeaderTabContainerStyle}>

        {props.tabs ?
          props.tabs.map((tab, index) =>
            <DesignBoxHeaderTab
              tab={index + 1}
              key={index}
              changetab={props.changetab}
              activeTab={props.activeTab}
              />
          )
          : null
        }

      </div>
      <button
        style={DesignBoxHeaderButtonStyle}
        onClick={onClickHandler}
      >
        +
        </button>

    </div>
  );
}


export default DesignBoxHeader;
