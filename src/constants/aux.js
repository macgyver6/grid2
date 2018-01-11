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
    event.stopPropagation();
    // console.log(JSON.stringify({
    //   action: action || 'move',
    //   address: utility.findNode(model, form),
    //   dragInit: round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3)
    // }))
    if (action === "move") {
      console.log({
        action: action || 'move',
        address: utility.findNode(model, form),
        dragInit: action === 'move' ? round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3) : null
      })
      event.dataTransfer.setData("address", JSON.stringify({
        action: action,
        address: utility.findNode(model, form),
        dragInit: action === 'move' ? round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3) : null
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
    event.stopPropagation();
    let data = JSON.parse(event.dataTransfer.getData('address'))
    console.log('dropmove: ', data)
    let entityUUID = utility.findEntityByPath(props.form, data.address).UUID()
    if (data.action === 'move' && entityUUID === props.model.UUID()) {
      console.log({
        prepend: (resize.init_prepend - resize.grids),
        append: (resize.init_append + resize.grids),
      })
      props.mutateformentity(resize.address,
        {
        prepend: (resize.init_prepend - resize.grids),
        append: (resize.init_append + resize.grids),
      }
    )
    }
  },

  drag_handler: (event, model, form, resize, props) => {
    event.stopPropagation();
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

    const fsWidth = parseInt((document.getElementById(`${parentEntity.UUID()}.${parentEntity.type()}`).clientWidth / parentEntity.width()), 10)
    const grid = (parseInt((resize.init - event.pageX) / fsWidth) - 1)
    if (resize.grids != grid && event.pageX != 0) {
      resize.grids = grid
      if (!can_move(minWidth, maxWidth)) {
        console.log('invalid')
        resize.reset = null
        document.getElementById(`${props.model.UUID()}.${props.model.type()}`.UUID()).style.backgroundColor = 'red'
        let timer = setTimeout(function () {
          resize.reset != null ? mutate2(locEntity, props) : null
        }, 600)
      } else {
        document.getElementById(
          props.model.UUID()).style.backgroundColor = 'lightgreen'
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
    let data = JSON.parse(event.dataTransfer.getData("address"));

    let draggedEntity = utility.findEntityByPath(props.form, data.address)
    let destinationEntity = utility.findEntityUuid(props.model.UUID(), props.form)

    let parentEntity = utility.findEntityByPath(props.form, data.address.slice(0, data.address.length - 1))
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

    if (data.action === 'move' && draggedEntity.UUID() != props.model.UUID()) {
      props.mutateformentity(destinationEntity[0], { append: appendGrids} )
      props.removeformentity(data.address)
      props.addformentity(utility.resurrectEntity(
        Object.assign({},
          draggedEntity.properties(), {
            prepend: 0,
            append: (parentEntity.width() - props.model.prepend() - props.model.width() - appendGrids - draggedEntity.width())
          })
      ), draggedEntityNewAddress)
    }
    event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'
  },

  // for dropping on an entity
  drop_handler: (event, model, form, addformentity, removeformentity) => {
    console.log(event.target)
    // remove from old address
    // add to new address
    // new address is detirmined if dropped on  or movePrior=0 or Append=1
    event.stopPropagation();
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