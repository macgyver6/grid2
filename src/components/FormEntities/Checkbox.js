import React from 'react';
import { utility } from '../../utility';
import Resizer from './subentities/Resizer';
import Append from './subentities/Append';

let handleDelete = function (event, props) {
  let result = utility.findNode(props.model, props.form)
  props.removeformentity(result)
}

const CheckboxComponent = (props) => {
  const cbStyle = {
    // border: '6px dashed #c04df9',
    backgroundColor: '#ff48c4',
    margin: '10px',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gridColumn: `span ${props.model.width()}`,
    maxHeight: '100px',
  }

  let dragend_handler = function (event) {
    event.preventDefault();
  }

  let dragstart_handler = function (event) {
    event.stopPropagation();
    event.dataTransfer.setData("text/plain", JSON.stringify(props.model.properties()));
  }

  return (
    <div style={cbStyle}
      draggable="true"
      onDragEnd={dragend_handler}
      onDragStart={dragstart_handler}
    >
      <input type={props.model.type()} onChange={props.handleInputChange} checked={props.model.defaultState()}>
      </input>
      <Append />
      <Resizer />
      {/* <button
        type="button"
        className="btn btn-danger"
        onClick={(e) => handleDelete(e, props)}
      >-</button> */}
    </div>
  );
}

export default CheckboxComponent;