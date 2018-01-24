import { utility } from './utility';
import { defaultPropsFE } from './constants/defaultPropsFE';

const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

const total = (entity) => entity.prepend() + entity.width() + entity.append()

const move = {
  mouseDownStartX: null,
  dX: null,
  mouseDownStopX: null,
  offsetInit: null,
  init_prepend: null,
  init_append: null,
  source_address: null,
  destination_address: null,
  valid: null
}

// const destinationIsSibling = (destinationEntity, draggedEntityAddress) => {
//   if (destinationEntity.length > 2) {
//     const whichSection = (arr) => arr[arr.length - 2]
//     const isSibling = (arr) => arr[arr.length - 1]
//     if (whichSection(destinationEntity) === whichSection(draggedEntityAddress)) {
//       if (isSibling(destinationEntity) === (isSibling(draggedEntityAddress) + 1
//         || (isSibling(destinationEntity) === isSibling(draggedEntityAddress) - 1))) {
//         return true
//       }
//     }
//   }
// }

export const rearrangers = {
  drop_handler: (event, props) => {
    // helpers.dropAppend_handler(event, props)
    // rearrange
    let data = JSON.parse(event.dataTransfer.getData("address"));
    console.log(data.action)
    if (data.action === 'move') {
      const sourceAddress = [...data.address]
      const destinationAddress = utility.findNode(props.model, props.form)
      console.log(sourceAddress[sourceAddress.length - 2], destinationAddress[destinationAddress.length - 2])
      const draggedEntity = utility.findEntityByPath(props.form, data.address)

      let parentEntity = utility.findEntityByPath(props.form, data.address.slice(0, data.address.length - 1))

      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8

      // # grids from event to end of FS row
      const offsetE1 = data.dragInit;
      const offsetGrids = round(((event.clientX - document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`).getBoundingClientRect().left - offsetE1) / bgrndGrdWidth), 0)

      if (sourceAddress[sourceAddress.length - 2] !== destinationAddress[destinationAddress.length - 2]) {
        /** valid drop on prepend */
        console.log(offsetGrids)
        if (offsetGrids <= props.model.prepend()) {
          console.log('entity from different section dropped on prepend')
          const newPrepend = (props.model.prepend() - draggedEntity.width() - offsetGrids)

          // if (props.model.prepend() < offsetGrids) {
          const addEntityAppend = (props.model.append() - offsetGrids - props.model.width() - draggedEntity.width())
          const newDestination = [...destinationAddress]
          newDestination[destinationAddress.length - 1] = destinationAddress[destinationAddress.length - 1]
          const entityToAdd = utility.resurrectEntity(
            Object.assign({},
              draggedEntity.properties(), {
                prepend: offsetGrids,
                append: newPrepend
              })
          )
          // add new entity where it goes
          console.log('add new entity where it goes: ', entityToAdd, newDestination)

          const modifiedAppend = (total(props.model) - total(entityToAdd) - props.model.width())
          console.log('modifiedAppend', modifiedAppend)
          const desinationSiblingToAdjust =
            {
              prepend: 0,
              append: modifiedAppend
            }

          console.log(desinationSiblingToAdjust)
          // adjust destination sibling
          props.mutateformentity(destinationAddress, desinationSiblingToAdjust)

          props.addformentity(entityToAdd, newDestination)
          // adjust origin sibling entity
          const restoreSibling = rearrangers.restoreDonorSiblingAddress(data.address, props, draggedEntity)

          if (restoreSibling) {
            props.mutateformentity(restoreSibling.address, restoreSibling.properties)
          }

          // remove rearranged origin entity
          props.removeformentity(data.address)

          console.log(offsetGrids)
        }

        /** valid drop on append */
        if (offsetGrids >= (draggedEntity.prepend() + draggedEntity.width())) {
          console.log('entity from different section dropped on append')
          const newAppend = (total(props.model) - offsetGrids - draggedEntity.width())

          // if (props.model.prepend() < offsetGrids) {
          const addEntityAppend = (props.model.append() - offsetGrids - props.model.width() - draggedEntity.width())
          const newDestination = [...destinationAddress]
          newDestination[destinationAddress.length - 1] = destinationAddress[destinationAddress.length - 1] + 1
          const entityToAdd = utility.resurrectEntity(
            Object.assign({},
              draggedEntity.properties(), {
                prepend: 0,
                append: newAppend
              })
          )
          // add new entity where it goes
          console.log('add new entity where it goes: ', entityToAdd, newDestination)
          props.addformentity(entityToAdd, newDestination)

          const restoreSibling = rearrangers.restoreDonorSiblingAddress(data.address, props, draggedEntity)

          const modifyAppend = (offsetGrids - (props.model.prepend() + props.model.width()))
          console.log('modifyAppend', modifyAppend)
          const desinationSiblingToAdjust =
            {
              append: modifyAppend
            }

          console.log(desinationSiblingToAdjust)
          // adjust destination sibling
          props.mutateformentity(destinationAddress, desinationSiblingToAdjust)

          // adjust origin sibling entity
          if (restoreSibling) {
            props.mutateformentity(restoreSibling.address, restoreSibling.properties)
          }

          // remove rearranged origin entity
          props.removeformentity(data.address)

          console.log(offsetGrids)
        }
      }
    }

    if (data.action === 'addEntity') {
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8
      const destinationAddress = utility.findNode(props.model, props.form)

      // # grids from event to end of FS row
      const offsetGrids = round(((event.clientX - document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`).getBoundingClientRect().left) / bgrndGrdWidth), 0)
      let draggedEntityNewAddress = [...destinationAddress]
      draggedEntityNewAddress[draggedEntityNewAddress.length - 1] = draggedEntityNewAddress[draggedEntityNewAddress.length - 1]
      let loc = [...destinationAddress]
      loc[loc.length - 1] = (destinationAddress[destinationAddress.length - 1])

      /** valid drop on prepend */
      if (offsetGrids <= props.model.prepend()) {
        console.log(offsetGrids, props.model.prepend())

        const newAddress = [...destinationAddress]

        newAddress[destinationAddress.length - 1] = newAddress[destinationAddress.length - 1] + 1
        console.log('add this entity: ', destinationAddress,  utility.resurrectEntity(
          Object.assign({},
            data.model, {
              prepend: offsetGrids,
              append: (props.model.prepend() - offsetGrids - data.model.width)
            })
        ))

        props.addformentity(utility.resurrectEntity(
          Object.assign({},
            data.model, {
              prepend: offsetGrids,
              append: (props.model.prepend() - offsetGrids - data.model.width)
            })
          ), destinationAddress)

          console.log('mutate this entity: ', newAddress, { append: offsetGrids })
        props.mutateformentity(newAddress, {
          prepend: 0,
          append: offsetGrids
          })
      }

      if (offsetGrids >= props.model.prepend() + props.model.width()) {

        const newAddress = [...destinationAddress]

        newAddress[destinationAddress.length - 1] = newAddress[destinationAddress.length - 1] + 1
        console.log('add this entity: ', destinationAddress,  utility.resurrectEntity(
          Object.assign({},
            data.model, {
              prepend: 0,
              append: (total(props.model) - offsetGrids - data.model.width)
            })
        ))

        props.addformentity(utility.resurrectEntity(
          Object.assign({},
            data.model, {
              prepend: 0,
              append: (total(props.model) - offsetGrids - data.model.width)
            })
          ), newAddress)
        const modifyAppend = (offsetGrids - (props.model.prepend() + props.model.width()))
          console.log('mutate this entity: ', newAddress, { append: modifyAppend })
        props.mutateformentity(destinationAddress, { append: modifyAppend })
      }


    }
  },

  restoreDonorSiblingAddress: (arr, props, draggedEntity) => {
    // get donor's parent
    const donorParent = utility.findEntityByPath(props.form, arr.slice(0, arr.length - 1))
    console.log(donorParent)
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
        console.log('no previous entity exists, adding to prepend', { prepend: toRight(arr).entity.prepend() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append() })
        return ({
          address: toRight(arr).address,
          properties:
            { prepend: toRight(arr).entity.prepend() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append() }
        })
      }
    }
  }
}