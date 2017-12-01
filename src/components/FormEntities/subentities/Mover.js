import React from 'react';
import { utility } from '../../../utility';

const moverStyle = {
  width: '20px',
  height: '20px',
  backgroundColor: 'orange',
  position: 'absolute',
  right: 20,
  bottom: 0,
  cursor: 'mover'
}

/*
  1. make the screnX from the start and the up mouse - this will be the mover
  2. is mover for the delete even needed anymore?
*/

let source = null
const resize = {
  init: null,
  changed: null
}

let dragstart_handler = (event, props) => {
  console.log(event, props)
  event.stopPropagation();
  event.dataTransfer.setData("text", JSON.stringify({
    action: 'move',
    model: 'props.model.properties()'
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
  let diffGrid = (parseInt(((Math.abs(initDiff)) / fsWidth), 10) + 1)
  console.log(initGrid)
  if (Math.abs(initDiff) > 20) {
    var calcOpp = {
      CheckBox: {
        '+': (a, b) => Object.assign({}, { width: initGrid.width + diffGrid, append: initGrid.append - diffGrid }),
        '-': (a, b) => Object.assign({}, { width: initGrid.width - diffGrid, append: initGrid.append + diffGrid })
      },
      FormSection: {
        '+': (a, b) => Object.assign({}, { width: initGrid.width + diffGrid }),
        '-': (a, b) => Object.assign({}, { width: initGrid.width - diffGrid })
      }
    }
    const calc = ((newWidth) => {
      console.log(newWidth)
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
    console.log(props.model._type)
    if (initDiff > 0) {
      calc(calcOpp[props.model._type]['+'](initGrid, diffGrid))
    } else {
      calc(calcOpp[props.model._type]['-'](initGrid, diffGrid))
    }
  }
  if (Math.abs(initDiff) > 20) {
    var calcOpp = {
      '+': (a, b) => Object.assign({}, { prepend: initGrid.prepend + diffGrid, append: initGrid.append - diffGrid }),
      '-': (a, b) => Object.assign({}, { prepend: initGrid.prepend - diffGrid, append: initGrid.append + diffGrid }),
    }
    const calcMover = ((newWidth) => {
      let entityToChange = locEntity[1]
      props.removeformentity(locEntity[0])
      return props.addformentity(utility.resurrectEntity(
        Object.assign({},
          entityToChange.properties(), newWidth)
      ), locEntity[0])
    })
    if (initDiff > 0) {
      calcMover(calcOpp['+'](initGrid, diffGrid))
    } else {
      calcMover(calcOpp['-'](initGrid, diffGrid))
    }
  }
  // document.getElementById('FormComponent').removeEventListener('mouseup', mouseUpHandler);
  // document.getElementById('FormComponent').removeEventListener('mousedown', mouseUpHandler);
}

let Mover = (props) =>
  <div
    data-action={ `mover.${props.model.UUID()}.${props.element}` }
    id = { props.model.UUID() }
    style={moverStyle}
    onDragStart={(event)=>dragstart_handler(event, props)}
    onDragEnd={(event) => dragend_handler(event, props)}
    draggable='true'
  >M
  </div>

export default Mover;