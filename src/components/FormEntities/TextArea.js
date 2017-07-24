import React from 'react';

const TextAreaComponent = (props) => {

  return (

    <div>
       <textarea rows={props.model.numRows()} cols={props.model.numColumns()} type={props.model.type()}>
        
      </textarea> 
    </div>
  );
}

export default TextAreaComponent;