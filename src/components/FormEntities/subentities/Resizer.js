import React from 'react';
import { utility } from '../../../utility';

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
  grids: null
}

let drag_handler = (event, props) => {
  // console.log('drag_handler, ', event.screenX)
  if (resize.init === null) { resize.init = event.screenX, resize.init_grids = props.model.width(), resize.init_append = props.model.append() }
  let locEntity = utility.findEntityUuid(props.model.UUID(), props.form)
    let parentEntity = utility.findEntityByPath(props.form, locEntity[0].slice(0, locEntity.length))
  let fsWidth = parseInt((document.getElementById(parentEntity.UUID()).clientWidth / parentEntity.width()), 10)
  const grid = parseInt(Math.abs(resize.init - event.screenX) / fsWidth + 1)
  if (resize.grids != grid) {
    resize.grids = grid
    props.removeformentity(locEntity[0])
    console.log('yolo, ', resize)
    // console.log('yolo, ', {
    //   width: (props.model.width() + resize.grids),
    //   append: (props.model.append() - resize.grids),
    // })
    props.addformentity(utility.resurrectEntity(
      Object.assign({},
        locEntity[1].properties(), {
          width: (resize.init_grids + resize.grids),
          append: (resize.init_append - resize.grids),
        })
    ), locEntity[0])
  }
}

let dragstart_handler = (event, props) => {
  console.log(event.target, props)
  event.stopPropagation();
  event.dataTransfer.setData("text", JSON.stringify({
    action: 'resize',
    model: props.model.properties()
  }));

  console.log(event.screenX)
  resize.init = event.screenX
}

let dragend_handler = function (event, props) {
  event.stopPropagation();
  resize.changed = event.screenX;
  console.log(resize)
  let locEntity = utility.findEntityUuid(props.model.UUID(), props.form)
  let parentEntity = utility.findEntityByPath(props.form, locEntity[0].slice(0, locEntity.length))
  resize.changed = event.screenX;
  let initGrid = {
    width: null,
    append: null,
    prepend: null
  }
  if (props.model._type === 'FormSection') {
    initGrid.width = parentEntity.width()
    initGrid.prepend = parentEntity.prepend()
    initGrid.append = parentEntity.append()
  } else {
      initGrid.width = locEntity[1].width(),
      initGrid.append = locEntity[1].append(),
      initGrid.prepend = locEntity[1].prepend()
  }

  let initDiff = resize.changed - resize.init
  let fsWidth = parseInt((document.getElementById(parentEntity.UUID()).clientWidth / parentEntity.width()), 10)
  console.log(fsWidth)
  let deltaGrid = (parseInt(((Math.abs(initDiff)) / fsWidth), 10) + 1)
  if (Math.abs(initDiff) > 20) {
    var calcOpp = {
      FormEntity: {
        '+': (a, b) => Object.assign({}, { width: initGrid.width + deltaGrid, append: initGrid.append - deltaGrid }),
        '-': (a, b) => Object.assign({}, { width: initGrid.width - deltaGrid, append: initGrid.append + deltaGrid })
      },
      FormSection: {
        '+': (a, b) => Object.assign({}, { width: initGrid.width + deltaGrid, append: initGrid.append - deltaGrid }),
        '-': (a, b) => Object.assign({}, { width: initGrid.width - deltaGrid, append: initGrid.append + deltaGrid })
      }
    }
    const calc = ((newWidth) => {
      let entityToChange = null
      props.model._type === 'FormSection' ?
        entityToChange = parentEntity :
        entityToChange = locEntity[1]
      props.removeformentity(locEntity[0])
      return props.addformentity(utility.resurrectEntity(
        Object.assign({},
          entityToChange.properties(), newWidth)
      ), locEntity[0])
    })
    if (initDiff > 0) {
      calc(calcOpp[props.element]['+'](initGrid, deltaGrid))
    } else {
      calc(calcOpp[props.element]['-'](initGrid, deltaGrid))
    }
  }
}
// onDragStart = {(event) => dragstart_handler(event, props)}
// onDragEnd = {(event) => dragend_handler(event, props)}
let Resizer = (props) =>
  <div
    data-action={`resizer.${props.uuid}.${props.element}`}
    id={props.uuid}
    style={resizeStyle}
    onDrag = {(event) => drag_handler(event, props)}
    draggable='true'
  >↔
  </div>

export default Resizer;