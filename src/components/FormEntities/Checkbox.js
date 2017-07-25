import React from 'react';

const CheckboxComponent = (props) => {

  return (

    <div>
       <input rows={props.model.numRows()} type={props.model.type()}>
      </input> 
    </div>
  );
}

export default CheckboxComponent;