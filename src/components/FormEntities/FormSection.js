import React from 'react';
import { utility } from '../../utility';

const FormSectionComponent = (props) => {
  const divStyle = {
    border: '2px solid green'
  }

  return (
    <div className="form-group" style={divStyle}>
      <h2>FormSection</h2>
            {props.formSection.children().map((element, i) =>
        React.createElement(utility.lookupComponent(element), { key: i, formEntity: element }))}      
    </div>
  );
}

export default FormSectionComponent;