import React, { Component } from 'react';
import { address } from '../../../address';
import { DesignBoxGridStyle } from '../../layout/styles/DesignBox';

class AddToEnd extends Component {
  constructor(props) {
    super(props);
    this.restoreDonorSiblingAddress = this.restoreDonorSiblingAddress.bind(this);
    this.drop_handler = this.drop_handler.bind(this);
    this.dragLeave_handler = this.dragLeave_handler.bind(this);
    this.dragEnter_handler = this.dragEnter_handler.bind(this);
    this.total = this.total.bind(this);
    this.firstInRow = this.firstInRow.bind(this);
  }

  // const test = document.getElementById(address.byPath(this.props.form, parentAddress).UUID() + `.FormSection.wrapper`)
  //   .clientWidth;

  // let bgrndGrdWidth = document.getElementById('0.bgrndGrd');
  // console.log(bgrndGrdWidth);

  total(entity) {
    return (
      entity.prepend() +
      (entity.prePromptWidth ? entity.prePromptWidth() : 0) +
      entity.width() +
      (entity.postPromptWidth ? entity.postPromptWidth() : 0) +
      entity.append()
    );
  }

  firstInRow(entityAddress) {
    const section = address.byPath(this.props.form, entityAddress.slice(0, entityAddress.length - 1));
    // const section = address.byPath(this.props.form, entityAddress);
    // console.log(entityAddress )
    const _entityAddress = entityAddress.slice(entityAddress.length - 1, entityAddress.length + 1) - 1;
    var runningTotal = 0;
    // console.log(_entityAddress, section.children())
    for (var i = 0; i <= _entityAddress; ++i) {
      // console.log(section)
      runningTotal += this.total(section.children()[i]);
    }
    return runningTotal % section.width() === 0 ? true : false;
  }

