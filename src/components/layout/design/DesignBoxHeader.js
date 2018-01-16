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
// console.log(props.topLevelFormSections.length)
  let onClickHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // adds new FormSection at the end
    props.addformentity(new FormSection({
      uuid: undefined, type: 'FormSection', width: 24, children: [], legend: 'string', prepend: 3, append: 4
    }), [props.topLevelFormSections.length])
  }

  return (
    <div
      style={DesignBoxHeaderStyle}
      model={props.model}
      form={props.form}
      >

      <div style={TabContainerStyle}
        model={props.model}
        form={props.form}>

        {props.topLevelFormSections ?
          props.topLevelFormSections.map((tab, index) =>
            <Tab
              id={`${props.activeTab}.tab`}
              model={props.form.children()[index]}
              form={props.form}
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
