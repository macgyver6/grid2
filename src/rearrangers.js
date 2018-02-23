import { utility } from './utility';
import { address } from './address';
import { defaultPropsFE } from './constants/defaultPropsFE';

const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

const total = entity => entity.prepend() + entity.width() + entity.append();

const move = {
  mouseDownStartX: null,
  dX: null,
  mouseDownStopX: null,
  offsetInit: null,
  init_prepend: null,
  init_append: null,
  source_address: null,
  destination_address: null,
  valid: null,
};

const firstInRow = (entity_address, props) => {
  console.log(entity_address);
  let sectionEntity = address.byPath(
    props.form,
    entity_address.slice(0, entity_address.length - 1)
  );
  const _sectionChildren = [...sectionEntity.children()];
  const _entity_address =
    entity_address.slice(entity_address.length - 1, entity_address.length + 1) -
    1;
  var runningTotal = 0;

  for (var i = 0; i <= _entity_address; ++i) {
    console.log(_sectionChildren[i]);
    runningTotal += total(_sectionChildren[i]);
  }
  return runningTotal % sectionEntity.width() === 0 ? true : false;
};

const destinationIsSibling = (destinationEntity, draggedEntityAddress) => {
  if (destinationEntity.length > 2) {
    const whichSection = arr => arr[arr.length - 2];
    const isSibling = arr => arr[arr.length - 1];
    if (
      whichSection(destinationEntity) === whichSection(draggedEntityAddress)
    ) {
      if (
        isSibling(destinationEntity) ===
        (isSibling(draggedEntityAddress) + 1 ||
          isSibling(destinationEntity) === isSibling(draggedEntityAddress) - 1)
      ) {
        return true;
      }
    }
  }
};

