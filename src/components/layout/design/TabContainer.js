import React from 'react';
import { FormSection } from '../../../data/FormSection';
import Tab from './Tab';

let TabContainer = props => {
  const scroll_handler = (direction, e) => {
    const tabcontainer = document.getElementById('tabcontainer');
    tabcontainer.scrollBy(direction, 0);
  };
  console.log(document.getElementById('tabcontainer'));
  // const allowAddTab = props => (props.form.children().length < 5 ? true : false);

  const mouseEnter_handler = event => {
    /*
      1. push a ghosted tab to the model
      2. becasue the lenght > 1, these tabs will render below
    */

    var tab = document.createElement('div');
    tab.style.textAlign = 'center';
    tab.style.Bottom = '3px solid white';
    tab.style.backgroundColor = 'white';

    // tab.innerHTML = allowAddTab(props) ? 'click to add' : '<strong>max tabs</strong>';

    document.getElementById('tabcontainer').appendChild(tab);
    document.getElementById('tabcontainer').style.backgroundColor = 'rgb(243, 234, 95)';
    // document.getElementById('tabcontainer').style.backgroundColor =
    //   props.form.children().length > 4 ? 'red' : 'rgb(243, 234, 95)';
  };

  const style_Add_Tab = {
    width: '100%',
    textAlign: 'center',
    borderBottom: '3px solid white',
    backgroundColor: 'white',
    // margin: '6px',
    // position: 'absolute',
    // right: 4,
    // bottom: 4,
    border: '1px solid rgb(32, 94, 226)',
    draggable: 'false',
  };

  const Add_Tab = () => (
    <button style={style_Add_Tab} className="add_tab" onClick={click_handler}>
      <p>Add Tab</p>
    </button>
  );

  const mouseLeave_handler = event => {
    // props.remove([props.form.children().length - 1])
    const tabContainer = document.getElementById('tabcontainer');
    tabContainer.removeChild(tabContainer.children[tabContainer.children.length - 1]);
    document.getElementById('tabcontainer').style.backgroundColor =
      props.form.children().length > 1 ? 'darkgrey' : 'white';
  };

  const click_handler = event => {
    if (true) {
      props.add(
        [props.form.children().length],
        new FormSection({
          uuid: undefined,
          type: 'FormSection',
          width: 24,
          children: [],
          legend: `Tab ${props.form.children().length + 1}`,
          prepend: 0,
          append: 0,
        })
      );
      props.temporalStateChange({ activeTab: props.form.children().length });
    }

    let tabContainer = document.getElementById('tabcontainer');

    /** number of pixels to offset the scroll by - calculated by the inital div width and the scrollable width */
    const scrollOffset = tabContainer.scrollWidth - tabContainer.getBoundingClientRect().width;

    /** set the scrollLeft to the right bound of the scroll. An alternative implementation is the use Element.scrollIntoView */
    tabContainer.scrollLeft = tabContainer.scrollWidth + scrollOffset;
  };

  const metaTabContainerStyle = {
    width: '82%',
    display: 'grid',
    gridTemplateColumns: '70% 10%',
    position: 'relative',
  }; // minHeight: '46px',

  const TabContainerStyle = {
    // display: 'grid',
    // gridTemplateColumns: 'repeat 200px',
    // gridAutoFlow: 'column',
    width: '90%',
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
    marginRight: '40px',
  };
  // border: 'solid blue',

  const renderTabs = props =>
    props.form
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

  const ScrollRight = (
    <div
      onClick={e => scroll_handler(-270, e)}
      style={{
        // backgroundColor: 'blue',
        position: 'absolute',
        top: '25px',
        left: '0px',
        width: 0,
        height: 0,
        borderTop: '10px solid transparent',
        borderBottom: '10px solid transparent',
        borderRight: '10px solid blue',
      }}
    />
  );

  //   .arrow - right {

  // }

  const ScrollLeft = (
    <div
      onClick={e => scroll_handler(270, e)}
      style={{
        // backgroundColor: 'blue',
        position: 'absolute',
        top: '25px',
        right: '200px',
        width: 0,
        height: 0,
        borderTop: '10px solid transparent',
        borderBottom: '10px solid transparent',
        borderLeft: '10px solid blue',
      }}
    />
  );

  return (
    <div style={metaTabContainerStyle}>
      {ScrollRight}
      {ScrollLeft}
      <div
        style={{
          ...TabContainerStyle,
          backgroundColor: props.form.children().length > 1 ? 'white' : 'white',
        }}
        mutate={props.mutate}
        id="tabcontainer"
      >
        {/* if there is only 1 formSection - collapse the tab bar */}
        {/* {props.form.children().length > 1 ? renderTabs(props) : null} */}
        {renderTabs(props)}
        <div
          style={{
            textAlign: 'center',
            // padding: '10px',
            // verticalAlign: 'middle',
            width: '200px',
            // height: '100%',
            // margin: '4px',
            // marginTop: "2%",
            // marginLeft: "1%",
            backgroundColor: '',
            display: 'inline-block',
            // borderTop: "0.25px solid white",
            // borderRight: '4px solid white',
          }}
        />
      </div>
      <Add_Tab />
    </div>
  );
};

export default TabContainer;
