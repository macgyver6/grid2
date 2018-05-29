import React from 'react';
import { address } from '../../../address';
import { DesignBoxGridStyle } from '../../layout/styles/DesignBox';

const AddToBeginning = props => {
  const entityAddress = address.bySample(props.model, props.form);
  // const parentAddress = entityAddress.slice(0, entityAddress.length - 1);
  // const parentEntity = address.byPath(props.form, parentAddress);
  // console.log(props.appState.gridWidth, parentEntity.width());
  // const test = document.getElementById(address.byPath(props.form, parentAddress).UUID() + `.FormSection.wrapper`)
  //   .clientWidth;

  // let bgrndGrdWidth = document.getElementById('0.bgrndGrd');
  // console.log(bgrndGrdWidth);

  const wrapperStyle = {
    width: props.appState.gridWidth * props.model.width(),
    height: '20px',
    position: 'absolute',
    right: '0',
    top: '-20',
    // backgroundColor: 'blue',
  };
  console.log(wrapperStyle.width);

  const restoreDonorSiblingAddress = (arr, props, draggedEntity) => {
    // get donor's parent
    const donorParent = address.byPath(props.form, arr.slice(0, arr.length - 1));
    console.log(arr, props, draggedEntity);
    const toLeft = arr => {
      const _toLeft = [...arr];
      console.log({
        address: _toLeft,
        entity: address.byPath(props.form, _toLeft),
      });
      _toLeft[arr.length - 1] = _toLeft[arr.length - 1] - 1;
      return {
        address: _toLeft,
        entity: address.byPath(props.form, _toLeft),
      };
    };
    const toRight = arr => {
      const _toRight = [...arr];
      _toRight[arr.length - 1] = _toRight[arr.length - 1] + 1;
      return {
        address: _toRight,
        entity: address.byPath(props.form, _toRight),
      };
    };
    console.log(donorParent.children().length - 1 === arr[arr.length - 1] && firstInRow(arr));
    /** if only 1 child in section or the donor entity is the last entity in section */
    if (
      donorParent.children().length === 1 ||
      (donorParent.children().length - 1 === arr[arr.length - 1] && firstInRow(arr))
    ) {
      // if (donorParent.children().length === 1 || (donorParent.children().length - 1
      // === arr[arr.length - 1])) {
      return false;
    } else if (firstInRow(arr)) {
      console.log('firstInRow: ', toRight(arr));
      return {
        address: toRight(arr).address,
        properties: {
          prepend:
            toRight(arr).entity.prepend() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append(),
        },
      };
    } else {
      return {
        address: toLeft(arr).address,
        properties: {
          append:
            toLeft(arr).entity.append() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append(),
        },
      };
    }
  };

  const total = entity => entity.prepend() + entity.width() + entity.append();

  const firstInRow = entityAddress => {
    const section = address.byPath(props.form, entityAddress.slice(0, entityAddress.length - 1));
    // console.log(entityAddress )
    const _entityAddress = entityAddress.slice(entityAddress.length - 1, entityAddress.length + 1) - 1;
    var runningTotal = 0;
    // console.log(_entityAddress, section.children())
    for (var i = 0; i <= _entityAddress; ++i) {
      // console.log(section)
      runningTotal += total(section.children()[i]);
    }
    return runningTotal % section.width() === 0 ? true : false;
  };

  const drop_handler = event => {
    event.stopPropagation();
    console.log('addToBeginning');
    let dropData = JSON.parse(event.dataTransfer.getData('address'));
    console.log(dropData);
    let droppedEntity = address.resurrectEntity(dropData.model);

    /**returns [addy, {ParentSection}] */
    const entityAddy = address.bySample(props.model, props.form);
    console.log(entityAddy);
    /**
     * returns [parentSectionAddress, parentSectionEntity, <optional>indexToAddEntityAt]
     */

    let loc = [...entityAddy].slice(0, entityAddy.length - 1);
    console.log(loc);

    loc = loc.concat([...entityAddy][entityAddy.length]);
    console.log(entityAddy, [...entityAddy][`${entityAddy.length - 1}`] - 1);

    console.log(dropData);

    props.add(
      entityAddy,
      address.resurrectEntity(
        Object.assign({}, droppedEntity.properties(), {
          // @hack dropData.model.width below assumes that it is a new entity. Doesn't
          // allow an existing entity to be added
          append: 24 - droppedEntity.prePromptWidth() - droppedEntity.width(),
        })
      )
    );

    props.temporalStateChange(loc);

    event.target.style.backgroundColor = '';
  };

  let dragEnter_handler = event => {
    event.stopPropagation();
    event.preventDefault();
    event.target.style.backgroundColor = 'lightgreen';

    // const entityAddress = address.bySample(props.model, props.form);
    // const parentAddress = entityAddress.slice(0, entityAddress.length - 1);
    // const test = document.getElementById(address.byPath(props.form, parentAddress).UUID() + `.FormSection.wrapper`)
    //   .clientWidth;
    // event.target.style.width = `${test}px`;
    // console.log(wrapperStyle);

    // const div = document.createElement('div'); // div.style = AddToBeginning; //
    // div.style.width = '10px', // div.style.height = '100px', //
    // div.style.position = 'absolute', div.className = 'arrow_box';
    // event.target.appendChild(div); div.innerHTML = `<h4 class="logo">Move before
    // <strong>${props.model._type}</strong></h1>`
  };

  let dragLeave_handler = event => {
    event.target.style.backgroundColor = '';
  };

  const lastInRow = entityAddress => {
    const section = address.byPath(props.form, entityAddress.slice(0, entityAddress.length - 1));
    console.log(
      address.byPath(props.form, entityAddress),
      address.byPath(props.form, entityAddress.slice(0, entityAddress.length - 1))
    );
    const _entityAddress = entityAddress[entityAddress.length - 1];
    console.log(_entityAddress);

    const entity = address.byPath(props.form, entityAddress);
    console.log(entity, total(entity), entityAddress[entityAddress.length - 1]);
    console.log(total(props.model));
    if (entityAddress[entityAddress.length - 1] === 0 && total(entity) !== props.model.width()) {
      return false;
    }
    var runningTotal = 0;
    // console.log(_entityAddress, section.children())
    for (var i = 0; i <= _entityAddress; ++i) {
      console.log(section.children()[i]);
      runningTotal += total(section.children()[i]);
    }
    console.log(runningTotal);
    return runningTotal % section.width() === 0 ? true : false;
  };

  return (
    <div
      id={props.model.UUID()}
      className="outer"
      style={wrapperStyle}
      onDrop={drop_handler}
      onDragEnter={dragEnter_handler}
      onDragLeave={dragLeave_handler}
    />
  );
};

export default AddToBeginning;
