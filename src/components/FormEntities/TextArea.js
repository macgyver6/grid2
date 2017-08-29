import React from 'react';
import { utility } from '../../utility';

let handleDelete = function (event, props) {
  let result = utility.findNode(props.model, props.form)
  props.removeformentity(result)
}

const TextAreaComponent = (props) => {

  return (
    <div>
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