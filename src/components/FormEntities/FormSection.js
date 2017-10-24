import React from 'react';
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';

let FormSectionComponent = (props) => {
  const resize = {
    init: null,
    changed: null
  }
  let type = null

  let mouseDownHandler = (event) => {
    type = (event.target.className).split('.')
    if (type[0] === 'resizer') {
      event.preventDefault();
      event.stopPropagation();
      resize.init = event.screenX;
      document.getElementById(props.model.UUID()).addEventListener('mouseup', mouseUpHandler);
    }
  }

  function mouseUpHandler(event) {
    let locEntity = utility.findNode2(type[1], props.form)
    resize.changed = event.screenX;
    let fn = {
      width: props.model.children()[locEntity[locEntity.length - 1]].width(),
      append: props.model.children()[locEntity[locEntity.length - 1]].append()
    }
    let initGrid = fn[type[2]];
    let resizeX = event.screenX
    let initDiff = resizeX - resize.init
    let fsWidth = parseInt((document.getElementById(props.model.UUID()).clientWidth / 24), 10)
    let diffGrid = (parseInt(((Math.abs(initDiff)) / fsWidth), 10) + 1)
    if ((Math.abs(initDiff)) > 20) {
      var calcOpp = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b
      }
      const calc = ((newWidth) => {
        let entityToChange = props.model.children()[0]
        props.removeformentity(locEntity)
        return props.addformentity(
          props.model.children()[locEntity[locEntity.length - 1]].mutate({ [type[2]]: newWidth }), locEntity
        )
      })
      if (initDiff > 0) {
        calc(calcOpp['+'](initGrid, diffGrid))
      } else {
        calc(calcOpp['-'](initGrid, diffGrid))
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
    let data = event.dataTransfer.getData("text");
    let entityToAdd = utility.resurrectEntity(defaultPropsFE[data])
    let location = utility.findNode(props.model, props.form)
    // @hack - only adds to position 0 at this point
    location.push(0)
    props.addformentity(entityToAdd, location)
  }

  // let dragover_handler = (event) => {
  //   event.preventDefault();
  // }

  // let dragleave_handler = (event) => {
  //   event.preventDefault();
  // }

  const divStyle = {
    "display": "grid",
    "gridTemplateColumns": "repeat(24, [col] 1fr)",
    "backgroundColor": "rgba(243, 234, 95, 0.7)",
    // "marginTop": "10px",
    "minHeight": "120px",
    "minWidth": "100px",
    "gridColumn": "col 1 / span 24",
    "gridGap": "8px",
    "zIndex": "30"
  }

  return (
    <div className="form-group FS"
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
    </div>
  );
}


export default FormSectionComponent;