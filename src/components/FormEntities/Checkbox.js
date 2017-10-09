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
    maxWidth: '200px'
  }

  return (
    <div style={cbStyle}>
      <input type={props.model.type()} onChange={props.handleInputChange} checked={props.model.defaultState()}>
      </input>

      <button
        type="button"
        className="btn btn-danger"
        onClick={(e) => handleDelete(e, props)}
      >-</button>
    </div>
  );
}

export default CheckboxComponent;