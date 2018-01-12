import React from 'react';
import { utility } from '../../../utility';
import { defaultPropsFE } from '../../../constants/defaultPropsFE';
import { aux } from '../../../constants/aux';

const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

const resizeStyle = {
  width: '20px',
  height: '20px',
  backgroundColor: 'yellow',
  position: 'absolute',
  right: 0,
  bottom: 0,
  cursor: 'w-resize'
}

let source = null
const resize = {
  init: null,
  init_grids: null,
  init_append: null,
  changed: null,
  grids: null,
  reset: null
}

let drag_handler = (event, props) => {
  event.stopPropagation();
  resize.reset = false
  let locEntity = utility.findEntityUuid(props.model.UUID(), props.form)
  let parentEntity = utility.findEntityByPath(props.form, locEntity[0].slice(0, locEntity[0].length - 1))
  const minWidth = defaultPropsFE[props.model.type()].render.minWidth
  console.log(locEntity[0], props.form, locEntity[0].slice(0, locEntity.length))
  const maxWidth = parentEntity.width();
  if (resize.init === null) { resize.init = event.pageX, resize.init_grids = props.model.width(), resize.init_append = props.model.append()
   }
  let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8

  // const fsWidth = parseInt((document.getElementById(`${parentEntity.UUID()}.${parentEntity.type()}`).clientWidth / parentEntity.width()), 10)

  const grid = round((((resize.init - event.pageX) / bgrndGrdWidth) - 1), 0)
  console.log(resize, grid)
  if (resize.grids != grid && event.pageX != 0) {
    resize.grids = grid
    if (!can_resize(minWidth, maxWidth)) {
      resize.reset = null
      console.log(resize.init_grids, resize.grids, maxWidth, minWidth)
      document.getElementById(`${props.model.UUID()}.${props.model.type()}`).style.backgroundColor = 'red'
     let timer =  setTimeout(function () {
        resize.reset != null ? mutate2(locEntity, props) : null
        }, 600)
    } else
    {
      console.log(locEntity[1])
      document.getElementById(
        `${props.model.UUID()}.${props.model.type()}`).style.backgroundColor = 'lightgreen'
      console.log(resize, locEntity[1], {
        width: (resize.init_grids - resize.grids),
        append: (resize.init_append + resize.grids),
      })
      props.mutateformentity(locEntity[0], {
        width: (resize.init_grids - resize.grids),
        append: (resize.init_append + resize.grids),
      })
    }
  }
}

const can_resize = (minWidth, maxWidth) => {
  if (resize.init_grids - resize.grids - 1 < maxWidth && resize.init_grids - resize.grids > minWidth) {
    console.log(minWidth, maxWidth, '867, valid resize')
    return true
  } else {
    console.log(minWidth, maxWidth, '867, invalid resize')
return false}
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

let dragstart_handler = (event, props) => {
  event.stopPropagation();
  // event.dataTransfer.setData("address", JSON.stringify({
  //   action: 'move',
  //   address: utility.findNode(props.model, props.form)
  // }))
  aux.dragStart_handler(event, props.model, props.form, 'resize')
}

let dragend_handler = function (event, props) {
  event.preventDefault();

    resize.init = null
    resize.init_grids = null
    resize.init_append = null
    resize.changed = null
    resize.grids = null
    resize.reset = null

  const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}`)
  // setTimeout(function () { element.style.backgroundColor = defaultPropsFE[props.model.type()].render.backgroundColor }, 120);
  element.style.backgroundColor = defaultPropsFE[props.model.type()].render.backgroundColor
}

let Resizer = (props) =>
  <div
    id={`${props.model.UUID()}.resizer`}
    className='resizer'
    style={resizeStyle}
    onDrag = {(event) => drag_handler(event, props)}
    onDragStart={(event) => dragstart_handler(event, props)}
    onDragEnd={(event) => dragend_handler(event, props)}
    draggable='true'
  >
  </div>

export default Resizer;