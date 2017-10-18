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
    let location = utility.findNode(this.props.form, this.props.form)
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

  render() {
    const divStyle = {
      border: '6px dashed #c04df9',
      margin: '20px'
    }

    return (
      <div
        className=''
        style={divStyle}
        onDrop={this.drop_handler}
        onDragOver={this.dragover_handler}
        onDragLeave={this.dragleave_handler}
      >
        {/* <p>Form Component</p> */}

        {this.props.form.sectionTabs() ?
          this.props.form.children().map(child => child.children().map((formSection, i) => {
            return <FormSectionComponent
              key={i} model={formSection} form={this.props.form} removeformentity={this.props.removeformentity} addformentity={this.props.addformentity}
            />
          }))
          : this.props.form.children().map((element, i) => {
            return React.createElement(FormSectionComponent, { key: i, model: element, form: this.props.form, removeformentity: this.props.removeformentity, addformentity: this.props.addformentity })
          })}
      </div>
    );
  }
}

export default FormComponent;