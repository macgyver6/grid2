import React from 'react';
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';
import Resizer from './subentities/Resizer.js';

let FormSectionComponent = (props) => {
  const resize = {
    init: null,
    changed: null
  }
  let type = null

  let mouseDownHandler = (event) => {
    type = (event.target.className).split('.');
    if (type[0] === 'resizer' || type[0] === 'mover') {
      event.preventDefault();
      event.stopPropagation();
      resize.init = event.screenX;
      document.getElementById(props.model.UUID()).addEventListener('mouseup', mouseUpHandler);
    }
  }
  function mouseUpHandler(event) {
    let locEntity = utility.findNode2(type[1], props.form)
    resize.changed = event.screenX;
    let initGrid = {
      width:null,
      append: null,
      prepend: null
    }
    if (type[2] === 'FormSection') {
      initGrid.width = props.model.width()
      initGrid.prepend = props.model.prepend()
      initGrid.append = props.model.append()
    } else {
      initGrid.width = props.model.children()[locEntity[locEntity.length - 1]].width(),
      initGrid.append = props.model.children()[locEntity[locEntity.length - 1]].append(),
      initGrid.prepend = props.model.children()[locEntity[locEntity.length - 1]].prepend()
    }

    let initDiff = resize.changed - resize.init
    let fsWidth = parseInt((document.getElementById(props.model.UUID()).clientWidth / props.model.width()), 10)
    let diffGrid = (parseInt(((Math.abs(initDiff)) / fsWidth), 10) + 1)
    if (type[0] === 'resizer' & (Math.abs(initDiff)) > 20) {
      var calcOpp = {
        FormEntity: {
          '+': (a, b) => Object.assign({}, { width: initGrid.width + diffGrid, append: initGrid.append - diffGrid }),
          '-': (a, b) => Object.assign({}, { width: initGrid.width - diffGrid, append: initGrid.append + diffGrid })
        },
       FormSection: {
         '+': (a, b) => Object.assign({}, { width: initGrid.width + diffGrid}),
         '-': (a, b) => Object.assign({}, { width: initGrid.width - diffGrid})
       }
      }
      const calc = ((newWidth) => {
        let entityToChange = null
        type[2] === 'FormSection' ?
        entityToChange = props.model :
        entityToChange = props.model.children()[locEntity[locEntity.length - 1]]
        props.removeformentity(locEntity)
        return props.addformentity(utility.resurrectEntity(
          Object.assign({},
            entityToChange.properties(), newWidth)
        ), locEntity)
      })
      if (initDiff > 0) {
        calc(calcOpp[type[2]]['+'](initGrid, diffGrid))
      } else {
        calc(calcOpp[type[2]]['-'](initGrid, diffGrid))
      }
    }
    if (type[0] === 'mover' & (Math.abs(initDiff)) > 20) {
      var calcOpp = {
        '+': (a, b) => Object.assign({}, { prepend: initGrid.prepend + diffGrid, append: initGrid.append - diffGrid }),
        '-': (a, b) => Object.assign({}, { prepend: initGrid.prepend - diffGrid, append: initGrid.append + diffGrid }),
      }
      const calcMover = ((newWidth) => {
        let entityToChange = props.model.children()[locEntity[locEntity.length - 1]]

        props.removeformentity(locEntity)
        return props.addformentity(utility.resurrectEntity(
          Object.assign({},
            entityToChange.properties(), newWidth)
        ), locEntity)
      })
      if (initDiff > 0) {
        calcMover(calcOpp['+'](initGrid, diffGrid))
      } else {
        calcMover(calcOpp['-'](initGrid, diffGrid))
      }
    }
    document.getElementById(props.model.UUID()).removeEventListener('mouseup', mouseUpHandler);
  }

  let dragend_handler = (event) => {
    event.preventDefault();
  }

  let dragstart_handler = (event) => {
    event.stopPropagation();
    event.dataTransfer.setData("text/plain", JSON.stringify(props.model.properties()));
  }

  let drop_handler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let location = utility.findNode(props.model, props.form)
    let data = JSON.parse(event.dataTransfer.getData("text"));
    let entityToAdd = utility.resurrectEntity(
      Object.assign({},
        data, {
          append: (props.model.width() - (data.prepend + data.width))
        })
    )
    // @hack - only adds to position 0 at this point
    location.push(0)
    props.addformentity(entityToAdd, location)
  }

  const divStyle = {
    "display": "grid",
    position: 'relative',
    "gridTemplateColumns": `repeat(${props.model.width()}, [col] 1fr)`,
    "backgroundColor": "rgba(243, 234, 95, 0.7)",
    // "marginTop": "10px",
    "minHeight": "120px",
    "minWidth": "100px",
    "gridColumn": `col 1 / span ${props.model.width()}`,
    "gridGap": "8px",
    "zIndex": "30"
  }

  return (
    <div
      style={divStyle}
      onDrop={drop_handler}
      draggable="true"
      onDragEnd={dragend_handler}
      onDragStart={dragstart_handler}
      onMouseDown={(e) => mouseDownHandler(e, props)}
      id={props.model.UUID()}
    >
      {props.model.children().map((element, i) => {
        return React.createElement(utility.lookupComponent(element), { key: i, model: element, form: props.form, removeformentity: props.removeformentity, addformentity: props.addformentity })
      })}
      <Resizer
        uuid={props.model.UUID()}
        element='FormSection'
      />
    </div>
  );
}


export default FormSectionComponent;