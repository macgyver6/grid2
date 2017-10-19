import React from 'react';
import { utility } from '../../utility';

let TextAreaComponent = (props) => {
  let handleDelete = function (event, props) {
    let address = utility.findNode(props.model, props.form)
    props.removeformentity(address)
  }

  let handleChange = function(event, props) {
    let address = utility.findNode(props.model, props.form)
    props.removeformentity(address)
    props.addformentity(
      props.model.mutate({ width: props.model.width() - 1 }), address)
  }

  let dragend_handler = function(event) {
    event.preventDefault();
  }

  let dragstart_handler = function(event) {
    event.stopPropagation();
    event.dataTransfer.setData("text/plain", JSON.stringify(props.model.properties()));
  }
  const taStyle = {
    border: '6px dashed #c04df9',
    backgroundColor: '#2bd1fc',
    margin: '20px',
    padding: '20px',
    gridColumn: `span ${props.model.width()}`,
    position: 'relative'
  }
  const resizeStyle = {
    width: '20px',
    height: '20px',
    backgroundColor: 'yellow',
    position: 'absolute',
    right: 0,
    bottom: 0,
    cursor: 'w-resize'
  }

  let Resizer = () =>
    <div
      className="resizer"
      style={resizeStyle}
    >
    </div>

  return (
    <div style={taStyle}
      /* ref={elem => TA = elem} */
      draggable="true"
      onDragEnd={dragend_handler}
      onDragStart={dragstart_handler}
    >
      {/* onClick={(e) => handleChange(e, props)} */}
      <p>{props.model.width()}</p>
      <textarea className="form-control" placeholder="Write something in text area" name={props.model.name()} rows={props.model.numRows()} cols={props.model.numColumns()} type={props.model.type()}>
      </textarea>
      <Resizer />
    </div>
  )
}

export default TextAreaComponent;