import React from 'react'
import {
  DesignBoxHeaderStyle,
  TabContainerStyle,
  DesignBoxHeaderButtonStyle,
  TabStyle
} from '../styles/DesignBox'
import { FormSection } from '../../../data/FormSection';
import { defaultPropsFE } from '../../../constants/defaultPropsFE'


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
    props.add([props.form.children().length], new FormSection(defaultPropsFE[FormSection]))
    props.changetab(props.form.children().length)
  }

  const allowAddTab = (props) => props.form.children().length < 7 ? true : false

  const mouseEnter_handler = (event) => {
    /*
      1. push a ghosted tab to the model
      2. becasue the lenght > 1, these tabs will render below
    */

    var tab = document.createElement('div')
    tab.style.textAlign = 'center',
      tab.style.padding = '10px',
      tab.style.width = "10%",
      tab.style.height = "40%",
      tab.style.marginTop = '4px',
      tab.style.marginLeft = '4px',
      tab.style.borderTop = '.25px solid darkgrey',
      tab.style.borderLeft = '.25px solid darkgrey',
      tab.style.borderRight = '.25px solid darkgrey',
      tab.style.borderBottom = props.form.children().length < 7 ? '3px solid white' : '3px solid red',
      tab.style.backgroundColor = allowAddTab(props) ? 'white' : 'red',
      // tab.style.border = "0.25px solid white",
      tab.innerHTML = allowAddTab(props) ? 'click to add' : '<strong>max tabs</strong>'

    document.getElementById(
      'tabcontainer').appendChild(tab)
    allowAddTab(props) ? document.getElementById('tabcontainer').style.backgroundColor = 'rgb(243, 234, 95)' : null
  }

  const mouseLeave_handler = (event) => {
    // props.remove([props.form.children().length - 1])
    const tabContainer = document.getElementById(
      'tabcontainer')
    tabContainer.removeChild(tabContainer.children[tabContainer.children.length - 1])
    document.getElementById('tabcontainer').style.backgroundColor = 'darkgrey'
  }



  const click_handler = (event) => {
    const dummyTab = document.getElementById(
      'tabcontainer').children[document.getElementById(
        'tabcontainer').children.length - 1]
    if (allowAddTab(props)) {
      props.add([props.form.children().length], new FormSection({
        uuid: undefined, type: 'FormSection', width: 24, children: [], legend: 'new Tab', prepend: 0, append: 0
      }))
      props.changetab(props.form.children().length)
    }

    if (props.form.children().length > 5) {
      console.log('too many')
      const myTimer =
        setInterval(function () {
          alternateInterval()
        }, 300);

      var currentColor = 'red';
      const alternateInterval = () => {
        console.log('called')
        dummyTab.style.backgroundColor = currentColor;
        dummyTab.style.borderBottom = currentColor;
        // dummyTab.style.borderBottom = currentColor;
        currentColor = currentColor === 'red' ? 'white' : 'red';
      }
      dummyTab.innerHTML = '<strong>max tabs</strong>'

      setTimeout(() => {
        console.log('cleared')
        clearInterval(myTimer);
        dummyTab.style.backgroundColor = 'red'
        dummyTab.style.borderBottom = '4px solid red'
      }, 1800);
    }
    // if (props.form.children().length > 6) {
    //   dummyTab.style.backgroundColor = 'white'
    // } else {

    // }
  }

  const renderTabs = (props) => {
    return props.form.children().map((tab, index) =>
      <Tab
        id={`${props.activeTab}.tab`}
        model={props.form.children()[index]}
        form={props.form}
        currentTab={index}
        key={index}
        changetab={props.changetab}
        activeTab={props.activeTab}
        remove={props.remove}
        add={props.add}
        mutate={props.mutate}
        formmutate={props.formmutate}
      />
    )
  }

  return (

    <div
      style={TabContainerStyle}
      mutate={props.mutate}
      id='tabcontainer'
      mutate={props.mutate}
      onMouseEnter={mouseEnter_handler}
      onMouseLeave={mouseLeave_handler}
      onClick={click_handler}
    >
      {/* if there is only 1 formSection - collapse the tab bar */}
      {props.form.children().length > 1 ? renderTabs(props) : null}

    </div>

  );
}


export default DesignBoxHeader;
