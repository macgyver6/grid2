import React, { Component } from 'react';
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';

let FormSectionComponent = (props) => {
  const resize = {
    init: null,
    changed: null
  }
  let mouseDownHandler = (event) => {
    if (event.target.className === 'resizer') {
      console.log('className === resizer')
      event.preventDefault();
      event.stopPropagation();
      resize.init = event.screenX;
      document.getElementById(props.model.UUID()).addEventListener('mouseup', mouseUpHandler);
    }
  }

  function mouseUpHandler(event) {
    resize.changed = event.screenX;
    let initGrid = props.model.children()[0].width()
    let resizeX = event.screenX
    let address = utility.findNode(props.model.children()[0], props.form)
    let initDiff = resizeX - resize.init
    let fsWidth = parseInt((document.getElementById(props.model.UUID()).clientWidth / 24), 10)
    let diffGrid = (parseInt(((Math.abs(initDiff)) / fsWidth), 10))
    if ((Math.abs(initDiff)) > 20) {
      var calcOpp = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b
      }
      const calc = ((newWidth) => {
        let entityToChange = props.model.children()[0]
        props.removeformentity(address)
        return props.addformentity(
          entityToChange.mutate({ width: (newWidth) }), address
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

  let handleDelete = (event, props) => {
    let result = utility.findNode(props.model, props.form)
    props.removeformentity(result)
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
    console.log(event.target)
    let data = event.dataTransfer.getData("text");
    let entityToAdd = utility.resurrectEntity(defaultPropsFE[data])
    let location = utility.findNode(props.model, props.form)
    // @hack - only adds to position 0 at this point
    location.push(0)
    props.addformentity(entityToAdd, location)
  }

  let dragover_handler = (event) => {
    event.preventDefault();
  }

  let dragleave_handler = (event) => {
    event.preventDefault();
  }

  const divStyle = {
    // border: '6px dashed #c04df9',
    backgroundColor: '#f3ea5f',
    margin: '20px',
    // minHeight: '100px',
    // minWidth: '100px',
    // display: 'grid',
    // gridTemplateColumns: `repeat(${props.model.width()}, 1fr)`,
    // gridGap: '8px',
    // gridColumn: `span 12`,
    gridColumn: `col 1 / span 13`,
    gridRow: `row 1`,
    // gridColumn: `span ${props.model.width()}`,
    minHeight: '400px',
    zIndex: '20'
  }

  return (
    <div className="form-group"
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