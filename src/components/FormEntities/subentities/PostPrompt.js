import React from 'react';
import Resizer from './Resizer';

const PostPrompt = props => {
  const postPromptStyle = {
    gridColumn: `span ${props.postPromptWidth}`,
    backgroundColor: 'blue',
    padding: '4px',
    borderRadius: '2px',
    position: 'relative',
  };

  return (
    <div style={postPromptStyle} id={`${props.model.UUID()}.postPrompt`}>
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

export default PostPrompt;
