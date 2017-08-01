import React from 'react';
import FormSectionComponent from './FormSection'

const FormComponent = (props) => {
  const divStyle = {
    border: '2px solid #a1a1a1'
  }

  return (
    <div style={divStyle}>
      <h1>Form Component</h1>
         {props.form.children().map((element, i) =>
        React.createElement(FormSectionComponent, { key: i, model: element }))}
    </div>
  );
}

export default FormComponent;