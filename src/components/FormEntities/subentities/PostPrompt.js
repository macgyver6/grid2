import React from 'react';
import Resizer from './Resizer';
import { entityActions } from '../actions.entities';
import { entityStyle, inputStyle } from '../feStyles';

const PostPrompt = props => {
  const postPromptStyle = {
    ...entityStyle(props.model),
    gridTemplateColumns: 'repeat(' + `${props.model.postPromptWidth()}` + ', [col] 1fr)',
    gridColumn: `span ${props.model.postPromptWidth()}`,
    backgroundColor: props.backgroundColor,
    padding: '4px',
    // borderRadius: '2px',
    position: 'relative',
    maxHeight: '40px',
  };

  const postPromptInputStyle = {
    position: 'absolute',
    // right: 16,
    bottom: 7,
    height: '20px',
    width: '80%',
  };

  const mouseDown_handler = event => entityActions.mouseDown_handler(event, props);

  return (
    <div
      style={postPromptStyle}
      id={`${props.model.UUID()}.postPrompt`}
      onMouseDown={mouseDown_handler} // to set intitial mouse click loc
    >
      {props.model.postPromptWidth() < 2 ? null : (
        <input
          style={{
            ...inputStyle(props.model),
            gridColumn: `span ${props.model.postPromptWidth()}`,
          }}
          className="form-control"
          value={props.model.postPrompt()}
        />
      )}
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
        resizeType="postPromptWidth"
      />
    </div>
  );
};

export default PostPrompt;
