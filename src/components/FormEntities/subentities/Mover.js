import React from 'react';

const moverStyle = {
  width: '20px',
  height: '20px',
  backgroundColor: 'orange',
  position: 'absolute',
  right: 20,
  bottom: 0,
  cursor: 'mover'
}

/*
  1. make the screnX from the start and the up mouse - this will be the mover
  2. is mover for the delete even needed anymore?
*/

let Resizer = (props) =>
  <div
    data-action={`mover.${props.uuid}.${props.element}`}
    id={props.uuid}
    style={moverStyle}
    draggable='true'
  >M
  </div>

export default Resizer;