import { address } from './address';
import { defaultPropsFE } from './constants/defaultPropsFE';

const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

export const helpers = {
  /**
   *
   * @param {FormEntity} entity
   * @param {FormSection} section
   * @param {number[]} path
   * @returns {FormEntity}
   */

  dragStart_handler: (event, model, form, action) => {
    event.stopPropagation();
    // console.log(action === 'move' ? round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3) : null)
    event.dataTransfer.setData(
      'address',
      JSON.stringify({
        action: action,
        address: action === 'addEntity' ? null : address.bySample(model, form),
        dragInit:
          action === 'move'
            ? round(
                event.clientX -
                  document
                    .getElementById(`${model.UUID()}.${model.type()}`)
                    .getBoundingClientRect().left,
                3
              )
            : null,
      })
    );
    // console.log(JSON.stringify({
    //   action: action || 'move',
    //   address: address.bySample(model, form),
    //   dragInit: round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3)
    // }))
    // console.log(event, model, form, action)
    // if (action === "resize") {
    //   console.log({
    //     action: action,
    //     address: address.bySample(model, form),
    //     dragInit: round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3)
    //   })
    //   event.dataTransfer.setData("address", JSON.stringify({
    //     action: action,
    //     address: address.bySample(model, form),
    //     dragInit: action === 'move' ? round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3) : null
    //   }));
    //   var img = new Image();
    //   img.src = '';
    //   event.dataTransfer.setDragImage(img, 10, 10);
    // }
    // if (action === "move") {
    //   event.dataTransfer.setData("address", JSON.stringify({
    //     action: action,
    //     address: address.bySample(model, form),
    //     // define initial click position to offset grids if not a topLevelFormSection, or if adding a new entity
    //     dragInit: action === 'move' && address.bySample(model, form).length > 1 ? round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3) : null
    //   }));
    // }
    if (action === 'addEntity') {
      event.dataTransfer.setData(
        'address',
        JSON.stringify({
          action: action,
          model: model,
          dragInit: null,
        })
      );
    }
  },

  dropMove_handler: (event, props, resize) => {
    event.stopPropagation();

    let data = JSON.parse(event.dataTransfer.getData('address'));
    if (data.action === 'move') {
      let entityUUID = address.byPath(props.form, data.address).UUID();
      if (entityUUID === props.model.UUID()) {
        // console.log(resize.grids)
        // const calc = ((newWidth) => {
        //   return props.add(address.resurrectEntity(
        //       Object.assign({},
        //         props.model.properties(), newWidth)
        //     ), locEntity[0])
        //   })

        // is change in grids positive or negative?
        // if (resize.grids > 0) {
        //   calc(calcOpp[source[2]]['+'](initGrid, diffGrid))
        // } else {
        //   calc(calcOpp[source[2]]['-'](initGrid, diffGrid))
        // }

        // var calcOpp = {
        //   '+': (a, b) => Object.assign({}, { prepend: initGrid.prepend + diffGrid, append: initGrid.append - diffGrid }),
        //   '-': (a, b) => Object.assign({}, { prepend: initGrid.prepend - diffGrid, append: initGrid.append + diffGrid }),
        // }

        // const calcMover = ((newWidth) => {
        //   let entityToChange = locEntity[1]
        //   props.remove(locEntity[0])f
        //   return props.add(address.resurrectEntity(
        //     Object.assign({},
        //       entityToChange.properties(), newWidth)
        //   ), locEntity[0])
        // })
        console.log('dropMove on: ', props.model.type());
        props.mutate(resize.address, {
          prepend: resize.init_prepend + resize.grids,
          append: resize.init_append - resize.grids,
        });
      }
    }
    const element = document.getElementById(
      `${props.model.UUID()}.${props.model.type()}`
    );
    // OK
    console.log(
      'change this: ',
      element.id +
        'to: ' +
        defaultPropsFE[props.model.type()].render.backgroundColor
    );
    element.style.backgroundColor =
      defaultPropsFE[props.model.type()].render.backgroundColor;
  },

  drag_handler: (event, model, form, resize, props) => {
    event.stopPropagation();
    const can_move = (minWidth, maxWidth) => {
      return true;
      // if (resize.init_grids - resize.grids - 1 < maxWidth && resize.init_grids - resize.grids > minWidth) {
      //   // console.log(minWidth, maxWidth, '867, valid move')
      //   return true
      // } else {
      //   // console.log(minWidth, maxWidth, '867, invalid move')
      //   return false
      // }
    };

    resize.reset = false;
    let locEntity = address.byUuid(props.model.UUID(), props.form);
    let parentEntity = address.byPath(
      props.form,
      locEntity[0].slice(0, locEntity[0].length - 1)
    );
    const minWidth = defaultPropsFE[props.model.type()].render.minWidth;
    const maxWidth = parentEntity.width();
    if (resize.init === null) {
      resize.init = event.pageX;
      resize.init_grids = props.model.width();
      resize.init_append = props.model.append();
      resize.init_prepend = props.model.prepend();
      resize.address = locEntity[0];
    }

    let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8;

    const grid = () => {
      var calc = event.pageX - resize.init;
      if (calc > 0) {
        return round(calc / bgrndGrdWidth, 0);
      } else {
        return round(calc / bgrndGrdWidth, 0);
      }
    };

    if (resize.grids !== grid() && event.pageX !== 0) {
      resize.grids = grid();
      if (!can_move(minWidth, maxWidth)) {
        console.log('invalid');
        resize.reset = null;
        document.getElementById(
          `${props.model.UUID()}.${props.model.type()}`.UUID()
        ).style.backgroundColor =
          'red';
        // let timer = setTimeout(function () {
        //   resize.reset !== null ? mutate2(locEntity, props) : null
        // }, 600)
      } else {
        // console.log(`changing ${props.model.UUID()}.${props.model.type()}color to 'lightgreen`)
        // document.getElementById(
        //   `${props.model.UUID()}.${props.model.type()}`).style.backgroundColor = 'lightgreen'
      }
    }
  },

  dropAppend_handler: (event, props) => {
    console.log('Append drop');
    let data = JSON.parse(event.dataTransfer.getData('address'));
    let draggedEntity = '';
    if (data.action !== 'addEntity') {
      draggedEntity = address.byPath(props.form, data.address);
    }
    let destinationEntity = address.byUuid(props.model.UUID(), props.form);

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
              isSibling(destinationEntity) ===
                isSibling(draggedEntityAddress) - 1)
          ) {
            return true;
          }
        }
      }
    };

    // move entity that isn't a formSection move
    if (
      data.action === 'move' &&
      draggedEntity.UUID() !== props.model.UUID() &&
      draggedEntity.type() !== 'FormSection'
    ) {
      console.log('dropped UUID different than props');
      let parentEntity = address.byPath(
        props.form,
        data.address.slice(0, data.address.length - 1)
      );
      console.log(parentEntity);

      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8;

      // # grids from event to end of FS row
      const offsetE1 = data.dragInit;
      const appendGrids = round(
        (event.clientX - event.target.getBoundingClientRect().left - offsetE1) /
          bgrndGrdWidth,
        0
      );
      let draggedEntityNewAddress = [...destinationEntity[0]];
      draggedEntityNewAddress[draggedEntityNewAddress.length - 1] =
        draggedEntityNewAddress[draggedEntityNewAddress.length - 1] + 1;
      let loc = [...destinationEntity[0]];
      loc[loc.length - 1] =
        destinationEntity[0][destinationEntity[0].length - 1] + 1;
      if (destinationIsSibling(destinationEntity[0], data.address)) {
        console.log('is sibling');
        const total = (prepend, append, width) => {
          return prepend + append + width;
        };
        const newArr = [...destinationEntity[0]];
        newArr[newArr.length - 1] = newArr[newArr.length - 1] + 1;
        console.log(appendGrids);
        const addEntityAppend =
          props.model.append() - 0 - draggedEntity.width();
        props.add(
          newArr,
          address.resurrectEntity(
            Object.assign({}, draggedEntity.properties(), {
              prepend: 0,
              append: addEntityAppend - appendGrids,
            })
          )
        );
        console.log(
          'mutate dropAppend',
          (destinationEntity[0],
          {
            append: appendGrids,
            prepend: total(
              draggedEntity.prepend(),
              draggedEntity.width(),
              draggedEntity.append()
            ),
          })
        );
        props.mutate(destinationEntity[0], {
          append: appendGrids,
          prepend: total(
            draggedEntity.prepend(),
            draggedEntity.width(),
            draggedEntity.append()
          ),
        });
        props.remove(data.address);
      }
    }

    if (data.action === 'addEntity') {
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8;

      // # grids from event to end of FS row
      const appendGrids = round(
        (event.clientX - event.target.getBoundingClientRect().left) /
          bgrndGrdWidth,
        0
      );
      let draggedEntityNewAddress = [...destinationEntity[0]];
      draggedEntityNewAddress[draggedEntityNewAddress.length - 1] =
        draggedEntityNewAddress[draggedEntityNewAddress.length - 1] + 1;
      let loc = [...destinationEntity[0]];
      loc[loc.length - 1] =
        destinationEntity[0][destinationEntity[0].length - 1];

      const newAddress = [...destinationEntity[0]];

      newAddress[destinationEntity[0].length - 1] =
        newAddress[destinationEntity[0].length - 1] + 1;
      console.log('here');
      props.add(
        newAddress,
        address.resurrectEntity(
          Object.assign({}, data.model, {
            append: props.model.append() - appendGrids - data.model.width,
          })
        )
      );

      props.mutate(destinationEntity[0], { append: appendGrids });
    }
    // event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    const element = document.getElementById(
      `${props.model.UUID()}.${props.model.type()}`
    );
    console.log(
      'change this: ',
      element.id +
        'to: ' +
        defaultPropsFE[props.model.type()].render.backgroundColor
    );
    element.style.backgroundColor =
      defaultPropsFE[props.model.type()].render.backgroundColor;
  },

  dropPrepend_handler: (event, props) => {
    console.log('dropPrepend');
    const destinationIsSibling = (destinationEntity, draggedEntityAddress) => {
      console.log(destinationEntity, draggedEntityAddress);
      if (destinationEntity.length > 2) {
        console.log('>2');
        const whichSection = arr => arr[arr.length - 2];
        const isSibling = arr => arr[arr.length - 1];
        if (
          whichSection(destinationEntity) === whichSection(draggedEntityAddress)
        ) {
          console.log('same Section');
          if (
            isSibling(destinationEntity) ===
              isSibling(draggedEntityAddress) + 1 ||
            isSibling(destinationEntity) === isSibling(draggedEntityAddress) - 1
          ) {
            console.log('yes we related');
            return true;
          }
        }
      }
    };

    let data = JSON.parse(event.dataTransfer.getData('address'));
    let draggedEntity = '';
    if (data.action !== 'addEntity') {
      draggedEntity = address.byPath(props.form, data.address);
    }
    let destinationEntity = address.byUuid(props.model.UUID(), props.form);

    if (
      data.action === 'move' &&
      draggedEntity.UUID() !== props.model.UUID() &&
      draggedEntity.type() !== 'FormSection'
    ) {
      console.log('dropped UUID different than props');

      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8;

      // # grids from event to end of FS row
      const offsetE1 = data.dragInit;
      const appendGrids = round(
        (event.clientX - event.target.getBoundingClientRect().left - offsetE1) /
          bgrndGrdWidth,
        0
      );
      let draggedEntityNewAddress = [...destinationEntity[0]];
      draggedEntityNewAddress[draggedEntityNewAddress.length - 1] =
        draggedEntityNewAddress[draggedEntityNewAddress.length - 1] + 1;
      let loc = [...destinationEntity[0]];
      loc[loc.length - 1] =
        destinationEntity[0][destinationEntity[0].length - 1] + 1;
      // get init_prepend of modified
      // console.log(destinationEntity[1].prepend())
      // console.log(appendGrids)
      const total = (prepend, append, width) => {
        return prepend + append + width;
      };
      console.log(destinationIsSibling(destinationEntity[0], data.address));
      if (destinationIsSibling(destinationEntity[0], data.address)) {
        console.log('is sibling');
        const total = (prepend, append, width) => {
          return prepend + append + width;
        };
        const newArr = [...destinationEntity[0]];
        newArr[newArr.length - 1] = newArr[newArr.length - 1];
        console.log(
          'add this one: ',
          newArr,
          Object.assign({}, draggedEntity.properties(), {
            prepend: appendGrids,
            append:
              props.model.prepend() -
              appendGrids -
              draggedEntity.width() -
              appendGrids,
          })
        );
        console.log(appendGrids);
        props.add(
          newArr,
          address.resurrectEntity(
            Object.assign({}, draggedEntity.properties(), {
              prepend: appendGrids,
              append:
                props.model.prepend() - 0 - draggedEntity.width() - appendGrids,
            })
          )
        );
        let mutateMe = [...data.address];
        mutateMe[data.address.length - 1] =
          data.address[data.address.length - 1];
        console.log('mutate this one: ', mutateMe, {
          prepend: 0,
          append: total(
            draggedEntity.prepend(),
            draggedEntity.width(),
            draggedEntity.append()
          ),
        });
        console.log(
          (mutateMe,
          {
            prepend: 0,
            append: total(
              draggedEntity.prepend(),
              draggedEntity.width(),
              draggedEntity.append()
            ),
          })
        );
        props.mutate(mutateMe, {
          prepend: 0,
          append: total(
            draggedEntity.prepend(),
            draggedEntity.width(),
            draggedEntity.append()
          ),
        });
        let removeMe = [...data.address];
        removeMe[data.address.length - 1] =
          data.address[data.address.length - 1] + 1;
        console.log(
          'remove this one; ',
          removeMe,
          address.byPath(props.form, removeMe)
        );

        props.remove(removeMe);
      } else {
        // mutate sibling entity origin
        const sisterAddress = [...destinationEntity[0]];
        sisterAddress[destinationEntity[0].length - 1] =
          destinationEntity[0][destinationEntity[0].length - 1] + 1;
        console.log(
          'mutate dropPrepend: ',
          destinationEntity[0],
          address.byPath(props.form, destinationEntity[0]),
          {
            prepend: total(
              draggedEntity.prepend(),
              draggedEntity.width(),
              draggedEntity.append()
            ),
          }
        );

        // restore append of previous sibling.
        // if no previous sibling, restore prepend

        const restoreDonorSiblingAddress = arr => {
          // get donor's parent
          const donorParent = address.byPath(
            props.form,
            arr.slice(0, arr.length - 1)
          );

          if (donorParent.children().length === 1) {
            return false;
          } else {
            const toLeft = arr => {
              const _toLeft = [...arr];
              if (_toLeft[arr.length - 1] < 1) {
                return false;
              }
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
              console.log('no previous entity exists, adding to prepend');
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
        };

        if (restoreDonorSiblingAddress(data.address)) {
          console.log(
            'mutate this donor: ',
            restoreDonorSiblingAddress(data.address).address,
            restoreDonorSiblingAddress(data.address).properties
          );

          props.mutate(
            restoreDonorSiblingAddress(data.address).address,
            restoreDonorSiblingAddress(data.address).properties
          );
        }

        console.log(
          'add this one: ',
          address.resurrectEntity(
            Object.assign({}, draggedEntity.properties(), {
              prepend: appendGrids,
              append:
                destinationEntity[1].prepend() -
                appendGrids -
                draggedEntity.width(),
            })
          ),
          destinationEntity[0]
        );
        console.log('dropPrepend add: ');
        props.add(
          destinationEntity[0],
          address.resurrectEntity(
            Object.assign({}, draggedEntity.properties(), {
              prepend: appendGrids,
              append:
                destinationEntity[1].prepend() -
                appendGrids -
                draggedEntity.width(),
            })
          )
        );
        // console.log('total existing: ', total(destinationEntity[1].width(), 0, destinationEntity[1].append()))
        // let mutateEntity = address.resurrectEntity(
        //   Object.assign({},
        //     destinationEntity[1].properties(), {
        //       prepend: 0,
        //       append: destinationEntity[1].append()
        //     }))
        // mutate sibling entity destination
        console.log('mutate this one: ', draggedEntityNewAddress, {
          prepend: 0,
          append: destinationEntity[1].append(),
        });
        props.mutate(draggedEntityNewAddress, {
          prepend: 0,
          append: destinationEntity[1].append(),
        });
        console.log('remove this one: ', data.address);
        props.remove(data.address);
      }
    }

    if (data.action === 'addEntity') {
      console.log('add entity on prepend');
      // let parentEntity = address.byPath(props.form, data.address.slice(0, data.address.length - 1))
      // let parentPx = document.getElementById(`${props.model.UUID()}.append`).clientWidth
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8;

      // # grids from event to end of FS row
      const appendGrids = round(
        (event.clientX - event.target.getBoundingClientRect().left) /
          bgrndGrdWidth,
        0
      );
      console.log('apendGrids: ', appendGrids);
      props.add(
        destinationEntity[0],
        address.resurrectEntity(
          Object.assign({}, data.model, {
            prepend: appendGrids,
            append: props.model.prepend() - appendGrids - data.model.width,
          })
        )
      );

      const removeEntityAddress = [...destinationEntity[0]];
      removeEntityAddress[destinationEntity[0].length - 1] =
        removeEntityAddress[destinationEntity[0].length - 1] + 1;
      // props.remove(removeEntityAddress)

      props.mutate(removeEntityAddress, { prepend: 0 });
    }
    // event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    const element = document.getElementById(
      `${props.model.UUID()}.${props.model.type()}`
    );
    console.log(
      'change this: ',
      element.id +
        'to: ' +
        defaultPropsFE[props.model.type()].render.backgroundColor
    );
    element.style.backgroundColor =
      defaultPropsFE[props.model.type()].render.backgroundColor;
  },

  // for dropping on an entity
  drop_handler: (event, model, form, add, remove) => {
    // remove from old address
    // add to new address
    // new address is detirmined if dropped on  or movePrior=0 or Append=1
    // event.stopPropagation();
    let data = JSON.parse(event.dataTransfer.getData('address'));

    let draggedEntity = address.byPath(form, data.address);
    let destinationEntity = address.byUuid(model.UUID(), form);

    let loc = [...destinationEntity[0]];
    loc[loc.length - 1] =
      destinationEntity[0][destinationEntity[0].length - 1] + 1;

    if (data.action === 'move') {
      // console.log(address.bySample(address.resurrectEntity(data.model), form))
      // console.log(loc)
      add(draggedEntity, destinationEntity[0]);
      console.log(data.address);
      // remove(data.address)
      // remove(address.byPath(data.model.uuid))
    }
    event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  },

  marginCalc: props => {
    const _margin = [0, 0, 0, 0];
    _margin[1] = props.model.append() > 0 ? 4 : 0;
    _margin[3] = props.model.prepend() > 0 ? 4 : 0;
    return _margin
      .map(el => `${el}px`)
      .toString()
      .replace(/,/g, ' ');
  },

  restoreDonorSiblingAddress: (arr, props) => {
    let draggedEntity = address.byPath(props.form, arr);
    const total = (prepend, width, append) => prepend + width + append;
    // get donor's parent
    const donorParent = address.byPath(
      props.form,
      arr.slice(0, arr.length - 1)
    );
    const entitySelf = address.byPath(props.form, arr);
    // console.log(total(0, 8, 0))
    // console.log(typeof(entitySelf.prepend()), typeof(entitySelf.width()), typeof(entitySelf.append()))
    // console.log(total(entitySelf.prepend(), entitySelf.width(), entitySelf.append()),
    //   total(donorParent.prepend() + donorParent.width() + donorParent.append()))
    console.log(
      total(entitySelf.prepend(), entitySelf.width(), entitySelf.append()),
      total(donorParent.prepend(), donorParent.width(), donorParent.append())
    );
    if (
      donorParent.children().length === 1 ||
      total(entitySelf.prepend(), entitySelf.width(), entitySelf.append()) ===
        total(donorParent.prepend(), donorParent.width(), donorParent.append())
    ) {
      console.log('entity being removed from formSection is the last child');
      return false;
    } else {
      console.log('donor formSection is not an empty nester');
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
          address: arr,
          entity: address.byPath(props.form, _toRight),
        };
      };

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
        console.log(
          'no previous entity exists, adding to prepend, ',
          address.byPath(props.form, toRight(arr).address),
          {
            address: toRight(arr).address,
            properties: {
              prepend:
                toRight(arr).entity.prepend() +
                draggedEntity.prepend() +
                draggedEntity.width() +
                draggedEntity.append(),
            },
          }
        );
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
