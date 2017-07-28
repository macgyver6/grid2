import React from 'react';
import { utility } from '../../utility';
import FormSectionComponent from './FormSection'


const FormComponent = (props) => {
  const divStyle = {
    border: '2px solid #a1a1a1'
  }
  return (

    <div type='{props.model.type()}' style={divStyle}>
      <h1>Form Component</h1>
         {props.form.children().map((element, i) =>
        React.createElement(FormSectionComponent, { key: i, formSection: element }))}
    </div>
  );
}

export default FormComponent;