import React from 'react';
import { utility } from '../../utility';

const FormSectionComponent = (props) => {
  console.log(props.model)
  const divStyle = {
    border: '2px solid green'
  }

  return (
    <div className="form-group" style={divStyle}>
      <h2>FormSection</h2>
      {props.model.children().map((element, i) => {
        console.log(element)


        
        return React.createElement(utility.lookupComponent(element), { key: i, model: element })})}
    </div>
  );
}

export default FormSectionComponent;