import React from 'react';
import { helpers } from '../../../helpers';

const Append = (props) => {
  const drop_handler = (event) => {
    helpers.dropAppend_handler(event, props)
  }

  let dragover_handler = (event) => {
    event.preventDefault();
  }

  let dragLeaveHandler = (event) => {
    event.stopPropagation();
  }

  const appendStyle = {
    // border: '1px dashed black',
    gridColumn: `span ${props.append}`,
    // position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0)'
    // flexDirection: 'row',
    // justifyContent: 'flex-end'
  }

  return (
    <div
      id={`${props.model.UUID()}.append`}
      style={appendStyle}
      // onDrop={drop_handler}
      // onDragOver={dragover_handler}
      // onDragLeave={dragLeaveHandler}
    >
    </div>
  )
}

export default Append;