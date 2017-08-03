import React from 'react';
import { utility } from '../../utility';

let handleChange = function (event, props) {
  let result = utility.findNode(props.model, props.form)
  props.removeformentity(result)
  props.addformentity(
  props.model.mutate({ defaultContent: event.target.value }), result)
}

const TextInputComponent = (props) => {
  return (
    <div>
      {props.model.name()}
      <input className="form-control" type={props.model.type()}
        value={props.model.defaultContent()}
      onChange={(e) => handleChange(e, props)} />
    </div>
  );
}

export default TextInputComponent;