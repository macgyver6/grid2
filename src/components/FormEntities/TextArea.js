import React from 'react';
import { utility } from '../../utility';

// let handleChange = function (event, props) {
//   let result = utility.findNode(props.model, props.form)
//   props.removeformentity(result)
//   props.addformentity(
//     props.model.mutate({ defaultContent: event.target.value }), result)
// }

let handleDelete = function (event, props) {
  let result = utility.findNode(props.model, props.form)
  props.removeformentity(result)
}

const TextAreaComponent = (props) => {
  const taStyle = {
    border: '6px dashed #c04df9',
    backgroundColor: '#2bd1fc',
    margin: '20px',
    padding: '20px',
    gridColumn: `1 / ${props.model.inputWidth()}`
  }

  let dragend_handler = function (event) {
    event.preventDefault();
  }

  let dragstart_handler = function (event) {
    event.stopPropagation();
    event.dataTransfer.setData("text/plain", JSON.stringify(props.model.properties()));
  }

  return (
    <div style={taStyle}
      draggable="true"
      onDragEnd={dragend_handler}
      onDragStart={dragstart_handler}
    >
      <textarea className="form-control" placeholder="Write something in text area" name={props.model.name()} rows={props.model.numRows()} cols={props.model.numColumns()} type={props.model.type()}>
      </textarea>

      {/* <button
        type="button"
        className="btn btn-danger"
        onClick={(e) => handleDelete(e, props)}
      >-</button> */}
    </div>
  );
}

export default TextAreaComponent;