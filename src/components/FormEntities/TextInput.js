import React from 'react';

const TextInputComponent = (props) => {
  return (
    <div>
      {props.formEntity.name()}
    <input className="form-control" type={props.formEntity.type()}
        value={props.formEntity.defaultContent()} />
    </div>
  );
}

export default TextInputComponent;