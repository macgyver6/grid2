import React from 'react';

const CheckboxComponent = (props) => {

  return (

    <div>
       <input type={props.model.type()}>
      </input> 
    </div>
  );
}

export default CheckboxComponent;