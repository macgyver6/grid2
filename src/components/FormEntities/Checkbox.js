import React from 'react';

const CheckboxComponent = (props) => {

  return (

    <div>
      <input type={props.model.type()} onChange={props.handleInputChange} checked={props.model.defaultState()}>
      </input> 
    </div>
  );
}

export default CheckboxComponent;