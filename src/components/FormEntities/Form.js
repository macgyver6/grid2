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
    display: 'grid',
    gridTemplateColumns: `repeat(24, [col] 1fr)`,
    gridTemplateRows: `[row] auto`,
    gridGap: '8px',
    // opacity: '0%',
    zIndex: '10',
    minHeight: '85vh'
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

  return (
    <div
      className='wrapper'
      style={divStyle}
      onDrop={drop_handler}
      onDragOver={dragover_handler}
      onDragLeave={dragleave_handler}
    >

      <div className="one" style={innerStyle}>1</div>
      <div className="two" style={innerStyle}>2</div>
      <div className="three" style={innerStyle}>3</div>
      <div className="four" style={innerStyle}>4</div>
      <div className="five" style={innerStyle}>5</div>
      <div className="six" style={innerStyle}>6</div>
      <div className="seven" style={innerStyle}>7</div>
      <div className="eight" style={innerStyle}>8</div>
      <div className="nine" style={innerStyle}>9</div>
      <div className="ten" style={innerStyle}>10</div>
      <div className="eleven" style={innerStyle}>11</div>
      <div className="twelve" style={innerStyle}>12</div>
      <div className="thirteen" style={innerStyle}>13</div>
      <div className="fourteen" style={innerStyle}>14</div>
      <div className="fifteen" style={innerStyle}>15</div>
      <div className="sixteen" style={innerStyle}>16</div>
      <div className="seventeen" style={innerStyle}>17</div>
      <div className="eighteen" style={innerStyle}>18</div>
      <div className="nineteen" style={innerStyle}>19</div>
      <div className="twenty" style={innerStyle}>20</div>
      <div className="twentyone" style={innerStyle}>21</div>
      <div className="twentytwo" style={innerStyle}>22</div>
      <div className="twentythree" style={innerStyle}>23</div>
      <div className="twentyfour" style={innerStyle}>24</div>


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