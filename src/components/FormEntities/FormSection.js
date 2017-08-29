import React, { Component } from 'react';
import { utility } from '../../utility';

class FormSectionComponent extends Component {
  constructor(props) {
    super()
  }

  handleDelete = function (event, props) {
    let result = utility.findNode(props.model, props.form)
    props.removeformentity(result)
  }

  render() {
    const divStyle = {
      border: '2px solid green'
    }
    return (
      <div className="form-group" style={divStyle}>
        <h2>FormSection</h2>
        {this.props.model.children().map((element, i) => {

          return React.createElement(utility.lookupComponent(element), { key: i, model: element, form: this.props.form, removeformentity: this.props.removeformentity, addformentity: this.props.addformentity })
        })}
        <button
          type="button"
          className="btn btn-danger"
          onClick={(e) => this.handleDelete(e, this.props)}
        >-</button>
      </div>
    );
  }
}

export default FormSectionComponent;