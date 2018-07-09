import React from 'react';

const Append = props => {
  const appendStyle = {
    gridColumn: `span ${props.append}`,
  };

  return <div id={`${props.model.UUID()}.append`} style={appendStyle} />;
};

export default Append;
