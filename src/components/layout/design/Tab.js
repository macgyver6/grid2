import React from 'react';

import { TabStyle } from '../styles/DesignBox';
import { address } from '../../../address';

const Tab = props => {
  let onClickHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    props.changetab(props.currentTab);
    props.temporalStateChange({
      currententity: address.bySample(props.model, props.form),
    });
  };

  let deleteTab_handler = event => {
    event.preventDefault();
    event.stopPropagation();

    const whichTab = () => {
      if (props.activeTab === 0) {
        return 0;
      }
      if (props.activeTab === props.currentTab && props.form.children().length - 1 !== props.currentTab) {
        return props.currentTab;
      }
      if (props.activeTab === props.currentTab && props.form.children().length - 1 === props.currentTab) {
        return props.currentTab - 1;
      }
      if (props.activeTab !== props.currentTab) {
        console.log('here: ', props.form.children().length);
        return props.form.children().length - 2;
      }
    };
    props.remove([props.currentTab]);
    console.log('remove this one: ', [props.currentTab], 'change active tab to: ', whichTab());
    props.changetab(whichTab());
  };

  let obj = {
    origin: null,
    destination: null,
  };
  var dragSrcEl = props.model.UUID();

  let dragstart_handler = event => {
    // helpers.dragStart_handler(event, props.model, props.form)
    event.dataTransfer.setData(
      'address',
      JSON.stringify({
        // action: action,
        address: address.bySample(props.model, props.form),
      })
    );

    event.dataTransfer.setData(address.bySample(props.model, props.form), address.bySample(props.model, props.form));
    // console.log(event.target.id.split('.')[0])
    // dragSrcEl = event.target.id.split('.')[0]
    console.log(dragSrcEl);
    // obj.origin = address.bySample(props.model, props.form)
    // event.target.parentNode.children[1].removeEventListener("dragover", onDragOverHandler)
    // ((tab) => { tab.removeEventListener("dragover", onDragOverHandler)})

    /* add an additional tab at the end */
    // props.add([props.form.children().length], new FormSection({
    //   uuid: undefined, type: 'FormSection', width: 24, children: [], legend: '', prepend: 0, append: 0
    // }))
  };

  let onDragOverHandler = event => {
    event.preventDefault();
    event.stopPropagation();
    /** if there is an entity being added or moved, show a green target */
    // `${event.target.id.split('.')[0]}` !== props.model.UUID() ?
    // document.getElementById(`${props.model.UUID()}.tab.wrapper`).style.borderRight = '4px solid green';

    // event.target.style.borderRight = '4px solid green';

    // if (event.dataTransfer.types[0] === 'address') {
    //   event.target.style.backgroundColor = 'green';
    //   document.getElementById(`${event.target.id.split('.')[0]}.input`).style.backgroundColor = '';
    // }

    // console.log(event.target.currentTarget)
    // console.log(event.dataTransfer.types)
    {
      /*  if (event.dataTransfer.types[0] !== 'tab') {
      let element = event.target.style.backgroundColor;
      const alternateInterval = event => setInterval(alternate(event, 1000));
      const alternate = event => {
        // console.log(event.target)
        element === 'grey'
          ? (event.target.style.backgroundColor = 'rgb(2, 117, 216)')
          : (event.target.style.backgroundColor = 'grey');
      };
      // alternateInterval(event);
      // setTimeout(() => {
      //   clearInterval(alternateInterval);
      //   props.changetab(props.currentTab);
      // }, 1000);
      // props.changetab(props.currentTab);
    } else {
      // rearrange the tabs
      event.preventDefault();

      obj.destination = address.bySample(props.model, props.form);
      let siblings = event.target.parentNode.children;
      if (siblings[event.dataTransfer.types[1]].id.split('.')[0] !== event.target.id.split('.')[0]) {
        document.getElementById(`${event.target.id.split('.')[0]}.tab.wrapper`).style.borderLeft =
          '120px solid lightgreen';
      }
    } */
    }
  };

  let dragLeave_handler = event => {
    document.getElementById(`${event.target.id.split('.')[0]}.tab.wrapper`).style.backgroundColor = 'white';
    // event.target.style.removeProperty('border');
  };

  let dragEnter_handler = event => {
    console.log(event.target.id);
  };

  let drop_handler = event => {
    console.log(event.dataTransfer.types[1], event.dataTransfer.types.length);
    // event.dataTransfer.types.length > 1 ?
    event.stopPropagation();
    /** resets to the background from green to '' onDrop*/
    document.getElementById(`${event.target.id.split('.')[0]}.tab.wrapper`).style.backgroundColor = 'white';
    document.getElementById(`${event.target.id.split('.')[0]}.input`).style.backgroundColor = '';
    let dropData = JSON.parse(event.dataTransfer.getData('address'));
    /** moving an entity other than tab */
    if (dropData.action !== 'addEntity' && event.dataTransfer.types.length > 1) {
      const indexOfSource = Number(event.dataTransfer.types[1]);
      const indexOfDestination = props.form.children().indexOf(props.model);
      console.log(indexOfDestination, indexOfSource);
      const _children = [...props.form.children()];
      const entityRemoved = _children.splice(indexOfSource, 1);
      const entityInsertedAtNewIndex = _children.splice(indexOfDestination, 0, entityRemoved[0]);

      // reorder(arr, originIndex, destinationIndex) {
      //   const originalDestinationItem = arr[destinationIndex];
      //   arr[destinationIndex] = arr[originIndex];
      //   arr[originIndex] = originalDestinationItem;
      //   return arr;
      // }

      props.changetab(indexOfDestination);
      props.temporalStateChange({
        currententity: [indexOfDestination],
      });
      props.formmutate({ children: _children });
    } else if (dropData.action !== 'addEntity') {
      const destinationTabAddress = address.bySample(props.model, props.form)[0];

      console.log(props.model.children().length);
      const entityToMove = address.byPath(props.form, JSON.parse(event.dataTransfer.getData('address')).address);

      props.add([destinationTabAddress, props.model.children().length], entityToMove);
      props.remove(JSON.parse(event.dataTransfer.getData('address')).address);
      // props.temporalStateChange({
      //   currententity: [destinationTabAddress, props.model.children().length],
      // });
      props.changetab(destinationTabAddress);
    } else {
      /** adding a new entity directly to a tab */
      let dropData = JSON.parse(event.dataTransfer.getData('address'));
      const destinationTabAddress = address.bySample(props.model, props.form)[0];
      console.log(dropData);
      console.log(JSON.stringify(dropData.address));
      console.log(dropData.model);
      // const droppedEntity = address.byPath(props.form, dropData.address);
      // let droppedEntity = address.rehydrate(_entity);
      /**returns [addy, {ParentSection}] */
      const entityAddy = address.bySample(props.model, props.form);

      const calcAppend = entity => {
        if (entity.prePromptWidth) {
          return entity.prepend + entity.prePromptWidth + entity.width + entity.postPromptWidth;
        } else {
          return entity.prepend + entity.width;
        }
      };

      props.add([destinationTabAddress, props.model.children().length], address.rehydrate(dropData.model));

      /** to set newly added entity as currententity */
      // props.temporalStateChange({
      //   currententity: [1, 1],
      // });
      props.changetab(destinationTabAddress);
    }
    if (event.dataTransfer.getData('tab')) {
      const dropData = JSON.parse(event.dataTransfer.getData('tab'));
      event.target.style.removeProperty('border');
      const _children = [...props.form.children()];
      const destinationAddress = address.bySample(props.model, props.form);

      const reorderArray = (event, originalArray) => {
        console.log(event, originalArray);
        const movedItem = originalArray.filter((item, index) => index === event.oldIndex);
        const remainingItems = originalArray.filter((item, index) => index !== event.oldIndex);

        const reorderedItems = [
          ...remainingItems.slice(0, event.newIndex),
          movedItem[0],
          ...remainingItems.slice(event.newIndex),
        ];

        return reorderedItems;
      };
      props.changetab(destinationAddress[0] > dropData.address[0] ? destinationAddress[0] - 1 : destinationAddress[0]);
      props.formmutate(
        [],
        reorderArray(
          {
            newIndex: destinationAddress[0] > dropData.address[0] ? destinationAddress[0] - 1 : destinationAddress[0],
            oldIndex: dropData.address[0],
          },
          _children
        )
      );

      // document.getElementById(`${event.target.id.split('.')[0]}.tab.wrapper`).style.backgroundColor = 'grey';
      // props.remove([props.form.children().length - 1]);
    }
  };

  let mouseEnter_handler = event => {
    const tabWrapper = document.getElementById(`${event.target.id.split('.')[0]}.tab.wrapper`);
    tabWrapper.style.backgroundColor = 'white';
    tabWrapper.style.borderTop = '0.25px solid rgb(32, 94, 226)';
    // tabWrapper.style.borderRight = '0.25px solid green';
    const deleteBtn = document.createElement('button');
    deleteBtn.style.border = 'none';
    deleteBtn.style.color = 'white';
    deleteBtn.style.marginLeft = '2px';
    deleteBtn.style.textAlign = 'center';
    deleteBtn.style.textDecoration = 'none';
    deleteBtn.style.fontSize = '16px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.backgroundColor = '#ff5f56';
    deleteBtn.innerHTML = 'X';
    deleteBtn.id = 'deleteBtn';
    deleteBtn.addEventListener('click', event => deleteTab_handler(event));
    tabWrapper.appendChild(deleteBtn);
  };

  let mouseLeave_handler = event => {
    const tabWrapper = document.getElementById(`${event.target.id.split('.')[0]}.tab.wrapper`);
    if (!currentTab) {
      tabWrapper.style.backgroundColor = TabStyle.backgroundColor;
      tabWrapper.style.borderTop = '';
    }
    if (tabWrapper) tabWrapper.removeChild(document.getElementById('deleteBtn'));
  };

  let mouseDown_handler = event => {
    console.log(event.target);
  };

  let mouseUp_handler = event => {
    // event.target.style.backgroundColor = 'darkgrey';
  };

  let change_handler = event => {
    // event.target.style.backgroundColor = 'rgb(2, 117, 216)';
    const location = address.bySample(props.model, props.form);
    props.mutate(location, {
      legend: event.target.value,
    });
  };
  const currentTab = props.currentTab === props.activeTab;
  return (
    <div
      style={{
        ...TabStyle,
        display: 'inline-block',
        backgroundColor: currentTab ? 'white' : TabStyle.backgroundColor,
        fontWeight: currentTab ? '900' : '100',
        // borderLeft: currentTab ? '0.25px solid darkgrey' : null,
        // borderRight: currentTab ? '0.25px solid darkgrey' : null,
        borderTop: currentTab ? '3px solid rgb(32, 94, 226)' : '3px solid white',
        // borderRight: '3px solid white',
      }}
      id={`${props.form.children()[props.currentTab].UUID()}.tab.wrapper`}
      className="tab"
      onClick={onClickHandler}
      draggable="true"
      onDragStart={dragstart_handler}
      onDragOver={onDragOverHandler}
      // onMouseEnter={mouseEnter_handler}
      // onMouseLeave={mouseLeave_handler}
      // onMouseDown={mouseDown_handler}
      // onMouseUp={mouseUp_handler}
      // onDragEnter={dragEnter_handler}
      // onDragLeave={dragLeave_handler}
      onDrop={drop_handler}
    >
      <p id={`${props.form.children()[props.currentTab].UUID()}.input`} style={{ fontSize: '.8rem' }}>
        {props.model.legend()}
      </p>
      {/* <input
        style={{
          width: '110px',
          cursor: 'move',
          userSelect: 'none',
        }}
        id={`${props.form.children()[props.currentTab].UUID()}.input`}
        type={props.model.type()}
        onChange={change_handler}
        // value={props.model.UUID().slice(props.model.UUID().length - 4, props.model.UUID().length)}
        value={props.model.legend()}
        readOnly="true"
        // size={'18'}
        // maxLength={'18'}
      /> */}
    </div>
  );
};

export default Tab;
