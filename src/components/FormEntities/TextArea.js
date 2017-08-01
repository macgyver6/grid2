import React from 'react';

const TextAreaComponent = (props) => {

  return (
    <div>
       <textarea className="form-control" placeholder="Write something in text area" name={props.model.name()} rows={props.model.numRows()} cols={props.model.numColumns()} type={props.model.type()}>
      </textarea> 
    </div>
  );
}

export default TextAreaComponent;