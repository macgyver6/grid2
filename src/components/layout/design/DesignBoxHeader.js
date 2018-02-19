import React from 'react'
import {
  DesignBoxHeaderStyle,
  TabContainerStyle,
  DesignBoxHeaderButtonStyle,
  TabStyle
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
  const TabStyle2 = {
    textAlign: 'center',
    padding: '10px',
    // verticalAlign: 'middle',
    width: "200px",
    height: "100px",
    marginTop: "2%",
    marginLeft: "1%",
    backgroundColor: "blue",
    border: "0.25px solid white"
  }
  const allowAddTab = (props) => props.form.children().length < 6 ? true : false


  const mouseOver_handler = (event) => {
    console.log('ghost the possible tab')
    /*
      1. push a ghosted tab to the model
      2. becasue the lenght > 1, these tabs will render below
    */

    var tab = document.createElement('div')
    // tab.style.background = 'red'
    tab.style.textAlign = 'center',
      tab.style.padding = '10px',
      // verticalAlign: 'middle',
      tab.style.width = "10%",
      tab.style.height = "40%",
      tab.style.marginTop = "2%",
      tab.style.marginLeft = "1%",
      tab.style.backgroundColor = allowAddTab(props) ? 'rgb(243, 234, 95)' : 'red',
      // tab.style.border = "0.25px solid white",
      tab.innerHTML = allowAddTab(props) ? 'click to add' : '<strong>max tabs</strong>'

    document.getElementById(
      'tabcontainer').appendChild(tab)
  }

  const mouseLeave_handler = (event) => {
    // props.remove([props.form.children().length - 1])
    const tabContainer = document.getElementById(
      'tabcontainer')
    tabContainer.removeChild(tabContainer.children[tabContainer.children.length - 1])
  }



  const click_handler = (event) => {
    if (allowAddTab(props)) {
      props.add([props.form.children().length], new FormSection({
        uuid: undefined, type: 'FormSection', width: 24, children: [], legend: 'new Tab', prepend: 3, append: 4
      }))
      props.changetab(props.form.children().length)
    } else {
      const dummyTab = document.getElementById(
        'tabcontainer').children[document.getElementById(
          'tabcontainer').children.length - 1]
      dummyTab.innerHTML = '<strong>max tabs</strong>'

      const myTimer =
        setInterval(function () {
         alternateInterval()
        }, 300);

      var currentColor = 'red';
      const alternateInterval = () => {
        console.log('called')
      dummyTab.style.backgroundColor = currentColor;
      currentColor = currentColor === 'red' ? 'rgb(243, 234, 95)' : 'red';
      }

      setTimeout(() => {
        console.log('cleared')
        clearInterval(myTimer);
        dummyTab.style.backgroundColor = 'red'
      }, 1800);
    }
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
      // style={DesignBoxHeaderStyle}
      mutate={props.mutate}
      onMouseEnter={mouseOver_handler}
      onMouseLeave={mouseLeave_handler}
      onClick={click_handler}
    >

      <div
      style={TabContainerStyle}
        mutate={props.mutate}
        id='tabcontainer'
      >
        {/* if there is only 1 formSection - collapse the tab bar */}
        {props.form.children().length > 1 ? renderTabs(props) : null}

      </div>
      {/* <button
        style={DesignBoxHeaderButtonStyle}
        onClick={onClickHandler}
      >
        +
        </button> */}

    </div>
  );
}


export default DesignBoxHeader;
