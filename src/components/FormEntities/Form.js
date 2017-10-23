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
    margin: '20px',
    position: 'relative',
    gridTemplateColumns: `repeat(24, [col] 1fr)`,
    gridTemplateRows: `[row] auto`,
    gridGap: '8px',
    zIndex: '10',
  }

  const innerStyle = {
    padding: '0px',
    margin: '0px',
    fontSize: '12',
    color: 'grey',
    textAlign: 'center',
    backgroundColor: 'lightgrey',
    zIndex: '15'
  }

  const bgrndGrd = {
    "padding": "0px",
    "margin": "0px",
    "fontSize": "12",
    "color": "grey",
    "textAlign": "center",
    "backgroundColor": "lightgrey",
    "zIndex": "15",
    "height": "100vh"
  }

  const bgColumns = []

  for (var i = 0; i < 24; i++) {
    bgColumns.push(<div style={bgrndGrd}>{i+1}</div>)
  }

  return (
    <div
      className='wrapper'
      style={divStyle}
      onDrop={drop_handler}
      onDragOver={dragover_handler}
      onDragLeave={dragleave_handler}
    >
      <div className="grid" >
        {/* if sectionTabs are turned on - map through and render the FormSection */}

        {props.form.sectionTabs() === true ?
          props.form.children()[props.activeTab - 1].children().map((formSection, i) => {
            return <FormSectionComponent
              key={i}
              model={formSection}
              form={props.form}
              removeformentity={props.removeformentity}
              addformentity={props.addformentity}
            />
          })
      // if sectionTabs are turned off - map through and render the element
          : props.form.children().map((element, i) => {
            return React.createElement(FormSectionComponent, { key: i, model: element, form: props.form, removeformentity: props.removeformentity, addformentity: props.addformentity })
          })}
      </div>
      <div className="grid grid_background">
        {bgColumns}
      </div>
    </div>
  );
}

export default FormComponent;