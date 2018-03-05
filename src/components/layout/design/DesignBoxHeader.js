import React from 'react';
import { TabContainerStyle } from '../styles/DesignBox';
import { FormSection } from '../../../data/FormSection';
import Tab from './Tab';

let DesignBoxHeader = props => {
  const allowAddTab = props =>
    props.form.children().length < 5 ? true : false;

  const mouseEnter_handler = event => {
    /*
      1. push a ghosted tab to the model
      2. becasue the lenght > 1, these tabs will render below
    */

    var tab = document.createElement('div');
    tab.style.textAlign = 'center';
    tab.style.textAlign = 'center';
    tab.style.padding = '10px';
    tab.style.padding = '10px';
    tab.style.width = '10%';
    tab.style.width = '10%';
    tab.style.height = '40%';
    tab.style.height = '40%';
    tab.style.marginTop = '4px';
    tab.style.marginTop = '4px';
    tab.style.marginLeft = '4px';
    tab.style.marginLeft = '4px';
    tab.style.borderBottom =
      props.form.children().length < 5 ? '3px solid white' : '3px solid red';
    tab.style.backgroundColor = allowAddTab(props) ? 'white' : 'red';
    tab.innerHTML = allowAddTab(props)
      ? 'click to add'
      : '<strong>max tabs</strong>';

    document.getElementById('tabcontainer').appendChild(tab);
    document.getElementById('tabcontainer').style.backgroundColor =
      props.form.children().length > 4 ? 'red' : 'rgb(243, 234, 95)';
  };

  const mouseLeave_handler = event => {
    // props.remove([props.form.children().length - 1])
    const tabContainer = document.getElementById('tabcontainer');
    tabContainer.removeChild(
      tabContainer.children[tabContainer.children.length - 1]
    );
    document.getElementById('tabcontainer').style.backgroundColor =
      props.form.children().length > 1 ? 'darkgrey' : 'white';
  };

  const click_handler = event => {
    const dummyTab = document.getElementById('tabcontainer').children[
      document.getElementById('tabcontainer').children.length - 1
    ];
    if (allowAddTab(props)) {
      props.add(
        [props.form.children().length],
        new FormSection({
          uuid: undefined,
          type: 'FormSection',
          width: 24,
          children: [],
          legend: 'new Tab',
          prepend: 0,
          append: 0,
        })
      );
      props.changetab(props.form.children().length);
    }

    if (props.form.children().length > 3) {
      console.log('too many');
      const myTimer = setInterval(function() {
        alternateInterval();
      }, 300);

      var currentColor = 'red';
      const alternateInterval = () => {
        console.log('called');
        dummyTab.style.backgroundColor = currentColor;
        dummyTab.style.borderBottom = currentColor;
        // dummyTab.style.borderBottom = currentColor;
        currentColor = currentColor === 'red' ? 'white' : 'red';
      };
      dummyTab.innerHTML = '<strong>max tabs</strong>';

      setTimeout(() => {
        console.log('cleared');
        clearInterval(myTimer);
        dummyTab.style.backgroundColor = 'red';
        dummyTab.style.borderBottom = '4px solid red';
      }, 1800);
    }

    document.getElementById('tabcontainer').style.backgroundColor =
      props.form.children().length > 3 ? 'red' : 'rgb(243, 234, 95)';
  };

  const renderTabs = props => {
    return props.form
      .children()
      .map((tab, index) => (
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
      ));
  };

  return (
    <div
      style={{
        ...TabContainerStyle,
        backgroundColor:
          props.form.children().length > 1 ? 'darkgrey' : 'white',
      }}
      mutate={props.mutate}
      id="tabcontainer"
      onMouseEnter={mouseEnter_handler}
      onMouseLeave={mouseLeave_handler}
      onClick={click_handler}
    >
      {/* if there is only 1 formSection - collapse the tab bar */}
      {props.form.children().length > 1 ? renderTabs(props) : null}
    </div>
  );
};

export default DesignBoxHeader;
