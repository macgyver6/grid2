import React from 'react';

const Append = props => {
  const appendStyle = {
    gridColumn: `span ${props.append}`,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  };

  return <div id={`${props.model.UUID()}.append`} style={appendStyle} />;
};

export default Append;
