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

export const aux = {
  /**
   *
   * @param {FormEntity} entity
   * @param {FormSection} section
   * @param {number[]} path
   * @returns {FormEntity}
   */

  dragStart_handler: (event, model, form) => {
    event.stopPropagation();
    event.dataTransfer.setData("address", JSON.stringify({
      action: 'move',
      address: utility.findNode(model, form)
    }));
  },

  dragEnd_handler: (event, props, resize) => {
    event.stopPropagation();
    props.mutateformentity(resize.address, {
      prepend: (resize.init_prepend - resize.grids),
      append: (resize.init_append + resize.grids),
    })
  },

  drag_handler: (event, model, form, resize, props) => {
    event.stopPropagation();
    const can_move = (minWidth, maxWidth) => {
      if (resize.init_grids - resize.grids - 1 < maxWidth && resize.init_grids - resize.grids > minWidth) {
        console.log(minWidth, maxWidth, '867, valid move')
        return true
      } else {
        console.log(minWidth, maxWidth, '867, invalid move')
        return false
      }
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
    let parentEntity = utility.findEntityByPath(props.form, locEntity[0].slice(0, locEntity.length))
    const minWidth = defaultPropsFE[props.model.type()].render.minWidth
    const maxWidth = parentEntity.width();
    if (resize.init === null) {
      resize.init = event.pageX, resize.init_grids = props.model.width(), resize.init_append = props.model.append(),
        resize.init_prepend = props.model.prepend(),
        resize.address = locEntity[0]
    }

    let fsWidth = parseInt((document.getElementById(parentEntity.UUID()).clientWidth / parentEntity.width()), 10)
    const grid = (parseInt((resize.init - event.pageX) / fsWidth) - 1)
    if (resize.grids != grid && event.pageX != 0) {
      resize.grids = grid
      if (!can_move(minWidth, maxWidth)) {
        resize.reset = null
        document.getElementById(props.model.UUID()).style.backgroundColor = 'red'
        let timer = setTimeout(function () {
          resize.reset != null ? mutate2(locEntity, props) : null
        }, 600)
      } else {
        document.getElementById(
          props.model.UUID()).style.backgroundColor = 'lightgreen'
        console.log(locEntity[1])
        console.log({
          prepend: (resize.init_prepend - resize.grids),
          append: (resize.init_append + resize.grids),
        })

        // props.mutateformentity(locEntity[0], {
        //   prepend: (resize.init_prepend - resize.grids),
        //   append: (resize.init_append + resize.grids),
        // })
      }
    }
  },

  dropAppend_handler: (event, model, form, addformentity, removeformentity) => {
    // always place at destinationEnity[0] + 1
    event.stopPropagation();
    let data = JSON.parse(event.dataTransfer.getData("address"));
    // console.log(event, model, form, addformentity, removeformentity)

    let draggedEntity = utility.findEntityByPath(form, data.address)
    let destinationEntity = utility.findEntityUuid(model.UUID(), form)
    let draggedEntityNewAddress = [...destinationEntity[0]]
    draggedEntityNewAddress[draggedEntityNewAddress.length - 1] = draggedEntityNewAddress[draggedEntityNewAddress.length - 1] + 1
    console.log(draggedEntityNewAddress)

    let loc = [...destinationEntity[0]]
    loc[loc.length - 1] = (destinationEntity[0][destinationEntity[0].length - 1] + 1)


    if (data.action === 'move' && draggedEntity.UUID() != model.UUID() ) {
      'append drop'
      removeformentity(destinationEntity[0])

      addformentity(utility.resurrectEntity((Object.assign({}, destinationEntity[1].properties(), { append: 0 }))), destinationEntity[0])
      removeformentity(data.address)
      //  @hack - need to make append grow to end of row
      addformentity(utility.resurrectEntity((Object.assign({}, draggedEntity.properties(), { append: 0 }))), draggedEntityNewAddress)
      // { append: destinationEntity[1].append() - draggedEntity.width() }
    }
    event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'
  },



  // for dropping on an entity
  drop_handler: (event, model, form, addformentity, removeformentity) => {
    // remove from old address
    // add to new address
      // new address is detirmined if dropped on  or movePrior=0 or Append=1
    event.stopPropagation();
    let data = JSON.parse(event.dataTransfer.getData("address"));
    // console.log(event, model, form, addformentity, removeformentity)
    console.log(data)
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