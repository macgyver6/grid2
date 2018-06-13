import React from 'react';

const Prepend = props => {
  const prependStyle = {
    gridColumn: `span ${props.prepend}`,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  };

  return <div style={prependStyle} id={`${props.model.UUID()}.prePrompt`} />;
};

export default Prepend;
