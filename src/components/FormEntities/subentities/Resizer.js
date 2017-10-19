import React from 'react';

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
  >↔
  </div>

export default Resizer;