import React from 'react';
import { utility } from '../../utility';
import Resizer from './subentities/Resizer.js';

const TextInputComponent = (props) => {
  const tiStyle = {
    // border: '6px dashed #c04df9',
    backgroundColor: '#ff3f3f',
    margin: '10px',
    gridColumn: `span ${props.model.width()}`,
    position: 'relative',
    maxHeight: '100px'
  }
  let handleChange = (event, props) => {
    let result = utility.findNode(props.model, props.form)
    props.removeformentity(result)
    props.addformentity(
      props.model.mutate({ defaultContent: event.target.value }), result)
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
  return (
    <div style={tiStyle}
      draggable="true"
      onDragEnd={dragend_handler}
      onDragStart={dragstart_handler}
    >
      <input className="form-control" type={props.model.type()}
        value={props.model.defaultContent()}
        onChange={(e) => handleChange(e, props)} />

        <Resizer />
    </div>
  );
}

export default TextInputComponent;