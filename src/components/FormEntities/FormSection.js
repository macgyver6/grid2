import React, { Component } from 'react';
import { utility } from '../../utility';

class FormSectionComponent extends Component {
  constructor(props) {
    super()
  }


  render() {
    const divStyle = {
      border: '2px solid green'
    }
    return (
      <div className="form-group" style={divStyle}>
        <h2>FormSection</h2>
        {this.props.model.children().map((element, i) => {
          console.log(element)

          return React.createElement(utility.lookupComponent(element), { key: i, model: element, removeformentity: this.props.removeformentity, addformentity: this.props.addformentity })
        })}
      </div>
    );
  }
}

export default FormSectionComponent;