  restoreDonorSiblingAddress(arr, props, draggedEntity) {
    // get donor's parent
    const donorParent = address.byPath(this.props.form, arr.slice(0, arr.length - 1));
    console.log(arr, props, draggedEntity);
    const toLeft = arr => {
      const _toLeft = [...arr];
      console.log({
        address: _toLeft,
        entity: address.byPath(this.props.form, _toLeft),
      });
      _toLeft[arr.length - 1] = _toLeft[arr.length - 1] - 1;
      return {
        address: _toLeft,
        entity: address.byPath(this.props.form, _toLeft),
      };
    };
    const toRight = arr => {
      const _toRight = [...arr];
      _toRight[arr.length - 1] = _toRight[arr.length - 1] + 1;
      return {
        address: _toRight,
        entity: address.byPath(this.props.form, _toRight),
      };
    };
    console.log(donorParent.children().length - 1 === arr[arr.length - 1] && this.firstInRow(arr));
    console.log(this.total(draggedEntity));
    /** if only 1 child in section or the donor entity is the last entity in section */
    if (
      donorParent.children().length === 1 ||
      (donorParent.children().length - 1 === arr[arr.length - 1] && this.firstInRow(arr))
    ) {
      // if (donorParent.children().length === 1 || (donorParent.children().length - 1
      // === arr[arr.length - 1])) {
      return false;
    } else if (donorParent.width() === this.total(draggedEntity)) {
      /** in the case that the entity used the entire destination section */
      return false;
    } else if (this.firstInRow(arr)) {
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
  }

  drop_handler(event) {
    event.stopPropagation();
    let dropData = JSON.parse(event.dataTransfer.getData('address'));
    console.log(dropData);

    /**returns [addy, {ParentSection}] */
    const entityAddy = address.byUuid(this.props.model.UUID(), this.props.form);
    /**
     * returns [parentSectionAddress, parentSectionEntity, <optional>indexToAddEntityAt]
     */
    let destinationSectionAddy = () => {
      if (this.props.addToEndAction === 'insertInPlace') {
        const sectionAddy = [...entityAddy[0]].slice(0, entityAddy[0].length - 1);
        const sectionEntity = address.byPath(this.props.form, sectionAddy);
        const _entityAddy = [...entityAddy[0]]
          .slice(0, entityAddy[0].length - 1)
          .concat(entityAddy[0][entityAddy.length] + 1);
        return [sectionAddy, sectionEntity, _entityAddy];
      }
      if (this.props.addToEndAction === 'appendToEnd') {
        return entityAddy;
      }
    };

    if (this.props.addToEndAction === 'insertInPlace') {
      let loc = [...destinationSectionAddy()[0]];
      loc = loc.concat(destinationSectionAddy()[1].children().length);
      console.log(dropData.action);
      if (dropData.action !== 'addEntity') {
        console.log(dropData);
        const droppedEntity = address.byPath(this.props.form, dropData.address);
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
        this.props.add(
          destinationSectionAddy()[2],
          address.rehydrate(
            Object.assign({}, droppedEntity.properties(), {
              // @hack dropData.model.width below assumes that it is a new entity. Doesn't
              // allow an existing entity to be added
              append:
                destinationSectionAddy()[1].width() -
                droppedEntity.prepend() -
                (droppedEntity.prePromptWidth ? droppedEntity.prePromptWidth() : 0) -
                droppedEntity.width() -
                (droppedEntity.postPromptWidth ? droppedEntity.postPromptWidth() : 0),
            })
          )
        );

        const toBeMutatedRestore = this.restoreDonorSiblingAddress(dropData.address, this.props, droppedEntity);

        // if (!arraysEqual(toBeMutatedRestore.address, dropObj.destinationAddress)) {
        console.log(toBeMutatedRestore);
        if (toBeMutatedRestore) {
          this.props.mutate(toBeMutatedRestore.address, toBeMutatedRestore.properties);
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
          this.props.remove(
            [...dropData.address].map((val, index, array) => (index === array.length - 1 ? (val += 1) : val))
          );
        } else {
          this.props.remove(dropData.address);
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
        const newEntity = this.props.add(
          destinationSectionAddy()[2],
          address.rehydrate(
            Object.assign({}, dropData.model, {
              append: destinationSectionAddy()[1].width() - calcAppend(dropData.model),
            })
          )
        );
        console.log(loc);
        // this.props.temporalStateChange({
        //   currententity: loc,
        // });
      }
      event.target.style.backgroundColor = '';
      event.target.innerHTML = '';
    }

    if (this.props.addToEndAction === 'appendToEnd') {
      let loc = [...destinationSectionAddy()[0]];
      loc = loc.concat(destinationSectionAddy()[1].children().length);
      console.log(loc);

      if (dropData.action !== 'addEntity') {
        console.log(dropData);
        const droppedEntity = address.byPath(this.props.form, dropData.address);
        console.log(destinationSectionAddy()[1].width(), droppedEntity.width());
        // const parentEntity = [...destinationSectionAddy()[0]].slice(0,
        // destinationSectionAddy().length - 1) console.log(parentEntity)
        this.props.add(
          loc,
          address.rehydrate(
            Object.assign({}, droppedEntity.properties(), {
              // @hack dropData.model.width below assumes that it is a new entity. Doesn't
              // allow an existing entity to be added
              append: destinationSectionAddy()[1].width() - droppedEntity.width(),
            })
          )
        );

        const toBeMutatedRestore = this.restoreDonorSiblingAddress(dropData.address, this.props, droppedEntity);

        // if (!arraysEqual(toBeMutatedRestore.address, dropObj.destinationAddress)) {

        if (toBeMutatedRestore) {
          this.props.mutate(toBeMutatedRestore.address, toBeMutatedRestore.properties);
        }

        this.props.remove(dropData.address);
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
        const newEntity = this.props.add(
          loc,
          address.rehydrate(
            Object.assign({}, dropData.model, {
              append: destinationSectionAddy[1].width() - calcAppend(dropData.model),
            })
          )
        );
        this.props.temporalStateChange(loc);
      }
      event.target.style.backgroundColor = '';
      event.target.innerHTML = '';
    }
  }

  dragEnter_handler(event) {
    event.stopPropagation();
    event.preventDefault();
    event.target.style.backgroundColor = 'lightgreen';
    event.target.innerHTML = '⬇️Insert entity here';

    // const entityAddress = address.bySample(this.props.model, this.props.form);
    // const parentAddress = entityAddress.slice(0, entityAddress.length - 1);
    // const test = document.getElementById(address.byPath(this.props.form, parentAddress).UUID() + `.FormSection.wrapper`)
    //   .clientWidth;
    // event.target.style.width = `${test}px`;
    // console.log(wrapperStyle);

    // const div = document.createElement('div'); // div.style = AddToEnd; //
    // div.style.width = '10px', // div.style.height = '100px', //
    // div.style.position = 'absolute', div.className = 'arrow_box';
    // event.target.appendChild(div); div.innerHTML = `<h4 class="logo">Move before
    // <strong>${this.props.model._type}</strong></h1>`
  }

  dragLeave_handler(event) {
    event.target.style.backgroundColor = '';
    event.target.innerHTML = '';
  }

  // const lastInRow = entityAddress => {
  //   const section = address.byPath(this.props.form, entityAddress.slice(0, entityAddress.length - 1));
  //   console.log(
  //     address.byPath(this.props.form, entityAddress),
  //     address.byPath(this.props.form, entityAddress.slice(0, entityAddress.length - 1))
  //   );
  //   const _entityAddress = entityAddress[entityAddress.length - 1];
  //   console.log(_entityAddress);

  //   const entity = address.byPath(this.props.form, entityAddress);
  //   console.log(entity, total(entity), entityAddress[entityAddress.length - 1]);
  //   console.log(total(this.props.model));
  //   if (entityAddress[entityAddress.length - 1] === 0 && total(entity) !== this.props.model.width()) {
  //     return false;
  //   }
  //   var runningTotal = 0;
  //   // console.log(_entityAddress, section.children())
  //   for (var i = 0; i <= _entityAddress; ++i) {
  //     console.log(section.children()[i]);
  //     runningTotal += total(section.children()[i]);
  //   }
  //   console.log(runningTotal);
  //   return runningTotal % section.width() === 0 ? true : false;
  // };

  render() {
    const entityAddress = address.bySample(this.props.model, this.props.form);
    const parentAddress = entityAddress.slice(0, entityAddress.length - 1);
    const parentEntity = address.byPath(this.props.form, parentAddress);
    const wrapperStyle = {
      // width: this.props.appState.gridWidth * parentEntity.width(),
      width: '160px',
      height: '15px',
      position: 'absolute',
      right: '0',
      bottom: '-15px',
      zIndex: '40',
    };

    // console.log(this.props.appState.gridWidth);

    return (
      <div
        id={this.props.model.UUID()}
        className="outer"
        style={this.wrapperStyle}
        onDrop={this.drop_handler}
        onDragEnter={this.dragEnter_handler}
        onDragLeave={this.dragLeave_handler}
      >
        'add to end'
      </div>
    );
  }
}

export default AddToEnd;
