import React from 'react';

const TextInputComponent = (props) => {

  return (
  <div>
    {props.model.name()}:  <input type={props.model.type()} value={props.model.defaultContent()} />
</div>
);
}

export default TextInputComponent;