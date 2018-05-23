import React from 'react';
import Resizer from './Resizer';
import { entityActions } from '../actions.entities';

const PrePrompt = props => {
  const prePromptStyle = {
    gridColumn: `span ${props.prePromptWidth}`,
    backgroundColor: props.backgroundColor,
    padding: '4px',
    borderRadius: '2px',
    position: 'relative',
    maxHeight: '40px',
  };
  console.log(props.backgroundColor);

  const prePromptInputStyle = {
    height: '20px',
    width: '80%',
    position: 'absolute',
    // right: 16,
    bottom: 7,
  };

  const mouseDown_handler = event => entityActions.mouseDown_handler(event, props);

  return (
    <div
      style={prePromptStyle}
      id={`${props.model.UUID()}.prePrompt`}
      onMouseDown={mouseDown_handler} // to set intitial mouse click loc
    >
      <input
        style={prePromptInputStyle}
        className="form-control"
        value={props.model.prePrompt()}
        placeholder="prompt"
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
