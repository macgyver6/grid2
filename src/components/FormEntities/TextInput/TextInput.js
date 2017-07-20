import React from 'react';

const TextInput = (props) => {

  return (
  <div>
    {props.element.name}:  <input type={props.element.type} value={props.element.defaultContent} />
</div>
);
}

export default TextInput;