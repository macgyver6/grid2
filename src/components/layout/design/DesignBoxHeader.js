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
// console.log(props.activeTab.length)
  let onClickHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // adds new FormSection at the end
    console.log('add new tab here: ', [props.form.children().length])
    props.add([props.form.children().length], new FormSection({
      uuid: undefined, type: 'FormSection', width: 24, children: [], legend: 'string', prepend: 3, append: 4
    }))
    props.changetab(props.form.children().length)
  }

  return (
    <div
      style={DesignBoxHeaderStyle}
      mutate={props.mutate}
      >

      <div style={TabContainerStyle}
        mutate={props.mutate}
       >

         { props.form.children().map((tab, index) =>
            <Tab
              id={`${props.activeTab}.tab`}
              model={props.form.children()[index]}
              form={props.form}
              currentTab={index }
              key={index}
              changetab={props.changetab}
              activeTab={props.activeTab}
              remove={props.remove}
              add={props.add}
              mutate={props.mutate}
              formmutate={props.formmutate}
              />
          )}


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
