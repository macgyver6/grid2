import React, { Component } from 'react';
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';


class FormSectionComponent extends Component {
  constructor(props) {
    super()
    this.drop_handler = this.drop_handler.bind(this);
    this.dragleave_handler = this.dragleave_handler.bind(this);
    this.dragover_handler = this.dragover_handler.bind(this);
    this.dragend_handler = this.dragend_handler.bind(this);
    this.dragstart_handler = this.dragstart_handler.bind(this);
  }

  handleDelete = function (event, props) {
    let result = utility.findNode(props.model, props.form)
    props.removeformentity(result)
  }

  dragend_handler = function (event) {
  event.preventDefault();
}

dragstart_handler = function (event) {
  event.stopPropagation();
  console.log(this.props.model._uuid)
  event.dataTransfer.setData("text/plain", JSON.stringify(this.props.model.properties()));
}

  drop_handler(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('drophandler 2')
    let data = event.dataTransfer.getData("text");
    let entityToAdd = utility.resurrectEntity(defaultPropsFE[data])
    let location = utility.findNode(this.props.model, this.props.form)
    // @hack - only adds to position 0 at this point
    location.push(0)
    this.props.addformentity(entityToAdd, location)
  }

  dragover_handler(event) {
    event.preventDefault();
  }

  dragleave_handler(event) {
    event.preventDefault();
  }

  dragend_handler(event) {
  event.preventDefault();
}

  render() {
    const divStyle = {
      border: '6px dashed #c04df9',
      backgroundColor: '#f3ea5f',
      margin: '20px',
      minHeight: '100px'
    }
    return (
      <div className="grid form-group"
        style={divStyle}
        onDrop={this.drop_handler}
        draggable="true"
        onDragEnd={this.dragend_handler}
        onDragStart={this.dragstart_handler}
        >
        <p>FormSection: {this.props.model._uuid}</p>
        {/* <p>FormSection: {this.props.model._uuid}</p> */}
        {this.props.model.children().map((element, i) => {
          return React.createElement(utility.lookupComponent(element), { key: i, model: element, form: this.props.form, removeformentity: this.props.removeformentity, addformentity: this.props.addformentity })
        })}
        {/* <button
          type="button"
          className="btn btn-danger"
          onClick={(e) => this.handleDelete(e, this.props)}
        >-</button> */}
      </div>
    );
  }
}

export default FormSectionComponent;