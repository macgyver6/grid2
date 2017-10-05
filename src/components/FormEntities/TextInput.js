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
  console.log(props)
  return (
    <div>
      <input className="form-control" type={props.model.type()}
        value={props.model.defaultContent()}
      onChange={(e) => handleChange(e, props)} />
      <button
        type="button"
        className="btn btn-danger"
        onClick={(e) => handleDelete(e, props)}
        >-</button>
    </div>
  );
}

export default TextInputComponent;