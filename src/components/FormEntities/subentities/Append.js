import React from 'react';
import Resizer from './Resizer';

const Append = (props) => {
  const appendStyle = {
    // border: '2px dashed black',
    gridColumn: `span ${props.append}`,
    position: 'relative',
    backgroundColor: 'lightgrey'
    // flexDirection: 'row',
    // justifyContent: 'flex-end'
  }

  return (
    <div
      style={appendStyle}>
      <Resizer />
    </div>
  )
}

export default Append;