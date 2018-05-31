import React from 'react';
import { FormSection } from '../../../data/FormSection';
import Tab from './Tab';

let TabContainer = props => {
  const allowAddTab = props => (props.form.children().length < 5 ? true : false);

  const mouseEnter_handler = event => {
    /*
      1. push a ghosted tab to the model
      2. becasue the lenght > 1, these tabs will render below
    */

    var tab = document.createElement('div');
    tab.style.textAlign = 'center';
    tab.style.borderBottom = '3px solid white';
    tab.style.backgroundColor = 'white';

    tab.innerHTML = allowAddTab(props) ? 'click to add' : '<strong>max tabs</strong>';

    document.getElementById('tabcontainer').appendChild(tab);
    document.getElementById('tabcontainer').style.backgroundColor = 'rgb(243, 234, 95)';
    // document.getElementById('tabcontainer').style.backgroundColor =
    //   props.form.children().length > 4 ? 'red' : 'rgb(243, 234, 95)';
  };

  const divStyle = {
    width: '15%',
    textAlign: 'center',
    borderBottom: '3px solid white',
    backgroundColor: 'white',
    position: 'absolute',
    right: 4,
    bottom: 4,
  };

  const Add_Tab = () => (
      <div style={divStyle} className="add_tab" onClick={click_handler}>
        <p>Add Tab</p>
      </div>
    );

  const mouseLeave_handler = event => {
    // props.remove([props.form.children().length - 1])
    const tabContainer = document.getElementById('tabcontainer');
    tabContainer.removeChild(tabContainer.children[tabContainer.children.length - 1]);
    document.getElementById('tabcontainer').style.backgroundColor =
      props.form.children().length > 1 ? 'darkgrey' : 'white';
  };

  const click_handler = event => {
    // const dummyTab = document.getElementById('tabcontainer').children[
    //   document.getElementById('tabcontainer').children.length - 1
    // ];
    if (true) {
      // if (allowAddTab(props)) {
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
      document.getElementById('tabcontainer');
    }

    if (props.form.children().length > 3) {
      console.log('too many');
      const myTimer = setInterval(function() {
        alternateInterval();
      }, 300);

      var currentColor = 'red';
      const alternateInterval = () => {
        console.log('called');
        // dummyTab.style.backgroundColor = currentColor;
        // dummyTab.style.borderBottom = currentColor;
        // dummyTab.style.borderBottom = currentColor;
        // currentColor = currentColor === 'red' ? 'white' : 'red';
      };
      // dummyTab.innerHTML = '<strong>max2 tabs</strong>';

      setTimeout(() => {
        console.log('cleared');
        clearInterval(myTimer);
        // dummyTab.style.backgroundColor = 'red';
        // dummyTab.style.borderBottom = '4px solid red';
      }, 1800);
    }

    let tabContainer = document.getElementById('tabcontainer');
    tabContainer.style.backgroundColor = props.form.children().length > 3 ? 'red' : 'rgb(243, 234, 95)';
    console.log(tabContainer.scrollWidth);
    tabContainer.scrollLeft = tabContainer.scrollWidth + 160;
  };

  const metaTabContainerStyle = { width: '100%', position: 'relative' }; // minHeight: '46px',

  const TabContainerStyle = {
    width: '85%', // paddingLeft: '4px', // minHeight: '46px',
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridAutoFlow: 'column',
    // position: 'relative',
    // marginLeft: '20px', // backgroundColor: 'white',
    // marginRight: '20px',
    overflow: 'auto',
  };
  // border: 'solid blue',

  const renderTabs = props => props.form
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
          temporalStateChange={props.temporalStateChange}
        />
      ));

  return (
    <div style={metaTabContainerStyle}>
      <div
        style={{
          ...TabContainerStyle,
          backgroundColor: props.form.children().length > 1 ? 'darkgrey' : 'white',
        }}
        mutate={props.mutate}
        id="tabcontainer"
      >
        {/* if there is only 1 formSection - collapse the tab bar */}
        {props.form.children().length > 1 ? renderTabs(props) : null}
      </div>
      <Add_Tab />
    </div>
  );
};

export default TabContainer;
