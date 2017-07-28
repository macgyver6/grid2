import React from 'react';

const TextAreaComponent = (props) => {

  return (
    <div>
       <textarea className="form-control" placeholder="Write something in text area" name={props.formEntity.name()} rows={props.formEntity.numRows()} cols={props.formEntity.numColumns()} type={props.formEntity.type()}>
      </textarea> 
    </div>
  );
}

export default TextAreaComponent;