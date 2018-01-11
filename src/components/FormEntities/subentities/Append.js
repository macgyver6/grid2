import React from 'react';
import Resizer from './Resizer';
import { utility } from '../../../utility';
import { aux } from '../../../constants/aux';

const Append = (props) => {
  const drop_handler = (event) => {
    aux.dropAppend_handler(event, props)
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
      onDrop={drop_handler}
      onDragOver={dragover_handler}
      onDragLeave={dragLeaveHandler}
      onDragLeave={dragLeaveHandler}
    >
    </div>
  )
}

export default Append;