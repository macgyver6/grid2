import React from 'react';
import { address } from '../../../address';
import { DesignBoxGridStyle } from '../../layout/styles/DesignBox';

const AddToEnd = props => {
  const entityAddress = address.bySample(props.model, props.form);
  const parentAddress = entityAddress.slice(0, entityAddress.length - 1);
  const parentEntity = address.byPath(props.form, parentAddress);
  console.log(props.appState.gridWidth, parentEntity.width());
  // const test = document.getElementById(address.byPath(props.form, parentAddress).UUID() + `.FormSection.wrapper`)
  //   .clientWidth;

  // let bgrndGrdWidth = document.getElementById('0.bgrndGrd');
  // console.log(bgrndGrdWidth);

  const wrapperStyle = {
    width: props.appState.gridWidth * parentEntity.width(),
    height: '40px',
    position: 'absolute',
    right: '0',
    bottom: '-40px',
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
    console.log(total(draggedEntity));
    /** if only 1 child in section or the donor entity is the last entity in section */
    if (
      donorParent.children().length === 1 ||
      (donorParent.children().length - 1 === arr[arr.length - 1] && firstInRow(arr))
    ) {
      // if (donorParent.children().length === 1 || (donorParent.children().length - 1
      // === arr[arr.length - 1])) {
      return false;
    } else if (donorParent.width() === total(draggedEntity)) {
      /** in the case that the entity used the entire destination section */
      return false;
    } else if (firstInRow(arr)) {
      console.log('firstInRow: ', toRight(arr));
      return {
        address: toRight(arr).address,
        properties: {
          prepend:
            toRight(arr).entity.prepend() +
            (draggedEntity.prePromptWidth ? draggedEntity.prePromptWidth() : 0) +
            draggedEntity.prepend() +
            draggedEntity.width() +
            (draggedEntity.postPromptWidth ? draggedEntity.postPromptWidth() : 0) +
            draggedEntity.append(),
        },
      };
    } else {
      return {
        address: toLeft(arr).address,
        properties: {
          append:
            toLeft(arr).entity.append() +
            // (draggedEntity.prePromptWidth ? draggedEntity.prePromptWidth() : 0) +
            draggedEntity.prepend() +
            draggedEntity.width() +
            // (draggedEntity.postPromptWidth ? draggedEntity.postPromptWidth() : 0) +
            +draggedEntity.append(),
        },
      };
    }
  };

  const total = entity =>
    entity.prepend() +
    (entity.prePromptWidth ? entity.prePromptWidth() : 0) +
    entity.width() +
    (entity.postPromptWidth ? entity.postPromptWidth() : 0) +
    entity.append();

  const firstInRow = entityAddress => {
    const section = address.byPath(props.form, entityAddress.slice(0, entityAddress.length - 1));
    // const section = address.byPath(props.form, entityAddress);
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
    let dropData = JSON.parse(event.dataTransfer.getData('address'));
    console.log(dropData);

    /**returns [addy, {ParentSection}] */
    const entityAddy = address.byUuid(props.model.UUID(), props.form);
    /**
     * returns [parentSectionAddress, parentSectionEntity, <optional>indexToAddEntityAt]
     */
    let destinationSectionAddy = () => {
      if (props.addToEndAction === 'insertInPlace') {
        const sectionAddy = [...entityAddy[0]].slice(0, entityAddy[0].length - 1);
        const sectionEntity = address.byPath(props.form, sectionAddy);
        const _entityAddy = [...entityAddy[0]]
          .slice(0, entityAddy[0].length - 1)
          .concat(entityAddy[0][entityAddy.length] + 1);
        return [sectionAddy, sectionEntity, _entityAddy];
      }
      if (props.addToEndAction === 'appendToEnd') {
        return entityAddy;
      }
    };
    console.log('destinationSectionAddy: ', destinationSectionAddy());

    if (props.addToEndAction === 'insertInPlace') {
      let loc = [...destinationSectionAddy()[0]];
      loc = loc.concat(destinationSectionAddy()[1].children().length);
      console.log(dropData.action);
      if (dropData.action !== 'addEntity') {
        console.log(dropData);
        const droppedEntity = address.byPath(props.form, dropData.address);
        console.log(destinationSectionAddy()[1].width(), droppedEntity.width());
        // const parentEntity = [...destinationSectionAddy()[0]].slice(0,
        // destinationSectionAddy().length - 1) console.log(parentEntity)
        console.log('destinationSectionAddy', destinationSectionAddy()[2]);
        console.log(
          destinationSectionAddy()[1].width() -
            droppedEntity.prepend() -
            (droppedEntity.prePromptWidth ? droppedEntity.prePromptWidth() : 0) -
            droppedEntity.width() -
            (droppedEntity.postPromptWidth ? droppedEntity.postPromptWidth() : 0)
        );
        // props.add(
        //   destinationSectionAddy()[2],
        //   address.rehydrate(
        //     Object.assign({}, droppedEntity.properties(), {
        //       // @hack dropData.model.width below assumes that it is a new entity. Doesn't
        //       // allow an existing entity to be added
        //       append:
        //         destinationSectionAddy()[1].width() -
        //         droppedEntity.prepend() -
        //         (droppedEntity.prePromptWidth ? droppedEntity.prePromptWidth() : 0) -
        //         droppedEntity.width() -
        //         (droppedEntity.postPromptWidth ? droppedEntity.postPromptWidth() : 0),
        //     })
        //   )
        // );

        const toBeMutatedRestore = restoreDonorSiblingAddress(dropData.address, props, droppedEntity);

        // if (!arraysEqual(toBeMutatedRestore.address, dropObj.destinationAddress)) {
        console.log(toBeMutatedRestore);
        if (toBeMutatedRestore) {
          props.mutate(toBeMutatedRestore.address, toBeMutatedRestore.properties);
        }
        console.log(
          destinationSectionAddy()[2],
          [...dropData.address].map((val, index, array) => (index === array.length - 1 ? (val += 1) : val))
        );
        /** handles the condition that the entity is moved to prior index in the same section */
        if (
          dropData.address[dropData.address.length - 1] >
          destinationSectionAddy()[2][destinationSectionAddy()[2].length - 1]
        ) {
          props.remove(
            [...dropData.address].map((val, index, array) => (index === array.length - 1 ? (val += 1) : val))
          );
        } else {
          props.remove(dropData.address);
        }
      } else {
        /*
      @hack - this needs to accomodate some entities having prePrompt and others not
       */
        console.log(address.rehydrate(Object.assign({}, dropData.model)));
        const calcAppend = entity => {
          if (entity.prePromptWidth) {
            return entity.prepend + entity.prePromptWidth + entity.width + entity.postPromptWidth;
          } else {
            return entity.prepend + entity.width;
          }
        };
        const newEntity = props.add(
          destinationSectionAddy()[2],
          address.rehydrate(
            Object.assign({}, dropData.model, {
              append: destinationSectionAddy()[1].width() - calcAppend(dropData.model),
            })
          )
        );
        props.temporalStateChange(loc);
      }
      event.target.style.backgroundColor = '';
      event.target.innerHTML = '';
    }

    if (props.addToEndAction === 'appendToEnd') {
      let loc = [...destinationSectionAddy()[0]];
      loc = loc.concat(destinationSectionAddy()[1].children().length);
      console.log(loc);

      if (dropData.action !== 'addEntity') {
        console.log(dropData);
        const droppedEntity = address.byPath(props.form, dropData.address);
        console.log(destinationSectionAddy()[1].width(), droppedEntity.width());
        // const parentEntity = [...destinationSectionAddy()[0]].slice(0,
        // destinationSectionAddy().length - 1) console.log(parentEntity)
        props.add(
          loc,
          address.rehydrate(
            Object.assign({}, droppedEntity.properties(), {
              // @hack dropData.model.width below assumes that it is a new entity. Doesn't
              // allow an existing entity to be added
              append: destinationSectionAddy()[1].width() - droppedEntity.width(),
            })
          )
        );

        const toBeMutatedRestore = restoreDonorSiblingAddress(dropData.address, props, droppedEntity);

        // if (!arraysEqual(toBeMutatedRestore.address, dropObj.destinationAddress)) {

        if (toBeMutatedRestore) {
          props.mutate(toBeMutatedRestore.address, toBeMutatedRestore.properties);
        }

        props.remove(dropData.address);
      } else {
        /*
      @hack - this needs to accomodate some entities having prePrompt and others not
       */
        console.log(address.rehydrate(Object.assign({}, dropData.model)));
        const calcAppend = entity => {
          if (entity.prePromptWidth) {
            return entity.prepend + entity.prePromptWidth + entity.width + entity.postPromptWidth;
          } else {
            return entity.prepend + entity.width;
          }
        };
        const newEntity = props.add(
          loc,
          address.rehydrate(
            Object.assign({}, dropData.model, {
              append: destinationSectionAddy[1].width() - calcAppend(dropData.model),
            })
          )
        );
        props.temporalStateChange(loc);
      }
      event.target.style.backgroundColor = '';
      event.target.innerHTML = '';
    }
  };
  let dragEnter_handler = event => {
    event.stopPropagation();
    event.preventDefault();
    event.target.style.backgroundColor = 'lightgreen';
    event.target.innerHTML = '⬇️Insert entity here';

    // const entityAddress = address.bySample(props.model, props.form);
    // const parentAddress = entityAddress.slice(0, entityAddress.length - 1);
    // const test = document.getElementById(address.byPath(props.form, parentAddress).UUID() + `.FormSection.wrapper`)
    //   .clientWidth;
    // event.target.style.width = `${test}px`;
    // console.log(wrapperStyle);

    // const div = document.createElement('div'); // div.style = AddToEnd; //
    // div.style.width = '10px', // div.style.height = '100px', //
    // div.style.position = 'absolute', div.className = 'arrow_box';
    // event.target.appendChild(div); div.innerHTML = `<h4 class="logo">Move before
    // <strong>${props.model._type}</strong></h1>`
  };

  let dragLeave_handler = event => {
    event.target.style.backgroundColor = '';
    event.target.innerHTML = '';
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

export default AddToEnd;
