import React from 'react';
import Resizer from './Resizer';

const PrePrompt = props => {
  const prePromptStyle = {
    gridColumn: `span ${props.prePromptWidth}`,
    backgroundColor: 'green',
    padding: '4px',
    borderRadius: '2px',
    position: 'relative',
  };

  return (
    <div style={prePromptStyle} id={`${props.model.UUID()}.prePrompt`}>
      <Resizer
        id={`${props.model.UUID()}.resizer`}
        element="FormEntity"
        uuid={props.model.UUID()}
        className="resizer"
        model={props.model}
        form={props.form}
        remove={props.remove}
        add={props.add}
        mutate={props.mutate}
      />
    </div>
  );
};

export default PrePrompt;
