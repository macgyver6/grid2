import React, { Component } from 'react';
import FormSectionComponent from './FormSection'
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';

class FormComponent extends Component {
  constructor(props) {
    super();
    this.drop_handler = this.drop_handler.bind(this);
    this.dragleave_handler = this.dragleave_handler.bind(this);
    this.dragover_handler = this.dragover_handler.bind(this);
  }

  drop_handler(event) {
    event.preventDefault();
    event.stopPropagation();
    let data = event.dataTransfer.getData("text");
    let entityToAdd = utility.resurrectEntity(defaultPropsFE[data])
    let target = this.props.form
    let node = this.props.form;
    this.props.addformentity(entityToAdd, [0, 0])
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
      border: '2px solid #a1a1a1'
    }

    return (
      <div style={divStyle}
        onDrop={this.drop_handler}
        onDragOver={this.dragover_handler}
        onDragLeave={this.dragleave_handler}
      >
        <h1>Form Component</h1>
        {this.props.form.children().map((element, i) => {
          console.log(element)
          return React.createElement(FormSectionComponent, { key: i, model: element, form: this.props.form, removeformentity: this.props.removeformentity, addformentity: this.props.addformentity })

          {/* return <FormSectionComponent  key= {i}
           model= {element} form= {this.props.form} removeformentity= {this.props.removeformentity} addformentity= {this.props.addformentity} /> */}


        })}
      </div>
    );
  }
}

export default FormComponent;