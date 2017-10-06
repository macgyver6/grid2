import React, { Component } from 'react';
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';


class FormSectionComponent extends Component {
  constructor(props) {
    super()
    this.drop_handler = this.drop_handler.bind(this);
    this.dragleave_handler = this.dragleave_handler.bind(this);
    this.dragover_handler = this.dragover_handler.bind(this);
  }

  handleDelete = function (event, props) {
    let result = utility.findNode(props.model, props.form)
    console.log(result)
    props.removeformentity(result)
  }

  drop_handler(event) {
    event.preventDefault();
    event.stopPropagation();
    let data = event.dataTransfer.getData("text");
    let entityToAdd = utility.resurrectEntity(defaultPropsFE[data])
    console.log(entityToAdd)
    let target = this.props.model;
    let node = this.props.form;
    let final = []
    let location = utility.findNode(target, node)
    // need to work on the final position in the array to insert at
    this.props.addformentity(entityToAdd, final)
    console.log(location)
  }

  dragover_handler(event) {
    event.preventDefault();
    console.log('dragover_handler hit')
  }

  dragleave_handler(event) {
    event.preventDefault();
    console.log('dragleave_handler hit')
  }

  render() {
    const divStyle = {
      border: '2px solid green'
    }
    return (
      <div className="form-group"
        style={divStyle}
        onDrop={this.drop_handler}>
        <p>FormSection: {this.props.model._uuid}</p>
        {console.log(this.props.model.children())}
        {this.props.model.children().map((element, i) => {
          console.log(element)
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