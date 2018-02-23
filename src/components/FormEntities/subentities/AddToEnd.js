import React from 'react';
import { utility } from '../../../utility';
import { address } from '../../../address';
import { defaultPropsFE } from '../../../constants/defaultPropsFE';

const AddToEnd = props => {
  const wrapperStyle = {
    width: '100%',
    height: '20px',
    position: 'absolute',
    right: '0',
    bottom: '-20px',
  };

  const restoreDonorSiblingAddress = (arr, props, draggedEntity) => {
    // get donor's parent
    const donorParent = address.byPath(
      props.form,
      arr.slice(0, arr.length - 1)
    );
    console.log(arr, props, draggedEntity);
    const toLeft = arr => {
      const _toLeft = [...arr];
      console.log({
        address: _toLeft,
        entity: address.byPath(props.form, _toLeft),
      });
      _toLeft[arr.length - 1] = _toLeft[arr.length - 1] - 1;
      return { address: _toLeft, entity: address.byPath(props.form, _toLeft) };
    };
    const toRight = arr => {
      const _toRight = [...arr];
      _toRight[arr.length - 1] = _toRight[arr.length - 1] + 1;
      return {
        address: _toRight,
        entity: address.byPath(props.form, _toRight),
      };
    };
    console.log(
      donorParent.children().length - 1 === arr[arr.length - 1] &&
        firstInRow(arr)
    );
    /** if only 1 child in section or the donor entity is the last entity in section */
    if (
      donorParent.children().length === 1 ||
      (donorParent.children().length - 1 === arr[arr.length - 1] &&
        firstInRow(arr))
    ) {
      // if (donorParent.children().length === 1 || (donorParent.children().length - 1 === arr[arr.length - 1])) {
      return false;
    } else if (firstInRow(arr)) {
      console.log('firstInRow: ', toRight(arr));
      return {
        address: toRight(arr).address,
        properties: {
          prepend:
            toRight(arr).entity.prepend() +
            draggedEntity.prepend() +
            draggedEntity.width() +
            draggedEntity.append(),
        },
      };
    } else {
      return {
        address: toLeft(arr).address,
        properties: {
          append:
            toLeft(arr).entity.append() +
            draggedEntity.prepend() +
            draggedEntity.width() +
            draggedEntity.append(),
        },
      };
    }
  };

  const total = entity => entity.prepend() + entity.width() + entity.append();

  const firstInRow = entityAddress => {
    const section = address.byPath(
      props.form,
      entityAddress.slice(0, entityAddress.length - 1)
    );
    // console.log(entityAddress )
    const _entityAddress =
      entityAddress.slice(entityAddress.length - 1, entityAddress.length + 1) -
      1;
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
    let dropData = JSON.parse(event.dataTransfer.getData('address'));
    let destination = address.byUuid(props.model.UUID(), props.form);
    let loc = [...destination[0]];
    loc = loc.concat(destination[1].children().length);
    if (dropData.action !== 'addEntity') {
      console.log(dropData);
      const droppedEntity = address.byPath(props.form, dropData.address);
      console.log(destination[1].width(), droppedEntity.width());
      // const parentEntity = [...destination[0]].slice(0, destination.length - 1)
      // console.log(parentEntity)
      props.add(
        loc,
        address.resurrectEntity(
          Object.assign({}, droppedEntity.properties(), {
            // @hack dropData.model.width below assumes that it is a new entity. Doesn't allow an existing entity to be added
            append: destination[1].width() - droppedEntity.width(),
          })
        )
      );

      const toBeMutatedRestore = restoreDonorSiblingAddress(
        dropData.address,
        props,
        droppedEntity
      );
      // if (!arraysEqual(toBeMutatedRestore.address, dropObj.destinationAddress)) {

      if (toBeMutatedRestore) {
        props.mutate(toBeMutatedRestore.address, toBeMutatedRestore.properties);
      }

      props.remove(dropData.address);
    } else {
      props.add(
        loc,
        address.resurrectEntity(
          Object.assign({}, dropData.model, {
            append: destination[1].width() - dropData.model.width,
          })
        )
      );
    }
    event.target.style.backgroundColor = '';
  };

  let dragEnter_handler = event => {
    event.target.style.backgroundColor = 'lightgreen';

    // const div = document.createElement('div');
    // // div.style = AddToEnd;
    // // div.style.width = '10px',
    // // div.style.height = '100px',
    // // div.style.position = 'absolute',

    // div.className = 'arrow_box';

    // event.target.appendChild(div);
    // div.innerHTML = `<h4 class="logo">Move before <strong>${props.model._type}</strong></h1>`
  };

  let dragLeave_handler = event => {
    event.target.style.backgroundColor = '';
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

export default AddToEnd;
