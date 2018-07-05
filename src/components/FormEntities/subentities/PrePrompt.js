import React from 'react';
import Resizer from './Resizer';
import { entityActions } from '../actions.entities';
import { entityStyle, inputStyle } from '../feStyles';

const PrePrompt = props => {
  const prePromptStyle = {
    ...entityStyle(props.model),
    gridTemplateColumns: 'repeat(' + `${props.model.prePromptWidth()}` + ', [col] 1fr)',
    gridColumn: `span ${props.model.prePromptWidth()}`,
    backgroundColor: props.backgroundColor,
    // padding: '4px',
    // borderRadius: '2px',
    position: 'relative',
    maxHeight: '40px',
  };
  console.log(props.backgroundColor);

  const mouseDown_handler = event => entityActions.mouseDown_handler(event, props);

  return (
    <div
      style={prePromptStyle}
      id={`${props.model.UUID()}.prePrompt`}
      onMouseDown={mouseDown_handler} // to set intitial mouse click loc
    >
      {props.model.prePromptWidth() < 2 ? null : (
        <input
          style={{
            ...inputStyle(props.model),
            gridColumn: `span ${props.model.prePromptWidth()}`,
          }}
          className="form-control"
          value={props.model.prePrompt()}
        />
      )}
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
