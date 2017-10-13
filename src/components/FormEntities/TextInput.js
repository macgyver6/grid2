import React from 'react';
import { utility } from '../../utility';

let handleChange = function (event, props) {
  let result = utility.findNode(props.model, props.form)
  props.removeformentity(result)
  props.addformentity(
    props.model.mutate({ defaultContent: event.target.value }), result)
}

let handleDelete = function (event, props) {
  let result = utility.findNode(props.model, props.form)
  props.removeformentity(result)
}

const TextInputComponent = (props) => {
  const tiStyle = {
    border: '6px dashed #c04df9',
    backgroundColor: '#ff3f3f',
    margin: '20px',
    maxWidth: '400px'
  }
  let dragend_handler = function (event) {
    event.preventDefault();
  }

  let dragstart_handler = function (event) {
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
      {/* <button
        type="button"
        className="btn btn-danger"
        onClick={(e) => handleDelete(e, props)}
      >-</button> */}
    </div>
  );
}

export default TextInputComponent;