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
    maxWidth: '400px'
  }

  return (
    <div style={taStyle}>
      <textarea className="form-control" placeholder="Write something in text area" name={props.model.name()} rows={props.model.numRows()} cols={props.model.numColumns()} type={props.model.type()}>
      </textarea>

      <button
        type="button"
        className="btn btn-danger"
        onClick={(e) => handleDelete(e, props)}
      >-</button>
    </div>
  );
}

export default TextAreaComponent;