export const rearrangers = {
  drop_handler: (event, props) => {
    event.stopPropagation();
    let data = JSON.parse(event.dataTransfer.getData('address'));
    console.log(data.action);
    move.init_prepend = props.model.prepend();
    move.init_append = props.model.append();
    move.source_address = address.bySample(props.model, props.form);

    if (data.action === 'move') {
      const sourceAddress = [...data.address];
      const destinationAddress = address.bySample(props.model, props.form);
      console.log(
        sourceAddress[sourceAddress.length - 2],
        destinationAddress[destinationAddress.length - 2]
      );
      const draggedEntity = address.byPath(props.form, data.address);

      let parentEntity = address.byPath(
        props.form,
        data.address.slice(0, data.address.length - 1)
      );

      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8;

      // # grids from event to end of FS row
      const offsetE1 = data.dragInit;
      const offsetGrids = round(
        (event.clientX -
          document
            .getElementById(
              `${props.model.UUID()}.${props.model.type()}.wrapper`
            )
            .getBoundingClientRect().left -
          offsetE1) /
          bgrndGrdWidth,
        0
      );

      // console.log(props.model, draggedEntity)
      console.log((destinationAddress, data.address));

      console.log(sourceAddress, destinationAddress);

      if (
        sourceAddress[sourceAddress.length - 2] !==
        destinationAddress[destinationAddress.length - 2]
      ) {
        /** valid drop on entity in different section */
        console.log(offsetGrids);
        if (offsetGrids <= props.model.prepend()) {
          console.log('entity from different section dropped on prepend');
          const newPrepend =
            props.model.prepend() - draggedEntity.width() - offsetGrids;

          // if (props.model.prepend() < offsetGrids) {
          const addEntityAppend =
            props.model.append() -
            offsetGrids -
            props.model.width() -
            draggedEntity.width();
          const newDestination = [...destinationAddress];
          newDestination[destinationAddress.length - 1] =
            destinationAddress[destinationAddress.length - 1];
          const entityToAdd = address.resurrectEntity(
            Object.assign({}, draggedEntity.properties(), {
              prepend: offsetGrids,
              append: newPrepend,
            })
          );
          // add new entity where it goes
          console.log(
            'add new entity where it goes: ',
            entityToAdd,
            newDestination
          );

          const modifiedAppend =
            total(props.model) - total(entityToAdd) - props.model.width();
          console.log('modifiedAppend', modifiedAppend);
          const desinationSiblingToAdjust = {
            prepend: 0,
            append: modifiedAppend,
          };

          console.log(desinationSiblingToAdjust);
          // adjust destination sibling
          props.mutate(destinationAddress, desinationSiblingToAdjust);

          props.add(newDestination, entityToAdd);
          // adjust origin sibling entity
          const restoreSibling = rearrangers.restoreDonorSiblingAddress(
            data.address,
            props,
            draggedEntity
          );

          if (restoreSibling) {
            props.mutate(restoreSibling.address, restoreSibling.properties);
          }

          // remove rearranged origin entity
          props.remove(data.address);

          console.log(offsetGrids);
        }

        /** valid drop on append */
        if (offsetGrids >= draggedEntity.prepend() + draggedEntity.width()) {
          console.log('entity from different section dropped on append');
          const newAppend =
            total(props.model) - offsetGrids - draggedEntity.width();

          // if (props.model.prepend() < offsetGrids) {
          const addEntityAppend =
            props.model.append() -
            offsetGrids -
            props.model.width() -
            draggedEntity.width();
          const newDestination = [...destinationAddress];
          newDestination[destinationAddress.length - 1] =
            destinationAddress[destinationAddress.length - 1] + 1;
          const entityToAdd = address.resurrectEntity(
            Object.assign({}, draggedEntity.properties(), {
              prepend: 0,
              append: newAppend,
            })
          );
          // add new entity where it goes
          console.log(
            'add new entity where it goes: ',
            entityToAdd,
            newDestination
          );
          props.add(newDestination, entityToAdd);

          const restoreSibling = rearrangers.restoreDonorSiblingAddress(
            data.address,
            props,
            draggedEntity
          );

          const modifyAppend =
            offsetGrids - (props.model.prepend() + props.model.width());
          console.log('modifyAppend', modifyAppend);
          const desinationSiblingToAdjust = {
            append: modifyAppend,
          };

          console.log(desinationSiblingToAdjust);
          // adjust destination sibling
          props.mutate(destinationAddress, desinationSiblingToAdjust);

          // adjust origin sibling entity
          if (restoreSibling) {
            props.mutate(restoreSibling.address, restoreSibling.properties);
          }

          // remove rearranged origin entity
          props.remove(data.address);
        }
      } else {
        console.log('entity rearrange from same section');
        console.log(data.address, destinationAddress);
        /*
          1. mutate
          2. add
          3. delete
        */
        console.log(move.init_append);
        const entityToMutate = Object.assign({}, props.model.properties(), {
          prepend: move.init_prepend + total(draggedEntity),
          append: move.init_append - draggedEntity.width(),
        });
        console.log('entityToMutate: ', destinationAddress, entityToMutate);

        console.log(offsetGrids);
        /**
         *
         * START @@@ HERE
         * evaluate if firstInRow should be refactored to be last in row. way to make dynamic?
         */

        const addressToAdd = [...destinationAddress];
        addressToAdd[destinationAddress.length - 1] =
          destinationAddress[destinationAddress.length - 1] + 1;
        console.log(firstInRow(destinationAddress, props));
        const entityToAdd = Object.assign({}, data.model, {
          prepend: 0,
          append: move.init_append - draggedEntity.width(),
        });
        console.log('entityToAdd: ', addressToAdd, entityToAdd);

        console.log('entityToRemove: ', destinationAddress);
      }
    }

    if (data.action === 'addEntity') {
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8;
      const destinationAddress = address.bySample(props.model, props.form);

      // # grids from event to end of FS row
      const offsetGrids = round(
        (event.clientX -
          document
            .getElementById(
              `${props.model.UUID()}.${props.model.type()}.wrapper`
            )
            .getBoundingClientRect().left) /
          bgrndGrdWidth,
        0
      );
      let draggedEntityNewAddress = [...destinationAddress];
      draggedEntityNewAddress[draggedEntityNewAddress.length - 1] =
        draggedEntityNewAddress[draggedEntityNewAddress.length - 1];
      let loc = [...destinationAddress];
      loc[loc.length - 1] = destinationAddress[destinationAddress.length - 1];

      /** valid drop on prepend */
      if (offsetGrids <= props.model.prepend()) {
        console.log(offsetGrids, props.model.prepend());

        const newAddress = [...destinationAddress];

        newAddress[destinationAddress.length - 1] =
          newAddress[destinationAddress.length - 1] + 1;
        console.log(
          'add this entity: ',
          destinationAddress,
          address.resurrectEntity(
            Object.assign({}, data.model, {
              prepend: offsetGrids,
              append: props.model.prepend() - offsetGrids - data.model.width,
            })
          )
        );

        props.add(
          destinationAddress,
          address.resurrectEntity(
            Object.assign({}, data.model, {
              prepend: offsetGrids,
              append: props.model.prepend() - offsetGrids - data.model.width,
            })
          )
        );

        console.log('mutate this entity: ', newAddress, {
          append: offsetGrids,
        });
        props.mutate(newAddress, {
          prepend: 0,
          append: offsetGrids,
        });
      }

      if (offsetGrids >= props.model.prepend() + props.model.width()) {
        const newAddress = [...destinationAddress];

        newAddress[destinationAddress.length - 1] =
          newAddress[destinationAddress.length - 1] + 1;
        console.log(
          'add this entity: ',
          destinationAddress,
          address.resurrectEntity(
            Object.assign({}, data.model, {
              prepend: 0,
              append: total(props.model) - offsetGrids - data.model.width,
            })
          )
        );

        props.add(
          newAddress,
          address.resurrectEntity(
            Object.assign({}, data.model, {
              prepend: 0,
              append: total(props.model) - offsetGrids - data.model.width,
            })
          )
        );
        const modifyAppend =
          offsetGrids - (props.model.prepend() + props.model.width());
        console.log('mutate this entity: ', newAddress, {
          append: modifyAppend,
        });
        props.mutate(destinationAddress, { append: modifyAppend });
      }
    }
  },

  restoreDonorSiblingAddress: (arr, props, draggedEntity) => {
    // get donor's parent
    const donorParent = address.byPath(
      props.form,
      arr.slice(0, arr.length - 1)
    );
    console.log(donorParent);
    if (donorParent.children().length === 1) {
      return false;
    } else {
      console.log(arr);
      const toLeft = arr => {
        const _toLeft = [...arr];
        if (_toLeft[arr.length - 1] < 1) {
          return false;
        } else {
          _toLeft[arr.length - 1] = _toLeft[arr.length - 1] - 1;
          return {
            address: _toLeft,
            entity: address.byPath(props.form, _toLeft),
          };
        }
      };
      const toRight = arr => {
        const _toRight = [...arr];
        _toRight[arr.length - 1] = _toRight[arr.length - 1] + 1;
        return {
          address: _toRight,
          entity: address.byPath(props.form, _toRight),
        };
      };

      console.log(toLeft(arr));

      if (toLeft(arr)) {
        console.log(
          'previous entity exists, adding to append: ',
          toLeft(arr).address
        );
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
      } else {
        console.log('no previous entity exists, adding to prepend', {
          prepend:
            toRight(arr).entity.prepend() +
            draggedEntity.prepend() +
            draggedEntity.width() +
            draggedEntity.append(),
        });
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
      }
    }
  },
};
