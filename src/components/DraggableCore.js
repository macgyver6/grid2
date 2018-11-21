import React from 'react';

const draggableCoreStyle = {
  display: 'grid',
  gridColumn: `span 24`,
  gridTemplateColumns: `repeat(24, [col] 1fr)`,
  cursor: 'move',
  borderRadius: '2px',
  position: 'relative',
  alignSelf: 'start',
  backgroundColor: 'white',
};

export const DraggableCore = props => {
  return <div style={draggableCoreStyle}>{props.children}</div>;
};
