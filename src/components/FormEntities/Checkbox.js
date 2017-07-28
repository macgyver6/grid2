import React from 'react';

const CheckboxComponent = (props) => {

  return (

    <div>
       <input rows={props.formEntity.numRows()} type={props.formEntity.type()}>
      </input> 
    </div>
  );
}

export default CheckboxComponent;