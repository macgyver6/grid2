import React from 'react';
import Resizer from './Resizer';
import { entityActions } from '../actions.entities';

const PostPrompt = props => {
  const postPromptStyle = {
    gridColumn: `span ${props.postPromptWidth}`,
    backgroundColor: props.backgroundColor,
    padding: '4px',
    borderRadius: '2px',
    position: 'relative',
    height: '40px',
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
      <input
        style={postPromptInputStyle}
        className="form-control"
        value={props.model.postPrompt()}
        placeholder="post prompt"
      />
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
