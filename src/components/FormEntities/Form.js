import React, { Component } from 'react';
import FormSectionComponent from './FormSection'
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';

const FormComponent = (props) => {

  const drop_handler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let data = event.dataTransfer.getData("text");
    let entityToAdd = utility.resurrectEntity(defaultPropsFE[data])
    let location = utility.findNode(props.form, props.form)
    // @hack - only adds to position 0 at this point
    location.push(0)
    props.addformentity(entityToAdd, location)
  }

  const dragover_handler = (event) => {
    event.preventDefault();
  }

  const dragleave_handler = (event) => {
    event.preventDefault();
  }

  const divStyle = {
    border: '6px dashed #c04df9',
    margin: '20px',
    display: 'grid',
    gridTemplateColumns: `24, 1fr)`,
    gridGap: '8px'
  }

  return (
    <div
      className=''
      style={divStyle}
      onDrop={drop_handler}
      onDragOver={dragover_handler}
      onDragLeave={dragleave_handler}
    >
      {props.form.sectionTabs() ?
        props.form.children().map(child => child.children().map((formSection, i) => {
          return <FormSectionComponent
            key={i} model={formSection} form={props.form} removeformentity={props.removeformentity} addformentity={props.addformentity}
          />
        }))
        : props.form.children().map((element, i) => {
          return React.createElement(FormSectionComponent, { key: i, model: element, form: props.form, removeformentity: props.removeformentity, addformentity: props.addformentity })
        })}
    </div>
  );
}

export default FormComponent;