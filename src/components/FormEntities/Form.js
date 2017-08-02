import React, {Component} from 'react';
import FormSectionComponent from './FormSection'

class FormComponent extends Component {
  constructor(props) {
    super();
  }

  render() {
    const divStyle = {
      border: '2px solid #a1a1a1'
    }

    return (
      <div style={divStyle}>
        <h1>Form Component</h1>
        {this.props.form.children().map((element, i) => 
          React.createElement(FormSectionComponent, { key: i, model: element, form: this.props.form, removeformentity: this.props.removeformentity, addformentity: this.props.addformentity }))}
      </div>
    );
  }
}

export default FormComponent;