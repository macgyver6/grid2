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
    // border: '6px dashed #c04df9',
    margin: '20px',
    position: 'relative',
    gridTemplateColumns: `repeat(24, [col] 1fr)`,
    gridTemplateRows: `[row] auto`,
    gridGap: '8px',
    // opacity: '0%',
    zIndex: '10',
    // minHeight: '85vh'
    // backgroundColor: 'lightgreen'
  }

  const innerStyle = {
    // gridColumn: `span 1`,
    padding: '0px',
    margin: '0px',
    fontSize: '12',
    color: 'grey',
    textAlign: 'center',
    // border: '2px solid lightgrey',
    backgroundColor: 'lightgrey',
    // gridColumn: 'span 1',
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
    "height": "100%"
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
      <div className="grid grid_background">
        <div style={bgrndGrd}>1</div>
        <div style={bgrndGrd}>2</div>
        <div style={bgrndGrd}>3</div>
        <div style={bgrndGrd}>4</div>
        <div style={bgrndGrd}>5</div>
        <div style={bgrndGrd}>6</div>
        <div style={bgrndGrd}>7</div>
        <div style={bgrndGrd}>8</div>
        <div style={bgrndGrd}>9</div>
        <div style={bgrndGrd}>10</div>
        <div style={bgrndGrd}>11</div>
        <div style={bgrndGrd}>12</div>
        <div style={bgrndGrd}>13</div>
        <div style={bgrndGrd}>14</div>
        <div style={bgrndGrd}>15</div>
        <div style={bgrndGrd}>16</div>
        <div style={bgrndGrd}>17</div>
        <div style={bgrndGrd}>18</div>
        <div style={bgrndGrd}>19</div>
        <div style={bgrndGrd}>20</div>
        <div style={bgrndGrd}>21</div>
        <div style={bgrndGrd}>22</div>
        <div style={bgrndGrd}>23</div>
        <div style={bgrndGrd}>24</div>
      </div>
    </div>
  );
}

export default FormComponent;