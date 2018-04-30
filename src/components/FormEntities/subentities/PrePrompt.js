import React from 'react';
import Resizer from './Resizer';

const PrePrompt = props => {
  const prePromptStyle = {
    gridColumn: `span ${props.prePromptWidth}`,
    backgroundColor: 'green',
    padding: '4px',
    borderRadius: '2px',
    position: 'relative'
  };

  const prePromptInputStyle = { height: '20px', width: '80%' };

  return (
    <div style={prePromptStyle} id={`${props.model.UUID()}.prePrompt`}>
      <input
        style={prePromptInputStyle}
        className="form-control"
        value={props.model.prePrompt()}
        placeholder='pre prompt'
      />
      <Resizer
        id="prePrompt"
        element="FormEntity"
        uuid={props.model.UUID()}
        className="resizer"
        model={props.model}
        form={props.form}
        remove={props.remove}
        add={props.add}
        mutate={props.mutate}
        resizeType="prePromptWidth"
      />
    </div>
  );
};

export default PrePrompt;
