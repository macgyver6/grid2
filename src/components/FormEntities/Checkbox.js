import React from 'react';
import { utility } from '../../utility';

let handleDelete = function (event, props) {
  let result = utility.findNode(props.model, props.form)
  props.removeformentity(result)
}

const CheckboxComponent = (props) => {
  const cbStyle = {
    border: '6px dashed #c04df9',
    backgroundColor: '#ff48c4',
    margin: '20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gridColumn: `span ${props.model.width()}`
  }

  const appendStyle = {
    border: '2px dashed black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }

  const Append = () => {
    return (
      <div
      style={appendStyle}>
        <h1>Append</h1>

      </div>
    )
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
      <p>{props.model.width()}</p>
      <input type={props.model.type()} onChange={props.handleInputChange} checked={props.model.defaultState()}>
      </input>
      {/* <p>{props.model.UUID()}</p> */}
      <Append />
      {/* <button
        type="button"
        className="btn btn-danger"
        onClick={(e) => handleDelete(e, props)}
      >-</button> */}
    </div>
  );
}

export default CheckboxComponent;