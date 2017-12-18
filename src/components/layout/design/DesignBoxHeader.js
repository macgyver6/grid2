import React from 'react'
import {
  DesignBoxHeaderStyle,
  TabContainerStyle,
  DesignBoxHeaderButtonStyle
} from '../styles/DesignBox'
import { FormSection } from '../../../data/FormSection';

// import {
//   addTab
// } from '../auxillary/actions/design'

import Tab from './Tab';

let DesignBoxHeader = (props) => {
// console.log(props.tabs.length)
  let onClickHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // adds new FormSection at the end
    props.addformentity(new FormSection({
      uuid: undefined, type: 'FormSection', width: 24, children: [], legend: 'string', prepend: 3, append: 4
    }), [props.tabs.length])
  }

  return (
    <div style={DesignBoxHeaderStyle}>

      <div style={TabContainerStyle}>

        {props.tabs ?
          props.tabs.map((tab, index) =>
            <Tab
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
