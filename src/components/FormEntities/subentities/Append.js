import React from 'react';

const appendStyle = {
  border: '2px dashed black',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end'
}

const Append = () => {
  return (
    <div
      style={appendStyle}>
      <h1>Append</h1>
    </div>
  )
}

export default Append;