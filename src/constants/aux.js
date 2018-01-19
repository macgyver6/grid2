import FormComponent from '../components/FormEntities/Form';
import FormSectionComponent from '../components/FormEntities/FormSection';
import TextInputComponent from '../components/FormEntities/TextInput';
import TextAreaComponent from '../components/FormEntities/TextArea';
import CheckBoxComponent from '../components/FormEntities/CheckBox';
import RadioButtonComponent from '../components/FormEntities/RadioButton';
import { Form } from '../data/Form';
import { FormSection } from '../data/FormSection';
import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';
import { CheckBox } from '../data/CheckBox';
import { RadioButton } from '../data/RadioButton';
import { utility } from '../utility';
import { defaultPropsFE } from './defaultPropsFE';

const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

export const aux = {
  /**
   *
   * @param {FormEntity} entity
   * @param {FormSection} section
   * @param {number[]} path
   * @returns {FormEntity}
   */

  dragStart_handler: (event, model, form, action) => {
    // event.stopPropagation();
    // console.log(JSON.stringify({
    //   action: action || 'move',
    //   address: utility.findNode(model, form),
    //   dragInit: round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3)
    // }))
    console.log(event, model, form, action)
    if (action === "resize") {
      console.log({
        action: action,
        address: utility.findNode(model, form),
        dragInit: round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3)
      })
      event.dataTransfer.setData("address", JSON.stringify({
        action: action,
        address: utility.findNode(model, form),
        dragInit: action === 'move' ? round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3) : null
      }));
      var img = new Image();
      img.src = '';
      event.dataTransfer.setDragImage(img, 10, 10);
    }
    if (action === "move") {
      event.dataTransfer.setData("address", JSON.stringify({
        action: action,
        address: utility.findNode(model, form),
        // define initial click position to offset grids if not a topLevelFormSection, or if adding a new entity
        dragInit: action === 'move' && utility.findNode(model, form).length > 1 ? round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3) : null
      }));
    }
    if (action === "addEntity") {
      event.dataTransfer.setData("address", JSON.stringify({
        action: action,
        model: model,
        dragInit: null
      }));
    }
  },

  dropMove_handler: (event, props, resize) => {
    // event.stopPropagation();

    let data = JSON.parse(event.dataTransfer.getData('address'))
    if (data.action === 'move') {
      let entityUUID = utility.findEntityByPath(props.form, data.address).UUID()
      if (entityUUID === props.model.UUID() ) {
        // console.log(resize.grids)
        // const calc = ((newWidth) => {
        //   return props.addformentity(utility.resurrectEntity(
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
        //   props.removeformentity(locEntity[0])
        //   return props.addformentity(utility.resurrectEntity(
        //     Object.assign({},
        //       entityToChange.properties(), newWidth)
        //   ), locEntity[0])
        // })

        props.mutateformentity(resize.address,
          {
          prepend: (resize.init_prepend + resize.grids),
          append: (resize.init_append - resize.grids),
        })
      }
    }
    const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}`)
    element.style.backgroundColor = defaultPropsFE[props.model.type()].render.backgroundColor
  },

  drag_handler: (event, model, form, resize, props) => {
    // event.stopPropagation();
    const can_move = (minWidth, maxWidth) => {
      return true
      // if (resize.init_grids - resize.grids - 1 < maxWidth && resize.init_grids - resize.grids > minWidth) {
      //   // console.log(minWidth, maxWidth, '867, valid move')
      //   return true
      // } else {
      //   // console.log(minWidth, maxWidth, '867, invalid move')
      //   return false
      // }
    }
    const mutate2 = (locEntity, props) => {
      props.removeformentity(locEntity[0])
      props.addformentity(utility.resurrectEntity(
        Object.assign({},
          locEntity[1].properties(), {
            width: (resize.init_grids),
            append: (resize.init_append),
          })
      ), locEntity[0])
    }

    resize.reset = false
    let locEntity = utility.findEntityUuid(props.model.UUID(), props.form)
    let parentEntity = utility.findEntityByPath(props.form, locEntity[0].slice(0, locEntity[0].length - 1))
    const minWidth = defaultPropsFE[props.model.type()].render.minWidth
    const maxWidth = parentEntity.width();
    if (resize.init === null) {
      resize.init = event.pageX, resize.init_grids = props.model.width(), resize.init_append = props.model.append(),
        resize.init_prepend = props.model.prepend(),
        resize.address = locEntity[0]
    }

    let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8

    const grid = () => {
      var calc = event.pageX - resize.init;
      if (calc > 0) {
        return round(((calc / bgrndGrdWidth) ), 0)
      } else {
        return round(((calc / bgrndGrdWidth)), 0)
      }
    }

    if (resize.grids != grid() && event.pageX != 0) {
      resize.grids = grid()
      if (!can_move(minWidth, maxWidth)) {
        console.log('invalid')
        resize.reset = null
        document.getElementById(`${props.model.UUID()}.${props.model.type()}`.UUID()).style.backgroundColor = 'red'
        let timer = setTimeout(function () {
          resize.reset != null ? mutate2(locEntity, props) : null
        }, 600)
      } else {
        document.getElementById(
          `${props.model.UUID()}.${props.model.type()}`).style.backgroundColor = 'lightgreen'
        // console.log(locEntity[1])
        // console.log({
        //   prepend: (resize.init_prepend - resize.grids),
        //   append: (resize.init_append + resize.grids),
        // })

        // props.mutateformentity(locEntity[0], {
        //   prepend: (resize.init_prepend - resize.grids),
        //   append: (resize.init_append + resize.grids),
        // })
      }
    }
  },

  dropAppend_handler: (event, props) => {
    console.log('Append drop')
    let data = JSON.parse(event.dataTransfer.getData("address"));
    let draggedEntity = ''
    if (data.action != 'addEntity') {
      draggedEntity = utility.findEntityByPath(props.form, data.address)
    }
    let destinationEntity = utility.findEntityUuid(props.model.UUID(), props.form)

    const total = (prepend, append, width) => { return (prepend + append + width) }

    const destinationIsSibling = (destinationEntity, draggedEntityAddress) => {
      if (destinationEntity.length > 2) {
        const whichSection = (arr) => arr[arr.length - 2]
        const isSibling = (arr) => arr[arr.length - 1]
        if (whichSection(destinationEntity) === whichSection(draggedEntityAddress)) {
          if (isSibling(destinationEntity) === (isSibling(draggedEntityAddress) + 1
            || (isSibling(destinationEntity) === isSibling(draggedEntityAddress) - 1))) {
            return true
          }
        }
      }
    }

    // move entity that isn't a formEntity move
    if (data.action === 'move' && draggedEntity.UUID() != props.model.UUID() && draggedEntity.type() != 'FormSection') {
      console.log('dropped UUID different than props')
      let parentEntity = utility.findEntityByPath(props.form, data.address.slice(0, data.address.length - 1))
      console.log(parentEntity)
      let parentPx = document.getElementById(`${parentEntity.UUID()}.${parentEntity.type()}`).clientWidth
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8

      let fsWidth = (parseInt((parentPx / parentEntity.width()), 10))
      // # grids from event to end of FS row
      const offsetE1 = data.dragInit;
      const appendGrids = round(((event.clientX - event.target.getBoundingClientRect().left - offsetE1) / bgrndGrdWidth), 0)
      let draggedEntityNewAddress = [...destinationEntity[0]]
      draggedEntityNewAddress[draggedEntityNewAddress.length - 1] = draggedEntityNewAddress[draggedEntityNewAddress.length - 1] + 1
      let loc = [...destinationEntity[0]]
      loc[loc.length - 1] = (destinationEntity[0][destinationEntity[0].length - 1] + 1)
      if (destinationIsSibling(destinationEntity[0], data.address)) {
        console.log('is sibling')
        const total = (prepend, append, width) => { return (prepend + append + width) }
        const newArr = [...destinationEntity[0]]
        newArr[newArr.length - 1] = newArr[newArr.length - 1] + 1
        console.log(appendGrids)
        const addEntityAppend = (props.model.append() - 0 - draggedEntity.width() )
        props.addformentity(utility.resurrectEntity(
          Object.assign({},
            draggedEntity.properties(), {
              prepend: 0,
              append: addEntityAppend - appendGrids
            })
          ), newArr)
        console.log('mutate dropAppend', (destinationEntity[0], {
          append: appendGrids,
          prepend: total(draggedEntity.prepend(), draggedEntity.width(), draggedEntity.append())
        }))
        props.mutateformentity(destinationEntity[0], {
          append: appendGrids,
          prepend: total(draggedEntity.prepend(), draggedEntity.width(), draggedEntity.append())
        })
        props.removeformentity(data.address)
      } else {
        const restoreDonorSiblingAddress = (arr) => {
          // get donor's parent
          const donorParent = utility.findEntityByPath(props.form, arr.slice(0, arr.length - 1))

          if (donorParent.children().length === 1) {
            return false
          } else {
          console.log(arr)
          const toLeft = (arr) => {
            const _toLeft = [...arr]
            if (_toLeft[arr.length - 1] < 1) {
              return false
            } else {
              _toLeft[arr.length - 1] = _toLeft[arr.length - 1] - 1
              return ({ address: _toLeft, entity: utility.findEntityByPath(props.form, _toLeft) })
            }
          }
          const toRight = (arr) => {
            const _toRight = [...arr]
            _toRight[arr.length - 1] = _toRight[arr.length - 1] + 1
            return ({
              address: _toRight,
              entity: utility.findEntityByPath(props.form, _toRight)
            })
          }

          console.log(toLeft(arr))

          if (toLeft(arr)) {
            console.log('previous entity exists, adding to append: ', toLeft(arr).address)
            return ({
              address: toLeft(arr).address,
              properties: {
                append: toLeft(arr).entity.append() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append()
              }
            })
          } else {
            console.log('no previous entity exists, adding to prepend')
            return ({
              address: toRight(arr).address,
              properties:
                { prepend: toRight(arr).entity.prepend() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append() }
            })
          }
        }
      }
      console.log(restoreDonorSiblingAddress(data.address))
      if (restoreDonorSiblingAddress(data.address)) {

        props.mutateformentity(restoreDonorSiblingAddress(data.address).address, restoreDonorSiblingAddress(data.address).properties)
        }
        // console.log('add this entity: ', Object.assign({},
        //   draggedEntity.properties(), {
        //     prepend: 0,
        //     append: (destinationEntity[1].width() - 0 - draggedEntity.width() - appendGrids)
        //   }))

        props.addformentity(utility.resurrectEntity(
          Object.assign({},
            draggedEntity.properties(), {
              prepend: 0,
              append: (destinationEntity[1].append() - 0 - draggedEntity.width() - appendGrids)
            })
        ), draggedEntityNewAddress)
        props.removeformentity(data.address)
        props.mutateformentity(destinationEntity[0], { append: appendGrids} )


      }
    }

    if (data.action === 'addEntity') {
      // let parentEntity = utility.findEntityByPath(props.form, data.address.slice(0, data.address.length - 1))
      let parentPx = document.getElementById(`${props.model.UUID()}.append`).clientWidth
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8

      let fsWidth = (parseInt((parentPx / props.model.width()), 10))
      // # grids from event to end of FS row
      const appendGrids = round(((event.clientX - event.target.getBoundingClientRect().left) / bgrndGrdWidth), 0)
      let draggedEntityNewAddress = [...destinationEntity[0]]
      draggedEntityNewAddress[draggedEntityNewAddress.length - 1] = draggedEntityNewAddress[draggedEntityNewAddress.length - 1] + 1
      let loc = [...destinationEntity[0]]
      loc[loc.length - 1] = (destinationEntity[0][destinationEntity[0].length - 1])

      const newAddress = [...destinationEntity[0]]

      newAddress[destinationEntity[0].length - 1] = newAddress[destinationEntity[0].length - 1] + 1
      console.log('here')
      props.addformentity(utility.resurrectEntity(
        Object.assign({},
          data.model, {
            append: (props.model.append() - appendGrids - data.model.width)
          })
      ), newAddress)

      props.mutateformentity(destinationEntity[0], { append: appendGrids })

    }
    // event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}`)
    element.style.backgroundColor = defaultPropsFE[props.model.type()].render.backgroundColor
  },

  dropPrepend_handler: (event, props) => {
    console.log('dropPrepend')
    const destinationIsSibling = (destinationEntity, draggedEntityAddress) => {
      console.log(destinationEntity, draggedEntityAddress)
      if (destinationEntity.length > 2) {
        console.log('>2')
        const whichSection = (arr) => arr[arr.length - 2]
        const isSibling = (arr) => arr[arr.length - 1]
        if (whichSection(destinationEntity) === whichSection(draggedEntityAddress)) {
          console.log('same Section')
          if (isSibling(destinationEntity) === isSibling(draggedEntityAddress) + 1
            || isSibling(destinationEntity) === isSibling(draggedEntityAddress) - 1) {
            console.log('yes we related')
            return true
          }
        }
      }
    }

    let data = JSON.parse(event.dataTransfer.getData("address"));
    let draggedEntity = ''
    if (data.action != 'addEntity') {
      draggedEntity = utility.findEntityByPath(props.form, data.address)
    }
    let destinationEntity = utility.findEntityUuid(props.model.UUID(), props.form)

    if (data.action === 'move' && draggedEntity.UUID() != props.model.UUID() && draggedEntity.type() != 'FormSection') {
      console.log('dropped UUID different than props')
      let parentEntity = utility.findEntityByPath(props.form, data.address.slice(0, data.address.length - 1))
      console.log(parentEntity)
      let parentPx = document.getElementById(`${parentEntity.UUID()}.${parentEntity.type()}`).clientWidth
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8

      let fsWidth = (parseInt((parentPx / parentEntity.width()), 10))
      // # grids from event to end of FS row
      const offsetE1 = data.dragInit;
      const appendGrids = round(((event.clientX - event.target.getBoundingClientRect().left - offsetE1) / bgrndGrdWidth), 0)
      let draggedEntityNewAddress = [...destinationEntity[0]]
      draggedEntityNewAddress[draggedEntityNewAddress.length - 1] = draggedEntityNewAddress[draggedEntityNewAddress.length - 1] + 1
      let loc = [...destinationEntity[0]]
      loc[loc.length - 1] = (destinationEntity[0][destinationEntity[0].length - 1] + 1)
      // get init_prepend of modified
      // console.log(destinationEntity[1].prepend())
      // console.log(appendGrids)
      const total = (prepend, append, width) => { return (prepend + append + width)}
      console.log(destinationIsSibling(destinationEntity[0], data.address))
      if (destinationIsSibling(destinationEntity[0], data.address)) {
        console.log('is sibling')
        const total = (prepend, append, width) => { return (prepend + append + width) }
        const newArr = [...destinationEntity[0]]
        newArr[newArr.length - 1] = newArr[newArr.length - 1]
        console.log('add this one: ', newArr,
          Object.assign({},
            draggedEntity.properties(), {
              prepend: appendGrids,
              append: (props.model.prepend() - appendGrids - draggedEntity.width() - appendGrids)
            }))
            console.log(appendGrids)
        props.addformentity(utility.resurrectEntity(
          Object.assign({},
            draggedEntity.properties(), {
              prepend: appendGrids,
              append: (props.model.prepend() - 0 - draggedEntity.width() - appendGrids )
            })
        ), newArr)
        let mutateMe = [...data.address]
        mutateMe[data.address.length - 1] = data.address[data.address.length - 1]
        console.log('mutate this one: ', mutateMe, {
          prepend: 0,
          append: total(draggedEntity.prepend(), draggedEntity.width(), draggedEntity.append())})
        console.log((mutateMe, {
          prepend: 0,
          append: total(draggedEntity.prepend(), draggedEntity.width(), draggedEntity.append())
        }))
        props.mutateformentity(mutateMe, {
          prepend: 0,
          append: total(draggedEntity.prepend(), draggedEntity.width(), draggedEntity.append())})
        let removeMe = [...data.address]
        removeMe[data.address.length - 1] = data.address[data.address.length  -1 ] + 1
        console.log('remove this one; ', removeMe, utility.findEntityByPath(props.form, removeMe))

        props.removeformentity(removeMe)
      } else {
        // mutate sibling entity origin
        const sisterAddress = [...destinationEntity[0]]
        sisterAddress[destinationEntity[0].length - 1] = destinationEntity[0][destinationEntity[0].length - 1] + 1
        console.log('mutate dropPrepend: ', destinationEntity[0], utility.findEntityByPath(props.form, destinationEntity[0]), { prepend: total(draggedEntity.prepend(), draggedEntity.width(), draggedEntity.append()) })

        // restore append of previous sibling.
        // if no previous sibling, restore prepend

        const restoreDonorSiblingAddress = (arr) => {
          // get donor's parent
          const donorParent = utility.findEntityByPath(props.form, arr.slice(0, arr.length - 1))

          if (donorParent.children().length === 1) {
            return false
          } else {
            const toLeft = (arr) => {
              const _toLeft = [...arr]
              if (_toLeft[arr.length - 1] < 1) {
                return false
              }
              _toLeft[arr.length - 1] = _toLeft[arr.length - 1] - 1
              return ({address: _toLeft, entity: utility.findEntityByPath(props.form, _toLeft)})
            }
            const toRight = (arr) => {
              const _toRight = [...arr]
              _toRight[arr.length - 1] = _toRight[arr.length - 1] + 1
              return ({address: _toRight,
                entity: utility.findEntityByPath(props.form, _toRight)})
            }

            if (toLeft(arr)) {
              console.log('previous entity exists, adding to append: ', toLeft(arr).address)
              return ({
                address: toLeft(arr).address,
                properties: {
                append: toLeft(arr).entity.append() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append()}
              })
            } else {
              console.log('no previous entity exists, adding to prepend')
              return ({
                address: toRight(arr).address,
                properties:
               { prepend: toRight(arr).entity.prepend() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append()}
              })
            }
          }

        }


        if (restoreDonorSiblingAddress(data.address)) {
          console.log('mutate this donor: ', restoreDonorSiblingAddress(data.address).address, restoreDonorSiblingAddress(data.address).properties)

          props.mutateformentity(restoreDonorSiblingAddress(data.address).address, restoreDonorSiblingAddress(data.address).properties)
        }



        console.log('add this one: ', utility.resurrectEntity(
          Object.assign({},
            draggedEntity.properties(), {
              prepend: appendGrids,
              append: (destinationEntity[1].prepend() - appendGrids - draggedEntity.width())
            })
        ), destinationEntity[0])
        console.log('dropPrepend add: ')
        props.addformentity(utility.resurrectEntity(
          Object.assign({},
            draggedEntity.properties(), {
              prepend: appendGrids,
              append: (destinationEntity[1].prepend() - appendGrids - draggedEntity.width())
            })
        ), destinationEntity[0])
        // console.log('total existing: ', total(destinationEntity[1].width(), 0, destinationEntity[1].append()))
        let mutateEntity = utility.resurrectEntity(
          Object.assign({},
            destinationEntity[1].properties(), {
              prepend: 0,
              append: destinationEntity[1].append()
            }))
        // mutate sibling entity destination
        console.log('mutate this one: ', draggedEntityNewAddress, {
          prepend: 0,
          append: destinationEntity[1].append()
        } )
        props.mutateformentity(draggedEntityNewAddress, {
          prepend: 0,
          append: destinationEntity[1].append()
        } )
        console.log('remove this one: ', data.address)
        props.removeformentity(data.address)
      }
    }

    if (data.action === 'addEntity') {
      console.log('add entity on prepend')
      // let parentEntity = utility.findEntityByPath(props.form, data.address.slice(0, data.address.length - 1))
      // let parentPx = document.getElementById(`${props.model.UUID()}.append`).clientWidth
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8

      let fsWidth = (parseInt((bgrndGrdWidth / props.model.width()), 10))
      // # grids from event to end of FS row
      const appendGrids = round(((event.clientX - event.target.getBoundingClientRect().left) / bgrndGrdWidth), 0)
      console.log('apendGrids: ', appendGrids)
      props.addformentity(utility.resurrectEntity(
        Object.assign({},
          data.model, {
            prepend: appendGrids,
            append: (props.model.prepend() - appendGrids - data.model.width)
          })
      ), destinationEntity[0])

      const removeEntityAddress = [...destinationEntity[0]]
      removeEntityAddress[destinationEntity[0].length - 1] = removeEntityAddress[destinationEntity[0].length - 1] + 1
      // props.removeformentity(removeEntityAddress)


      props.mutateformentity(removeEntityAddress, { prepend: 0 })

    }
    // event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}`)
    element.style.backgroundColor = defaultPropsFE[props.model.type()].render.backgroundColor
  },

  // for dropping on an entity
  drop_handler: (event, model, form, addformentity, removeformentity) => {
    // remove from old address
    // add to new address
    // new address is detirmined if dropped on  or movePrior=0 or Append=1
    // event.stopPropagation();
    let data = JSON.parse(event.dataTransfer.getData("address"));
    const totalWidthNewEntity = () => data.model.prepend + data.model.width + data.model.append
    let draggedEntity = utility.findEntityByPath(form, data.address)
    let destinationEntity = utility.findEntityUuid(model.UUID(), form)

    let loc = [...destinationEntity[0]]
    loc[loc.length - 1] = (destinationEntity[0][destinationEntity[0].length - 1] + 1)


    if (data.action === 'move') {
      // console.log(utility.findNode(utility.resurrectEntity(data.model), form))
      // console.log(loc)
      addformentity((draggedEntity), destinationEntity[0])
      console.log(data.address)
      // removeformentity(data.address)
      // removeformentity(utility.findEntityByPath(data.model.uuid))
    }
    event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'
  }
}