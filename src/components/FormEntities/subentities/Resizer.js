import React from 'react';
import { utility } from '../../../utility';
import { defaultPropsFE } from '../../../constants/defaultPropsFE';
import { aux } from '../../../constants/aux';

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
  let parentEntity = utility.findEntityByPath(props.form, locEntity[0].slice(0, locEntity.length))
  const minWidth = defaultPropsFE[props.model.type()].render.minWidth
  const maxWidth = parentEntity.width();
  if (resize.init === null) { resize.init = event.pageX, resize.init_grids = props.model.width(), resize.init_append = props.model.append()
   }

  let fsWidth = parseInt((document.getElementById(parentEntity.UUID()).clientWidth / parentEntity.width()), 10)
  const grid = (parseInt((resize.init - event.pageX) / fsWidth) - 1)
  if (resize.grids != grid && event.pageX != 0) {
    resize.grids = grid
    if (!can_resize(minWidth, maxWidth)) {
      resize.reset = null
      document.getElementById(props.model.UUID()).style.backgroundColor = 'red'
     let timer =  setTimeout(function () {
        resize.reset != null ? mutate2(locEntity, props) : null
        }, 600)
    } else
    {
      document.getElementById(
      props.model.UUID()).style.backgroundColor = 'lightgreen'
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
  const element = document.getElementById(props.model.UUID())
  setTimeout(function () { element.style.backgroundColor = defaultPropsFE[props.model.type()].render.backgroundColor }, 1200);
}

let Resizer = (props) =>
  <div
    // data-action={`resizer.${props.uuid}.${props.element}`}
    id={props.model.UUID()}
    className='resizer'
    style={resizeStyle}
    onDrag = {(event) => drag_handler(event, props)}
    onDragStart={(event) => dragstart_handler(event, props)}
    onDragEnd={(event) => dragend_handler(event, props)}
    draggable='true'
  >
  </div>

export default Resizer;