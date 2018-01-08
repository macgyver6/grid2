import React from 'react';
import { utility } from '../../../utility';
import { defaultPropsFE } from '../../../constants/defaultPropsFE';

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

const XmutateX = (locEntity, props) => {
  props.removeformentity(locEntity[0])
  props.addformentity(utility.resurrectEntity(
    Object.assign({},
      locEntity[1].properties(), {
        width: (resize.init_grids - resize.grids),
        append: (resize.init_append + resize.grids),
      })
  ), locEntity[0])
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
  console.log(event.target, props)
  event.stopPropagation();
  // event.preventDefault()
  // event.dataTransfer.setData("text", JSON.stringify({
  //   action: 'resize',
  //   model: props.model.properties()
  // }));

  // console.log(event.pageX)
  // resize.init = event.pageX
}

let dragend_handler = function (event, props) {
  const element = document.getElementById(props.model.UUID())
  setTimeout(function () { element.style.backgroundColor = defaultPropsFE[props.model.type()].render.backgroundColor }, 1200);
  // console.log('valid')
  // let locEntity = utility.findEntityUuid(props.model.UUID(), props.form)
  // let parentEntity = utility.findEntityByPath(props.form, locEntity[0].slice(0, locEntity.length))
  // const minWidth = defaultPropsFE[props.model.type()].render.minWidth
  // const maxWidth = parentEntity.width();
  // console.log(!can_resize(minWidth, maxWidth))
  // if (!can_resize(minWidth, maxWidth)) {
  //   // mutate(locEntity, props)
  //   console.log('not valid')
  }
  // document.getElementById(props.model.UUID()).style.backgroundColor = defaultPropsFE[props.model.type()].render.backgroundColor

  // event.stopPropagation();
  // resize.changed = event.pageX;
  // console.log(resize)
  // let locEntity = utility.findEntityUuid(props.model.UUID(), props.form)
  // let parentEntity = utility.findEntityByPath(props.form, locEntity[0].slice(0, locEntity.length))
  // resize.changed = event.pageX;
  // let initGrid = {
  //   width: null,
  //   append: null,
  //   prepend: null
  // }
  // if (props.model._type === 'FormSection') {
  //   initGrid.width = parentEntity.width()
  //   initGrid.prepend = parentEntity.prepend()
  //   initGrid.append = parentEntity.append()
  // } else {
  //     initGrid.width = locEntity[1].width(),
  //     initGrid.append = locEntity[1].append(),
  //     initGrid.prepend = locEntity[1].prepend()
  // }

  // let initDiff = resize.changed - resize.init
  // let fsWidth = parseInt((document.getElementById(parentEntity.UUID()).clientWidth / parentEntity.width()), 10)
  // console.log(fsWidth)
  // let deltaGrid = (parseInt(((Math.abs(initDiff)) / fsWidth), 10) + 1)
  // if (Math.abs(initDiff) > 20) {
  //   var calcOpp = {
  //     FormEntity: {
  //       '+': (a, b) => Object.assign({}, { width: initGrid.width + deltaGrid, append: initGrid.append - deltaGrid }),
  //       '-': (a, b) => Object.assign({}, { width: initGrid.width - deltaGrid, append: initGrid.append + deltaGrid })
  //     },
  //     FormSection: {
  //       '+': (a, b) => Object.assign({}, { width: initGrid.width + deltaGrid, append: initGrid.append - deltaGrid }),
  //       '-': (a, b) => Object.assign({}, { width: initGrid.width - deltaGrid, append: initGrid.append + deltaGrid })
  //     }
  //   }
  //   const calc = ((newWidth) => {
  //     let entityToChange = null
  //     props.model._type === 'FormSection' ?
  //       entityToChange = parentEntity :
  //       entityToChange = locEntity[1]
  //     props.removeformentity(locEntity[0])
  //     return props.addformentity(utility.resurrectEntity(
  //       Object.assign({},
  //         entityToChange.properties(), newWidth)
  //     ), locEntity[0])
  //   })
  //   if (initDiff > 0) {
  //     calc(calcOpp[props.element]['+'](initGrid, deltaGrid))
  //   } else {
  //     calc(calcOpp[props.element]['-'](initGrid, deltaGrid))
  //   }
  // }

//
//
let Resizer = (props) =>
  <div
    data-action={`resizer.${props.uuid}.${props.element}`}
    id={'resizer'}
    style={resizeStyle}
    onDrag = {(event) => drag_handler(event, props)}
    onDragStart={(event) => dragstart_handler(event, props)}
    onDragEnd={(event) => dragend_handler(event, props)}
    draggable='true'
  >↔
  </div>

export default Resizer;